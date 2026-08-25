import base64
import os

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = int(os.getenv("MAX_UPLOAD_MB", "10")) * 1024 * 1024

frontend_origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", "*").split(",")
    if origin.strip()
]
CORS(app, resources={r"/*": {"origins": frontend_origins or ["*"]}})

NVIDIA_INVOKE_URL = os.getenv(
    "NVIDIA_INVOKE_URL",
    "https://integrate.api.nvidia.com/v1/chat/completions",
)
NVIDIA_MODEL = os.getenv(
    "NVIDIA_MODEL",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
)
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}

SYSTEM_PROMPT = """You are a medical-imaging research assistant, not a clinician.
Analyze the uploaded bone X-ray image only as a research/demo image-analysis task.
Do not claim to diagnose cancer, do not invent certainty, and do not provide treatment advice.
Describe visible imaging characteristics conservatively and state when the image is insufficient for interpretation.
Clearly distinguish observations from hypotheses.
"""


def _image_data_url(uploaded):
    payload = base64.b64encode(uploaded.read()).decode("ascii")
    mime = uploaded.mimetype or "image/jpeg"
    return f"data:{mime};base64,{payload}"


def _call_nvidia(image_url):
    if not NVIDIA_API_KEY:
        raise RuntimeError("NVIDIA_API_KEY is not configured on the backend.")

    body = {
        "model": NVIDIA_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Review this bone X-ray for a research workflow. "
                            "Return a concise assessment with: (1) visible observations, "
                            "(2) whether the image contains any potentially concerning "
                            "abnormality that warrants expert review, and (3) limitations. "
                            "Do not call it a diagnosis and do not output a numeric confidence "
                            "unless it is explicitly provided by a validated model."
                        ),
                    },
                    {"type": "image_url", "image_url": {"url": image_url}},
                ],
            },
        ],
        "max_tokens": 1024,
        "temperature": 0.0,
        "stream": False,
        "chat_template_kwargs": {"enable_thinking": False},
    }

    response = requests.post(
        NVIDIA_INVOKE_URL,
        headers={
            "Authorization": f"Bearer {NVIDIA_API_KEY}",
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        json=body,
        timeout=(15, 120),
    )
    if not response.ok:
        detail = response.text[:1000]
        raise RuntimeError(
            f"NVIDIA inference request failed ({response.status_code}): {detail}"
        )

    data = response.json()
    content = ((data.get("choices") or [{}])[0].get("message") or {}).get("content")
    if not content:
        raise RuntimeError("NVIDIA returned no final response content.")
    return content


@app.get("/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "provider": "NVIDIA NIM",
            "model": NVIDIA_MODEL,
            "configured": bool(NVIDIA_API_KEY),
        }
    )


@app.post("/predict")
def predict():
    uploaded = request.files.get("file")
    requested_model = request.form.get("model", "nvidia")

    if uploaded is None or not uploaded.filename:
        return jsonify({"error": "No image file supplied."}), 400

    if uploaded.mimetype not in ALLOWED_MIME_TYPES:
        return jsonify({"error": "Unsupported image type. Use JPG, PNG, or WebP."}), 400

    try:
        image_url = _image_data_url(uploaded)
        assessment = _call_nvidia(image_url)
    except RuntimeError as exc:
        return jsonify({"error": str(exc)}), 503
    except requests.RequestException as exc:
        return jsonify({"error": f"Could not reach the NVIDIA inference service: {exc}"}), 503
    except Exception:
        app.logger.exception("Unexpected inference failure")
        return jsonify({"error": "Unexpected inference service failure."}), 500

    return jsonify(
        {
            "label": "Research image assessment",
            "confidence": None,
            "assessment": assessment,
            "requested_model": requested_model,
            "model": NVIDIA_MODEL,
            "disclaimer": (
                "NVIDIA Nemotron generated this research/demo assessment. "
                "It is not a medical diagnosis and is not a calibrated cancer probability. "
                "Clinical interpretation must be performed by a qualified professional."
            ),
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=False)
