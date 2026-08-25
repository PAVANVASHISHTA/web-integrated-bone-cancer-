import { useEffect, useState } from 'react'
import {
  Activity, ArrowRight, BrainCircuit, CheckCircle2, Database, FileImage,
  Gauge, HeartPulse, ImagePlus, Info, LockKeyhole, Menu, Microscope, Network,
  RefreshCcw, ServerCog, ShieldCheck, Sparkles, Stethoscope, Upload, X,
  FlaskConical
} from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || ''

const models = [
  { id: 'cnn', name: 'CNN', subtitle: 'Convolutional Neural Network', score: '96.45%', icon: BrainCircuit },
  { id: 'svm', name: 'SVM', subtitle: 'Support Vector Machine', score: '86.21%', icon: Network },
  { id: 'logistic', name: 'Logistic Regression', subtitle: 'Linear classifier', score: '82.37%', icon: Activity },
  { id: 'forest', name: 'Random Forest', subtitle: 'Tree ensemble', score: '84.18%', icon: Database },
]

function Brand() {
  return <a className="brand" href="#top"><span className="brand-icon">✦</span><span><b>BONE CANCER</b><small>PREDICTION SYSTEM</small></span></a>
}

function Header({ open, setOpen }) {
  const links = [['Overview', 'overview'], ['Models', 'models'], ['Workflow', 'workflow'], ['Predict', 'predict'], ['About', 'about']]
  return <header className="header"><Brand /><button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button><nav className={open ? 'nav open' : 'nav'}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-button" href="#predict" onClick={() => setOpen(false)}>Upload X-ray <Upload size={15} /></a></nav></header>
}

function Hero() {
  return <section className="hero" id="top"><div className="hero-pattern" /><div className="hero-copy"><div className="eyebrow"><span /> AI-powered early screening interface</div><h1>Bone Cancer<br /><span>Prediction</span></h1><p>A machine-learning powered web application interface designed for X-ray image analysis workflows and early clinical decision support research.</p><div className="hero-actions"><a className="button cyan" href="#predict">Upload X-ray <ArrowRight size={18} /></a><a className="button outline" href="#models">Compare Models</a></div><div className="hero-tech"><span>Python</span><i /><span>TensorFlow / Keras</span><i /><span>Scikit-learn</span><i /><span>Flask</span></div></div><div className="hero-visual"><div className="scan-frame"><div className="scan-label">X-RAY / LOWER EXTREMITY</div><div className="bone-art"><div className="bone-head" /><div className="bone-shaft" /><div className="bone-joint" /><div className="bone-glow" /></div><div className="scan-line" /><div className="scan-metric"><span>MODEL</span><b>CNN</b><span>STATUS</span><strong>READY</strong></div></div><div className="floating-card"><Gauge size={18} /><span>Model confidence</span><b>--</b></div></div></section>
}

function Stats() {
  return <section className="stats"><div><BrainCircuit /><strong>4</strong><span>Models compared</span></div><div><Gauge /><strong>96.45%</strong><span>Reference CNN accuracy</span></div><div><Upload /><strong>1</strong><span>X-ray upload workflow</span></div><div><ShieldCheck /><strong>100%</strong><span>UI designed for responsive access</span></div></section>
}

function Overview() {
  return <section className="section overview" id="overview"><div className="section-label">01 — Project overview</div><div className="two-col"><div className="overview-visual"><div className="xray-art large"><div className="bone-head" /><div className="bone-shaft" /><div className="bone-joint" /><div className="bone-glow" /></div><div className="image-caption"><FileImage size={17} /><span>X-ray image analysis pipeline</span></div></div><div><h2>Machine learning meets a <span>simple web workflow.</span></h2><p className="lead">The reference project describes a web-integrated AI system that accepts X-ray images, compares multiple machine-learning models and presents a prediction result through a Flask-powered interface.</p><p className="muted">This package reproduces that product experience as a deployable frontend and includes a separate Flask API skeleton for connecting a validated trained model. It does not ship a medical model or make clinical diagnoses.</p><div className="goal-card"><Sparkles /><div><b>Project goal</b><span>Provide an accessible research interface for image upload, model inference and result presentation.</span></div></div></div></div></section>
}

