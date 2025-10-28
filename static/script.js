const featureNames = [
    "Flow Duration","Total Fwd Packets","Total Backward Packets",
    "Total Length of Fwd Packets","Total Length of Bwd Packets","Fwd Packet Length Max",
    "Fwd Packet Length Min","Fwd Packet Length Mean","Fwd Packet Length Std",
    "Bwd Packet Length Max","Bwd Packet Length Min","Bwd Packet Length Mean",
    "Bwd Packet Length Std","Flow Bytes/s","Flow Packets/s","Flow IAT Mean",
    "Flow IAT Std","Flow IAT Max","Flow IAT Min","Fwd IAT Total","Fwd IAT Mean",
    "Fwd IAT Std","Fwd IAT Max","Fwd IAT Min","Bwd IAT Total","Bwd IAT Mean",
    "Bwd IAT Std","Bwd IAT Max","Bwd IAT Min","Fwd PSH Flags","Bwd PSH Flags",
    "Fwd URG Flags","Bwd URG Flags","Fwd Header Length","Bwd Header Length",
    "Fwd Packets/s","Bwd Packets/s","Min Packet Length","Max Packet Length",
    "Packet Length Mean","Packet Length Std","Packet Length Variance","FIN Flag Count",
    "SYN Flag Count","RST Flag Count","PSH Flag Count","ACK Flag Count","URG Flag Count",
    "CWE Flag Count","ECE Flag Count","Down/Up Ratio","Average Packet Size",
    "Avg Fwd Segment Size","Avg Bwd Segment Size","Fwd Avg Bytes/Bulk","Fwd Avg Packets/Bulk",
    "Fwd Avg Bulk Rate","Bwd Avg Bytes/Bulk","Bwd Avg Packets/Bulk","Bwd Avg Bulk Rate",
    "Subflow Fwd Packets","Subflow Fwd Bytes","Subflow Bwd Packets","Subflow Bwd Bytes",
    "Init_Win_bytes_forward","Init_Win_bytes_backward","act_data_pkt_fwd",
    "min_seg_size_forward","Active Mean","Active Std","Active Max","Active Min",
    "Idle Mean","Idle Std","Idle Max","Idle Min"
];

// Generate input fields dynamically
const container = document.getElementById("featureInputs");
featureNames.forEach(name => {
    const label = document.createElement("label");
    label.innerText = name + ":";
    const input = document.createElement("input");
    input.type = "number";
    input.name = name;
    input.required = true;
    container.appendChild(label);
    container.appendChild(input);
});

// Form submission
document.getElementById("predictForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll("#featureInputs input");
    const features = Array.from(inputs).map(i => parseFloat(i.value));
    const response = await fetch("/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({features})
    });
    const data = await response.json();
    if (data.error) {
        alert("Error: " + data.error);
    } else {
        document.getElementById("result").innerText = "Prediction: " + data.prediction;
    }
});

// File upload prediction
async function predictFile() {
    const fileInput = document.getElementById("jsonFile");
    if (!fileInput.files.length) { alert("Select a JSON file!"); return; }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const response = await fetch("/predict_file", {method:"POST", body: formData});
    const data = await response.json();
    if (data.error) {
        alert("Error: " + data.error);
    } else {
        document.getElementById("result").innerText = "Prediction: " + data.prediction;
    }
}
