from pathlib import Path
from flask import Flask, jsonify, request

import ml

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

def get_ext(filename):
    return filename.split('.')[-1]

def ext_is_allowed(ext):
    return ext == 'jpg' or ext == 'jpeg' or ext == 'png'

@app.route('/api/predict', methods=["POST"])
def predict():
    file = request.files['file']

    ext = get_ext(file.filename)
    if not ext_is_allowed(ext):
        return jsonify({ "message": "Invalid file extension" }), 400

    path = Path().joinpath("/tmp", "shark.{}".format(ext))
    file.save(path)

    s, p = ml.predict()
    return jsonify({ "shark_type": s, "prob": p })

if __name__ == "__main__":
    app.run()
