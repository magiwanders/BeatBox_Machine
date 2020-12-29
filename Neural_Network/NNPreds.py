import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import librosa
import sklearn
import tensorflow as tf
import json
from sklearn.model_selection import train_test_split
from tensorflow.keras.callbacks import CSVLogger, ModelCheckpoint, EarlyStopping


dataset_path = Path('./samples/')
filelist = list(dataset_path.rglob('*.wav'))
filelist = [f.as_posix() for f in filelist]

classlist = [f.stem for f in dataset_path.iterdir() if f.is_dir()]
print(classlist)

json_path ="classification_k_s_h.json"
with open(json_path, "r") as fp:
  dataload = json.load(fp)

fileload = dataload["orig_file"]
maps = dataload["mapping"]
labels = dataload["label"]
X_mfcc = dataload["mel"]


Xdata = []
for mfcc in X_mfcc:
  mfcc = np.asarray(mfcc)
  Xdata.append(mfcc)

Xdata = np.asarray(Xdata)
y_total = np.asarray(labels)

plt.plot(y_total)


files_train_rs, files_val_rs = train_test_split(filelist, test_size = 0.3)

indicies_train = [i for i,s in enumerate(fileload) if s in files_train_rs]

indicies_val = [i for i,s in enumerate(fileload) if s in files_val_rs]

X_train_rs = Xdata[indicies_train,:,:]
X_val_rs = Xdata[indicies_val,:,:]
y_train = y_total[indicies_train]
y_val = y_total[indicies_val]

X_train_rs = np.expand_dims(X_train_rs, axis= 3)
X_val_rs = np.expand_dims(X_val_rs, axis= 3)


model = tf.keras.models.load_model('kick_snare_hat_classifier.hdf5')

model.compile(loss="sparse_categorical_crossentropy", metrics=["accuracy"])
#Evaluation
[loss,acc] = model.evaluate(X_val_rs, y_val)

print("Validation accuracy:", acc)
print("Validation loss:", loss)