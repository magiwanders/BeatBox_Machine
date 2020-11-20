
from scipy.io.wavfile import write
import numpy as np

def process(data):

    data_arr = np.frombuffer(data, dtype=np.float32)

    write('test.wav', 48000, data_arr)

