Intrusion Detection System using Deep Learning
==============================================

Overview
--------
This project is a Real-Time Intrusion Detection System (IDS) designed to detect and classify cyberattacks in network traffic using Deep Learning techniques. The system analyzes incoming data and predicts potential attack categories to enhance network security.

Dataset
--------
- Dataset Used: CICIDS2017
- Description: The dataset consists of 8 CSV files containing network traffic data.
- Total Records: 2,830,743 rows
- Features: 78 feature columns
- Label Column: 1 (attack class label)

Model
-----
- Algorithm: Artificial Neural Network (ANN)
- Type: Multiclass classification
- Performance:
  - Accuracy: 98%
  - Weighted F1-Score: 0.98
- Noted Challenge: Imbalanced data in minority attack classes

Implementation Details
----------------------
- Framework: FastAPI
- Model Deployment: FastAPI backend with an interactive web-based frontend
- Language: Python
- Libraries: TensorFlow, Keras, NumPy, Pandas, Scikit-learn
- Preprocessing: Data normalization, encoding categorical features, and feature selection
- Saved Files:
  - ann_model.h5
  - scaler.pkl
  - label_encoder.pkl

Project Structure
-----------------
Intrusion_Detection_System_Project/
│
├── app.py                  # FastAPI application file
├── model/
│   ├── ann_model.h5
│   ├── scaler.pkl
│   ├── label_encoder.pkl
│
├── static/
│   ├── style.css
│   ├── script.js
│
├── templates/
│   ├── index.html
│
├── .gitignore
└── README.txt

How to Run
-----------
1. Clone the repository:
   git clone https://github.com/<your-username>/<your-repository-name>.git

2. Navigate to the project directory:
   cd Intrusion_Detection_System_Project

3. Install dependencies:
   pip install -r requirements.txt

4. Run the FastAPI server:
   uvicorn app:app --reload

5. Open in browser:
   http://127.0.0.1:8000

Result
------
The system achieves a 98% accuracy rate in detecting various types of network intrusions and provides real-time prediction through a user-friendly web interface.

Author
------
Developed by Gunjan
B.Tech CSE (AI & ML)
Graphic Era Hill University
