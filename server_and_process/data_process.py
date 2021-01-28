##PROCESS SCRIPT

from scipy.io.wavfile import write
import numpy as np
import librosa
import matplotlib.pyplot as plt
import novelty
import NeuralNet
import custom_dsp as dsp
from pathlib import Path

data_to_return = {
    "Divisions": 5,
    "Angles_hihat": [],
    "Angles_kick": [],
    "Angles_snare": [],
}

def process(data, bpm):

    data = list(data.values())

    data_arr = np.array(data, dtype= np.float32)

    data_arr = dsp.cut_start(data_arr, bpm)

    divisions, clicks = dsp.custom_dsp(data_arr)

    angles_hihat, angles_kick, angles_snare = NeuralNet.Prediction(data_arr, clicks, divisions)

    data_to_return["Divisions"] = divisions
    data_to_return["Angles_hihat"] = angles_hihat.tolist()
    data_to_return["Angles_kick"] = angles_kick.tolist()
    data_to_return["Angles_snare"] = angles_snare.tolist()

    return data_to_return
