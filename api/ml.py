from fastbook import *

def predict():
    path = Path()
    learn_inf = load_learner(path/'model.pkl')
    cat, idx, probs = learn_inf.predict('/tmp/shark.png')
    return cat, (probs[idx] * 100).item()
