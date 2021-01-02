import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import librosa
import sklearn
import json
plt.style.use('seaborn')


dataset_path = Path('./samples/')
filelist = list(dataset_path.rglob('*.wav'))
filelist = [f.as_posix() for f in filelist]

classlist = [f.stem for f in dataset_path.iterdir() if f.is_dir()]
print(classlist)

data ={
    "orig_file": [], #original name file
    "mapping": [], #class name
    "label":[], #label as integer
    "mel":[] #MFCC
}

for file in filelist:
  print("processing {}".format(file))
  map = file.split('/')[1]
  label = classlist.index(map)

  x,sr = librosa.load(file, sr=22050)

  mel = librosa.feature.melspectrogram(x)

  data["orig_file"].append(file)
  data["mapping"].append(map)
  data["label"].append(label)
  data["mel"].append(mel.tolist())


json_path = "preprocessed.json"

with open(json_path, "w") as fp:
  json.dump(data, fp, indent=4)