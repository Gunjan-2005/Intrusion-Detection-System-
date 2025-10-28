from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import numpy as np
import joblib
from tensorflow.keras.models import load_model
import json

app = FastAPI()

# Mount static folder
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Load model, scaler, and label encoder
model = load_model("model/ann_model.h5")
scaler = joblib.load("model/scaler.pkl")
le = joblib.load("model/label_encoder.pkl")  # Must save during training

# Serve HTML page
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# API endpoint for prediction from manual input
@app.post("/predict")
async def predict(request: Request):
    try:
        data = await request.json()
        features = np.array(data["features"]).reshape(1, -1)
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)
        pred_class_index = prediction.argmax(axis=1)[0]
        pred_class_name = le.inverse_transform([pred_class_index])[0]
        return {"prediction": pred_class_name}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

# API endpoint for prediction from uploaded JSON
@app.post("/predict_file")
async def predict_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        data_json = json.loads(content)
        features = np.array(data_json["features"]).reshape(1, -1)
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)
        pred_class_index = prediction.argmax(axis=1)[0]
        pred_class_name = le.inverse_transform([pred_class_index])[0]
        return {"prediction": pred_class_name}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
