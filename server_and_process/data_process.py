##PROCESS SCRIPT

from scipy.io.wavfile import write
import numpy as np
import librosa
import matplotlib.pyplot as plt
import novelty
import NeuralNet
import custom_dsp as dsp

import get_dataset


data_to_return = {
    "Divisions": ,
    "Angles": [],
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

    divisions, clicks = dsp.custom_dsp(data_arr)


    clicks_hihat, clicks_kick, clicks_snare = NeuralNet.Prediction(data_arr, clicks)

    ##SAVE THE RECORING, JUST FOR DEBUG

    data_to_return["Divisions"] = divisions
    #data_to_return["Angles"] = TODO funzione qui


    return data_to_return
