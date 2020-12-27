##PROCESS SCRIPT

from scipy.io.wavfile import write
import numpy as np
import librosa
import matplotlib.pyplot as plt
import novelty

import get_dataset


data_to_return = {
    "Mapping": [],
    "Sounds Type": [] 
}

def process(data):

    
    ##CONVERSION FROM BYTE ARRAY TO FLOAT32 ARRAY
    data_arr = np.frombuffer(data, dtype=np.float32)

    #accumulate data for future training
    get_dataset.write_data(data_arr)

    
    #plt.plot(data_arr)
    #plt.show()

    X_nov, Fs_nov = novelty.compute_novelty(data_arr)
    X_nov = X_nov/(np.max(X_nov))

    X_nov = novelty.smooth(X_nov)

    ##SAVE THE RECORING, JUST FOR DEBUG

    data_to_return["Mapping"].append(55)
    data_to_return["Sounds Type"].append(444)


    return data_to_return
   

