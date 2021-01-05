##PROCESS SCRIPT

from scipy.io.wavfile import write
import numpy as np
import librosa
import matplotlib.pyplot as plt
import novelty
import NeuralNet
import custom_dsp as dsp
from pathlib import Path


import get_dataset


data_to_return = {
    "Divisions": 5,
    "Angles_hihat": [],
    "Angles_kick": [],
    "Angles_snare": [],
}

def process(data):


    ##CONVERSION FROM BYTE ARRAY TO FLOAT32 ARRAY
    data_arr = np.frombuffer(data, dtype=np.float32)

    #accumulate data for future training
    #get_dataset.write_data(data_arr


    #plt.plot(data_arr)
    #plt.show()

    # X_nov, Fs_nov = novelty.compute_novelty(data_arr)
    # X_nov = X_nov/(np.max(X_nov))
    #
    # X_nov = novelty.smooth(X_nov)

    # OCIO VA FATTO UN PREPROCESSING PER LA LUNGHEZZA DI data_arr -> in funzione del bpm

    write('rec.wav', 48000, data_arr)

    divisions, clicks = dsp.custom_dsp(data_arr)


    angles_hihat, angles_kick, angles_snare = NeuralNet.Prediction(data_arr, clicks, divisions)

    ##SAVE THE RECORING, JUST FOR DEBUG

    data_to_return["Divisions"] = divisions
    data_to_return["Angles_hihat"] = angles_hihat.tolist()
    data_to_return["Angles_kick"] = angles_kick.tolist()
    data_to_return["Angles_snare"] = angles_snare.tolist()

    return data_to_return
