
from scipy.io.wavfile import write
import numpy as np

def process(data):

    new_data = []

    for i in range (len(data)):
        new_data.append(data[i])
    
    data_arr = np.asarray(new_data, dtype=np.int)

    data_type = type(data_arr)
    print(len(data_arr))
    print(data_type)
    
    scaled = np.int16(data_arr/np.max(np.abs(data_arr)) * 32767)
    write('test.wav', 48000, scaled)
    
