# Deployment checklist

## GitHub Pages frontend

- [x] Project extracted and inspected
- [x] Vite configured with repository-safe relative assets
- [x] GitHub Actions workflow added for `main` and manual dispatch
- [ ] Confirm `npm install` and `npm run build` in GitHub Actions
- [ ] Confirm GitHub Pages deployment succeeds
- [ ] Confirm generated Pages URL loads on desktop/mobile

## Real inference backend

- [x] Flask backend remains separate from Pages
- [x] No medical model is fabricated or bundled
- [x] Missing model artifacts return a non-success response
- [ ] Obtain and validate the actual model
- [ ] Match training preprocessing exactly
- [ ] Implement the validated inference adapter
- [ ] Deploy Flask separately
- [ ] Set `VITE_API_BASE` to the backend HTTPS URL and rebuild