function Models() {
  return <section className="section models" id="models"><div className="section-label">02 — Models compared</div><div className="section-heading"><div><h2>Four models. <span>One benchmark.</span></h2></div><p>The figures below mirror the supplied project reference. Replace them with metrics from your actual held-out test set before publication.</p></div><div className="model-grid">{models.map(({ id, name, subtitle, score, icon: Icon }) => <article className={`model-card ${id === 'cnn' ? 'best' : ''}`} key={id}>{id === 'cnn' && <div className="best-ribbon">BEST REFERENCE MODEL</div>}<div className="model-icon"><Icon /></div><h3>{name}</h3><p>{subtitle}</p><div className="model-score"><strong>{score}</strong><span>Accuracy</span></div></article>)}</div><div className="benchmark"><div className="benchmark-title"><Gauge /> Reference benchmark</div><div className="table-wrap"><table><thead><tr><th>Model</th><th>Accuracy</th><th>Precision</th><th>Recall</th><th>F1-score</th></tr></thead><tbody><tr><td>CNN</td><td>96.45%</td><td>96.31%</td><td>96.52%</td><td>96.41%</td></tr><tr><td>SVM</td><td>86.21%</td><td>85.60%</td><td>86.10%</td><td>85.85%</td></tr><tr><td>Logistic Regression</td><td>82.37%</td><td>81.45%</td><td>82.22%</td><td>81.83%</td></tr><tr><td>Random Forest</td><td>84.18%</td><td>83.40%</td><td>84.05%</td><td>83.72%</td></tr></tbody></table></div><div className="best-line"><Sparkles /> CNN is the reference best-performing model in the supplied specification.</div></div></section>
}

