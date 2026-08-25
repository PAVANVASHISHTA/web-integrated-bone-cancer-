import os
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

try:
    import joblib
except ImportError:
    joblib = None

app = Flask(__name__)
CORS(app)
MODEL_DIR = Path(__file__).parent / "model"
ALLOWED_MODELS = {"cnn": MODEL_DIR / "cnn_model.pkl", "svm": MODEL_DIR / "svm_model.pkl", "logistic": MODEL_DIR / "logistic_model.pkl", "forest": MODEL_DIR / "random_forest_model.pkl"}

@app.get("/health")
def health():
    return jsonify({"status": "ok", "message": "Inference API is running."})

@app.post("/predict")
def predict():
    uploaded = request.files.get("file")
    model_name = request.form.get("model", "cnn")
    if uploaded is None:
        return jsonify({"error": "No image file supplied."}), 400
    if model_name not in ALLOWED_MODELS:
        return jsonify({"error": "Unsupported model."}), 400
    model_path = ALLOWED_MODELS[model_name]
    if joblib is None:
        return jsonify({"error": "joblib is not installed. Install backend requirements first."}), 500
    if not model_path.exists():
        return jsonify({"error": f"Model artifact '{model_path.name}' is not included in this starter package. Place your validated, appropriately licensed model artifact in backend/model/."}), 503
    return jsonify({"error": "Model artifact found, but the inference adapter is intentionally not implemented. Connect the exact preprocessing and model pipeline used during training."}), 501

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=False)
