import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import librosa
import sklearn
import tensorflow as tf
import json
from sklearn.model_selection import train_test_split
from tensorflow.keras.callbacks import CSVLogger, ModelCheckpoint, EarlyStopping



#def Prediction(x):
#    classlist = ['hihat', 'kick', 'snare']
# 
#    mel = librosa.feature.melspectrogram(x)
#
#    #mel = np.expand_dims(mel,axis=0)
##
#    #mel = np.expand_dims(mel,axis=0)
#
#    print(mel.shape)
#
#    model = tf.keras.models.load_model('kick_snare_hat_classifier.hdf5')
##
#    model.compile(loss="sparse_categorical_crossentropy", metrics=["accuracy"])
##
#    preds = model.predict(mel)
#    preds = np.argmax(preds,axis=1)
#
#    print(classlist[preds[0]])