function Features() {
  const features = [[Upload, 'X-ray Image Upload', 'Upload supported image files through a simple interface.'], [Network, 'Multiple Model Comparison', 'Present benchmark results for CNN, SVM, logistic regression and random forest.'], [Gauge, 'High Accuracy Display', 'Surface validation metrics from the connected research model.'], [Sparkles, 'Real-time Interface', 'Return an inference response after a backend model is connected.'], [HeartPulse, 'User Friendly', 'Clean, responsive interaction for a research or demonstration workflow.'], [LockKeyhole, 'Secure & Efficient', 'Keep inference endpoints and model artifacts outside the public frontend.']]
  return <section className="section features"><div className="section-label">03 — Key features</div><div className="feature-grid">{features.map(([Icon, title, text]) => <article key={title}><div className="feature-icon"><Icon /></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
}

function Architecture() {
  const boxes = [['USER INTERFACE', Upload, ['Upload X-ray', 'View result']], ['WEB SERVER', FlaskConical, ['Routes & controller', 'Request handling', 'Preprocessing']], ['ML ENGINE', BrainCircuit, ['CNN', 'SVM', 'Logistic regression', 'Random forest']], ['OUTPUT', Gauge, ['Prediction result', 'Confidence score', 'Clinical review']]]
  return <section className="section architecture" id="workflow"><div className="section-label">04 — Exploded view / system architecture</div><div className="architecture-flow">{boxes.map(([title, Icon, items], i) => <div className="arch-wrap" key={title}><article className="arch-box"><span className="arch-title">{title}</span><Icon className="arch-main-icon" />{items.map(item => <div className="arch-item" key={item}>{item}</div>)}</article>{i < boxes.length - 1 && <ArrowRight className="flow-arrow" />}</div>)}</div><div className="data-flow"><Database /> Upload image <ArrowRight /> Preprocess <ArrowRight /> Model inference <ArrowRight /> Generate response <ArrowRight /> Display</div></section>
}

function Workflow() {
  const steps = [[Database, 'Collect', 'Dataset'], [ImagePlus, 'Preprocess', 'Images'], [ServerCog, 'Build & train', 'Models'], [Gauge, 'Evaluate', 'Models'], [Sparkles, 'Select', 'Best model'], [FlaskConical, 'Deploy', 'Flask API'], [Stethoscope, 'Review', 'Output']]
  return <section className="section workflow"><div className="section-label">05 — Workflow</div><div className="workflow-row">{steps.map(([Icon, a, b], i) => <div className="workflow-step" key={a}><div className="step-circle"><Icon /></div><b>{a}</b><span>{b}</span>{i < steps.length - 1 && <ArrowRight className="step-arrow" />}</div>)}</div></section>
}

function Dataset() {
  return <section className="section dataset"><div className="section-label">06 — Dataset & preprocessing</div><div className="dataset-grid"><div className="dataset-card"><Database size={36} /><h3>Dataset</h3><ul><li>Bone X-ray images</li><li>Positive / negative labels</li><li>Public or clinically approved sources</li><li>Documented train / validation / test split</li></ul></div><div className="dataset-card"><Microscope size={36} /><h3>Preprocessing</h3><ul><li>Image resizing</li><li>Grayscale conversion where appropriate</li><li>Normalization</li><li>Noise reduction / augmentation</li><li>Strict patient-level split to avoid leakage</li></ul></div><div className="dataset-warning"><Info /><span><b>Medical ML note:</b> use only appropriately licensed, de-identified data and report dataset composition, class balance and validation methodology.</span></div></div></section>
}

function Predict() {
  const [file, setFile] = useState(null), [preview, setPreview] = useState(''), [status, setStatus] = useState('idle'), [message, setMessage] = useState(''), [result, setResult] = useState(null), [model, setModel] = useState('cnn')
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])
  const canPredict = Boolean(file) && status !== 'loading'
  function chooseFile(e) { const selected = e.target.files?.[0]; if (!selected) return; if (!selected.type.startsWith('image/')) { setMessage('Please select an image file.'); return } if (preview) URL.revokeObjectURL(preview); setFile(selected); setPreview(URL.createObjectURL(selected)); setStatus('ready'); setResult(null); setMessage('') }
  async function predict() { if (!file) return; setStatus('loading'); setMessage(''); setResult(null); try { if (!API_BASE) throw new Error('NO_API'); const form = new FormData(); form.append('file', file); form.append('model', model); const response = await fetch(`${API_BASE}/predict`, { method: 'POST', body: form }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Prediction service returned an error.'); setResult(data); setStatus('done') } catch (error) { setStatus('ready'); setMessage(error.message === 'NO_API' ? 'Demo UI only: no inference API is configured. Set VITE_API_BASE to your deployed Flask backend to enable model inference.' : error.message) } }
  return <section className="section predictor" id="predict"><div className="section-label">07 — Web interface / prediction</div><div className="predictor-shell"><div className="predict-copy"><h2>Upload an X-ray.<br /><span>Connect your model.</span></h2><p>This interface is production-structured but intentionally does not fabricate a cancer diagnosis. A real prediction requires a validated model and backend endpoint.</p><div className="safe-note"><ShieldCheck /><span>For research/demo use. Not a medical diagnosis or substitute for professional evaluation.</span></div></div><div className="upload-panel"><div className="upload-zone">{preview ? <img src={preview} alt="Selected X-ray preview" /> : <div className="upload-placeholder"><Upload /><b>Upload X-ray image</b><span>PNG, JPG, JPEG</span></div>}<label className="file-button">Choose File<input type="file" accept="image/png,image/jpeg,image/jpg" onChange={chooseFile} /></label></div><div className="predict-controls"><label>Inference model<select value={model} onChange={e => setModel(e.target.value)}>{models.map(m => <option value={m.id} key={m.id}>{m.name}</option>)}</select></label><button className="button cyan full" disabled={!canPredict} onClick={predict}>{status === 'loading' ? <><RefreshCcw className="spin" /> Running inference...</> : <>Predict <ArrowRight size={17} /></>}</button></div>{message && <div className="api-message"><Info /> {message}</div>}{result && <ResultCard result={result} />}</div></div></section>
}

function ResultCard({ result }) {
  return <div className="result-card"><div className="result-head"><CheckCircle2 /> Model response</div><strong>{result.label || 'Prediction returned'}</strong><div className="confidence">{result.confidence != null ? `${Number(result.confidence).toFixed(2)}%` : 'N/A'}<span>confidence reported by backend</span></div><p>{result.disclaimer || 'Research output. Clinical interpretation is required.'}</p></div>
}

function CodeStructure() {
  return <section className="section code"><div className="section-label">08 — Code structure</div><div className="code-grid"><pre>{`bone-cancer-prediction-platform/\n├── src/\n│   ├── App.jsx\n│   ├── main.jsx\n│   └── styles.css\n├── backend/\n│   ├── app.py\n│   ├── requirements.txt\n│   └── model/\n│       └── README.md\n├── .github/workflows/\n│   └── deploy-pages.yml\n├── index.html\n├── package.json\n└── vite.config.js`}</pre><pre>{`POST /predict\nmultipart/form-data\n\nfile: <x-ray image>\nmodel: cnn | svm | logistic | forest\n\n→ validated preprocessing\n→ load validated model\n→ inference\n→ return JSON`}</pre></div></section>
}

function About() {
  return <section className="section about" id="about"><div className="section-label">09 — Outcome & impact</div><div className="impact-grid">{[[Activity, 'Clear model-comparison interface', 'Makes benchmark results easy to inspect and communicate.'], [Upload, 'Accessible upload workflow', 'Turns a complex inference pipeline into a simple web interaction.'], [ShieldCheck, 'Responsible deployment boundary', 'Keeps the trained model and private API outside a public static frontend.'], [HeartPulse, 'Decision-support research', 'Designed to support research workflows, not replace clinical judgment.']].map(([Icon, title, text]) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
}

function Footer() { return <footer><Brand /><p>Bone Cancer Prediction System · React frontend + optional Flask inference API.</p><div className="footer-note">Research/demo interface · Not for clinical diagnosis</div></footer> }

export default function App() { const [open, setOpen] = useState(false); return <><Header open={open} setOpen={setOpen} /><main><Hero /><Stats /><Overview /><Models /><Features /><Architecture /><Workflow /><Dataset /><Predict /><CodeStructure /><About /></main><Footer /></> }
