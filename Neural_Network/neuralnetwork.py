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

data ={
    "orig_file": [], #original name file
    "segment_id": [], #segment id within audio file
    "mapping": [], #class name
    "label":[], #label as integer
    "mel":[] #Mels
}

'''
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



json_path = 'classification_k_s_h.json'
with open(json_path, 'w') as fp:
  json.dump(data, fp, indent=4)


'''



json_path ="classification_k_s_h.json"
with open(json_path, "r") as fp:
  dataload = json.load(fp)

fileload = dataload["orig_file"]
maps = dataload["mapping"]
labels = dataload["label"]
X_mel = dataload["mel"]


Xdata = np.asarray(X_mel)
Ydata = np.asarray(labels)


print(Xdata.shape)
print(Ydata.shape)

X_train, X_val, y_train, y_val = train_test_split(Xdata, Ydata, test_size=0.3)

X_train_rs = np.moveaxis(X_train,1,2)
X_val_rs = np.moveaxis(X_val,1,2)

X_train_rss = np.expand_dims(X_train_rs,axis=3)
X_val_rss = np.expand_dims(X_val_rs,axis=3)

print(X_train_rss.shape)


'''
input_shape = (None, X_train_rss.shape[2],1)

print(input_shape)
modeltd = tf.keras.models.Sequential()

#1st Conv layer
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.Conv1D(8, 9, activation="relu"), input_shape = input_shape))
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.MaxPooling1D(2, padding="same")))
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.BatchNormalization()))

#2nd Conv layer
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.Conv1D(16,3, activation="relu")))
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.MaxPooling1D(2, padding="same")))
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.BatchNormalization()))

#Flatten output and feed to a dense layer
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.Flatten()))
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.Dense(32, activation="relu", kernel_regularizer=tf.keras.regularizers.L2(l2=0.001))))
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.Dropout(0.45)))

#output layer
modeltd.add(tf.keras.layers.TimeDistributed(tf.keras.layers.Dense(3, activation="softmax")))
modeltd.add(tf.keras.layers.GlobalAveragePooling1D())
modeltd.summary()

adamopt = tf.keras.optimizers.Adam(learning_rate=0.001)
modeltd.compile(optimizer=adamopt, loss="sparse_categorical_crossentropy", metrics=["accuracy"])

log_file_path ="trainig_5.log"
csv_logger = CSVLogger(log_file_path, append=False)

patience = 100
early_stop = EarlyStopping('val_loss', patience=patience)

model_name = "kick_snare_hat_classifier.hdf5"
model_checkpoint = ModelCheckpoint(filepath=model_name, monitor="val_accuracy",verbose=1, save_best_only=True)

#Create callbacks
callbacks = [model_checkpoint, csv_logger, early_stop]

#Train the model
history = modeltd.fit(X_train_rss, y_train, validation_data=(X_val_rss, y_val), batch_size=32, epochs=300, callbacks= callbacks)
'''