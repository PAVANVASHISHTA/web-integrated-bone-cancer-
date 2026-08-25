# Optional Flask inference backend

GitHub Pages hosts the React frontend only; it cannot execute Flask/Python.

## Run locally

```bash
python -m venv .venv
pip install -r backend/requirements.txt
python backend/app.py
```

The API listens on `http://localhost:5000`.

- `GET /health`
- `POST /predict` with `file=<x-ray image>` and `model=cnn|svm|logistic|forest`

The prediction endpoint deliberately refuses to fabricate an inference result. It requires a validated model artifact and the exact preprocessing/inference adapter used during training.

## Connect the frontend

Build with:

```bash
VITE_API_BASE=https://YOUR-BACKEND.example.com npm run build
```

Keep credentials and private model material out of the React application.
