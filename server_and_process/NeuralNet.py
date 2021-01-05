import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import librosa
import sklearn
import json

import tensorflow as tf
model = tf.keras.models.load_model('kick_snare_hat_classifier.hdf5')

def Prediction(x, clicks):

    indexesOfNotes = [i for i, e in enumerate(clicks) if e==1]

    # Funzione che ottiene gli indici degli 1


    # Funzionw che calcola indici intermedi
    i1+(i2-i1)/2

    click[]
    x[clicks]
    000000000000000000000(0000000000001000000)(0000001000000000000000)(00000000000010000000000)(0000000001000000)00000000

def SinglePrediction(x):
    classlist = ['hihat', 'kick', 'snare']

    #Resample
    orig_sr = 48000
    dest_sr = 22050
    x = librosa.resample(x,orig_sr,dest_sr)

    #Mel
    mel = librosa.feature.mfcc(x)

    #Shape data
    mel = np.moveaxis(mel,0,1)
    mel = np.expand_dims(mel,axis=0)
    print(mel.shape)

    #Load and compile
    #model = tf.keras.models.load_model('kick_snare_hat_classifier.hdf5')
    #model.compile(loss="sparse_categorical_crossentropy", metrics=["accuracy"])

    #Predict
    preds = model.predict(mel)
    preds = np.argmax(preds,axis=1)
    print(classlist[preds[0]])
