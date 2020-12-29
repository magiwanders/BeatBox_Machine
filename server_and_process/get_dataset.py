from pathlib import Path
from scipy.io.wavfile import write
import numpy as np


def write_data(data):

    dataset_path = Path('./kick')
    filelist = list(dataset_path.rglob('*wav'))
    filelist = [f.as_posix() for f in filelist]

    listnum = []
    for file in filelist:
        map = Path(file).stem.split('.')[0]
        kick_num = map.split('_')[1]
        kick_num = int(kick_num)
        listnum.append(kick_num)
    
    i = max(listnum) + 1 
    filename = "./kick/kick_" + str(i) + ".wav"
    write(filename, 48000, data)