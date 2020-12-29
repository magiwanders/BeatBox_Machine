import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import librosa
import sklearn
import tensorflow as tf
import json
from sklearn.model_selection import train_test_split
from tensorflow.keras.callbacks import CSVLogger, ModelCheckpoint, EarlyStopping



def Prediction(x):
    sr=22050
    segment_dur = 3
    num_segments = int(np.floor(x.shape[0]/(segment_dur * sr)))

    for i in range(num_segments):
        segment = x[i * segment_dur*sr:(i+1)*segment_dur*sr]
        mfccs = librosa.feature.mfcc(segment)

    print(mfccs.shape)


    #model = tf.keras.models.load_model('kick_snare_hat_classifier.hdf5')
#
    #model.compile(loss="sparse_categorical_crossentropy", metrics=["accuracy"])
#
    #model.predict()