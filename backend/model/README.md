# Model artifacts

No medical model is included in this repository.

Add only a validated, appropriately licensed artifact after training and validation, and document:

- dataset/source and licensing
- patient-level split methodology
- preprocessing and augmentation
- model architecture
- test metrics
- calibration/confidence method
- class mapping
- model version/hash
- clinical validation status

The Flask endpoint will not invent predictions when the artifact or inference adapter is missing.
