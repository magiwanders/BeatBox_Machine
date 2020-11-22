##PROCESS SCRIPT

from scipy.io.wavfile import write
import numpy as np

def process(data):

    ##CONVERSION FROM BYTE ARRAY TO FLOAT32 ARRAY
    data_arr = np.frombuffer(data, dtype=np.float32)

    ##SAVE THE RECORING, JUST FOR DEBUG
    write('test.wav', 48000, data_arr)

