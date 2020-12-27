##PROCESS SCRIPT

from scipy.io.wavfile import write
import numpy as np
import librosa
import matplotlib.pyplot as plt
import novelty

def process(data):

    
    ##CONVERSION FROM BYTE ARRAY TO FLOAT32 ARRAY
    data_arr = np.frombuffer(data, dtype=np.float32)

    write('test.wav', 48000, data_arr)
    #plt.plot(data_arr)
    #plt.show()

    X_nov, Fs_nov = novelty.compute_novelty(data_arr)
    X_nov = X_nov/(np.max(X_nov))

    X_nov = novelty.smooth(X_nov)

    feature_time_axis = np.arange(X_nov.shape[0]) / Fs_nov

    plt.figure(figsize=(20, 15))
    plt.xlim([feature_time_axis[0], feature_time_axis[-1]])
    plt.title('Novelty function of x')
    plt.xlabel('Time (seconds)')
    plt.plot(feature_time_axis, X_nov)
    plt.show()
    ##SAVE THE RECORING, JUST FOR DEBUG
   

