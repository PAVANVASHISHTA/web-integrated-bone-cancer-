# Bone Cancer Prediction System — React + Vite + Optional Flask API

This project is based on the supplied Bone Cancer Prediction System reference image.

## What this package contains

### GitHub Pages frontend

- React + Vite
- Responsive medical-AI themed interface
- Project overview
- Model comparison
- Architecture diagram
- Dataset/preprocessing section
- Workflow
- X-ray upload UI
- Model selector
- Backend connection handling
- Responsive mobile navigation
- GitHub Actions deployment to GitHub Pages

### Optional Python backend

`backend/app.py` contains a Flask API skeleton for a real validated model.

**No medical model is included.**

The API intentionally refuses to invent predictions when a model artifact or inference adapter is missing.

## Important architecture limitation

GitHub Pages is a static hosting service. It can host the React frontend, but it cannot execute Flask/Python.

Therefore:

```text
GitHub Pages
    │
    └── React frontend
             │
             │ HTTPS POST /predict
             ▼
       Separate Flask API
             │
             ▼
       Validated ML model
```

If you only need the presentation/demo website, GitHub Pages is enough.

If you need real inference, deploy the Flask backend separately and set:

```text
VITE_API_BASE=https://YOUR-BACKEND.example.com
```

before building the frontend.

## Run frontend

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

This repository deploys the Vite frontend through `.github/workflows/deploy-pages.yml` on pushes to `main` or manual workflow dispatch.

The Vite configuration uses a relative asset base (`./`), which keeps the generated frontend compatible with the repository subpath used by GitHub Pages.

Repository:

https://github.com/PAVANVASHISHTA/web-integrated-bone-cancer-/

The Pages URL is provided by the GitHub Actions deployment environment after a successful run.

## Real inference backend

Install backend dependencies:

```bash
python -m venv .venv
pip install -r backend/requirements.txt
```

Run:

```bash
python backend/app.py
```

Then connect the frontend using:

```text
VITE_API_BASE=http://localhost:5000
```

The included `/predict` endpoint is a safe adapter skeleton. Replace its final section with the exact preprocessing and inference pipeline used to train and validate your model.

## Medical/clinical safety

This repository is an engineering starter/demo.

The frontend explicitly avoids fabricating a cancer prediction when no inference backend is configured.

Before any real-world use, you need appropriate:

- dataset licensing and provenance
- patient-level train/validation/test splitting
- de-identification
- preprocessing parity
- external validation
- calibrated confidence/uncertainty reporting
- model/version tracking
- clinical review and applicable regulatory/compliance review

Do not represent the reference accuracy numbers in the UI as independently verified results. They are displayed as **reference metrics from the supplied project specification**.

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
