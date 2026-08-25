# Bone Cancer Prediction System — React + Vite + Flask + NVIDIA Nemotron

This project is based on the supplied Bone Cancer Prediction System reference image and the `bone-cancer-prediction-platform.zip` package.

## Architecture

```text
GitHub Pages
    │
    └── React + Vite frontend
             │
             │ HTTPS POST /predict
             ▼
       Separate Flask API
             │
             │ server-side authenticated request
             ▼
       NVIDIA NIM / OpenAI-compatible API
             │
             ▼
       nvidia/nemotron-3-nano-omni-30b-a3b-reasoning
```

GitHub Pages is static hosting and cannot execute Flask, Python, or the NVIDIA API call. The NVIDIA API key must therefore remain on the backend.

## What this package contains

### GitHub Pages frontend

- React + Vite
- Responsive medical-AI themed interface
- Project overview
- Reference model comparison
- Architecture diagram
- Dataset/preprocessing section
- Workflow
- X-ray upload UI
- Backend connection handling
- Responsive mobile navigation
- GitHub Actions deployment to GitHub Pages

### Flask backend

`backend/app.py` exposes:

- `GET /health`
- `POST /predict`

The `/predict` endpoint receives an image, sends it server-side to NVIDIA Nemotron, and returns the model's research-oriented visual assessment.

## NVIDIA configuration

The backend defaults to:

```text
NVIDIA_INVOKE_URL=https://integrate.api.nvidia.com/v1/chat/completions
NVIDIA_MODEL=nvidia/nemotron-3-nano-omni-30b-a3b-reasoning
```

Set the credential only on the backend:

```text
NVIDIA_API_KEY=YOUR_NVIDIA_API_KEY
```

Optional backend configuration:

```text
FRONTEND_ORIGINS=https://PAVANVASHISHTA.github.io
MAX_UPLOAD_MB=10
```

Do not put `NVIDIA_API_KEY` in React, Vite environment files committed to GitHub, or GitHub Pages static assets.

## Run frontend locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Run backend locally

```bash
python -m venv .venv
pip install -r backend/requirements.txt
```

Set your NVIDIA credential in the shell/environment, then:

```bash
python backend/app.py
```

Connect the frontend to it with:

```text
VITE_API_BASE=http://localhost:5000
```

## GitHub Pages deployment

The repository deploys the Vite `dist/` directory through `.github/workflows/deploy-pages.yml` on pushes to `main` or manual workflow dispatch. The workflow uses the optional GitHub repository variable `VITE_API_BASE` when building the frontend.

After deploying the Flask backend, add a repository variable named:

```text
VITE_API_BASE
```

with the public HTTPS URL of the backend, for example:

```text
https://YOUR-BACKEND.example.com
```

Do not put the NVIDIA API key in this variable.

Repository:

https://github.com/PAVANVASHISHTA/web-integrated-bone-cancer-/

The live Pages URL is exposed by the `github-pages` Actions environment after a successful deployment.

## Medical/clinical safety

This is an engineering research/demo application. NVIDIA Nemotron is a general vision-language model, not a clinically validated bone-cancer classifier. Its output must not be presented as a medical diagnosis or as a calibrated cancer probability.

Before any real-world clinical use, the project would require appropriate:

- dataset licensing and provenance
- de-identification
- patient-level train/validation/test splitting
- preprocessing parity
- independent external validation
- calibrated uncertainty analysis
- model/version tracking
- clinical review and applicable regulatory/compliance review

The benchmark values shown in the frontend are reference metrics from the supplied project specification, not independently verified results.

## Structure

```text
bone-cancer-prediction-platform/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── README.md
│   └── model/
│       └── README.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```
