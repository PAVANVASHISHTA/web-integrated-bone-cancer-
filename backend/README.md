# Flask + NVIDIA Nemotron inference backend

GitHub Pages hosts the React frontend only; it cannot execute Flask/Python. This backend is designed to run separately and keep the NVIDIA API key off the public frontend.

## NVIDIA configuration

The backend defaults to the NVIDIA OpenAI-compatible Chat Completions endpoint and model:

```text
NVIDIA_INVOKE_URL=https://integrate.api.nvidia.com/v1/chat/completions
NVIDIA_MODEL=nvidia/nemotron-3-nano-omni-30b-a3b-reasoning
```

Set the API credential only in the backend hosting environment:

```text
NVIDIA_API_KEY=YOUR_NVIDIA_API_KEY
```

Optional settings:

```text
FRONTEND_ORIGINS=https://PAVANVASHISHTA.github.io
MAX_UPLOAD_MB=10
```

For a repository Pages site, set `FRONTEND_ORIGINS` to the exact Pages origin plus any local development origin you need.

## Run locally

```bash
python -m venv .venv
pip install -r backend/requirements.txt
python backend/app.py
```

The API listens on `http://localhost:5000`.

- `GET /health`
- `POST /predict` with `file=<x-ray image>` and `model=<reference selection>`

`POST /predict` encodes the uploaded image as a data URL and sends it to NVIDIA Nemotron through the server-side API. The response is a research-oriented visual assessment. It intentionally does **not** expose an API key to the browser and does **not** manufacture a calibrated cancer probability.

## Connect the frontend

Build with:

```bash
VITE_API_BASE=https://YOUR-BACKEND.example.com npm run build
```

For GitHub Actions, this repository's Pages workflow reads the optional repository variable:

```text
VITE_API_BASE
```

Add that variable in GitHub repository settings after the Flask backend has been deployed.

## Safety boundary

Nemotron is a general vision-language model, not a clinically validated bone-cancer classifier. The endpoint is therefore presented as research/demo image analysis rather than diagnosis. Do not use its text output as a clinical decision or as a calibrated probability.
