import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import librosa
import sklearn
import json

import tensorflow as tf
model = tf.keras.models.load_model('kick_snare_hat_classifier.hdf5')



def convert_to_angles(divisions, clicks_hihat, clicks_kick, clicks_snare):
    step = 360/divisions

    step_arr = np.zeros(divisions)

    for i in range(divisions):
        step_arr[i] = i*step

    angles_hihat = np.multiply(step_arr,clicks_hihat)
    angles_kick = np.multiply(step_arr,clicks_kick)
    angles_snare = np.multiply(step_arr,clicks_snare)

    return angles_hihat, angles_kick, angles_snare


def Prediction(x, clicks, divisions):

    # Funzione che ottiene gli indici degli 1
    indexesOfNotes = [i for i, e in enumerate(clicks) if e==1]

    indexesOfNotes = np.asarray(indexesOfNotes)*256

    #cuts = np.zeros(len(indexesOfNotes)-1)
    cuts = []
    # Funzionw che calcola indici intermedi
    for i in range(len(indexesOfNotes)-1):
        #cuts[i] = (indexesOfNotes[i+1] - indexesOfNotes[i])/2 + indexesOfNotes[i]
        cuts.append(int((indexesOfNotes[i+1] - indexesOfNotes[i])/2 + indexesOfNotes[i]))

    
    #Insert the starting point
    cuts.insert(0,0)

    #insert the end
    cuts.append(len(clicks)*256)

    divisions = int(divisions)
    clicks_hihat = np.zeros(divisions)
    clicks_kick = np.zeros(divisions)
    clicks_snare = np.zeros(divisions)

    print(indexesOfNotes)
    print('cuts:', cuts)


    for i in range(len(cuts) - 1):
        to_pred = x[cuts[i]:cuts[i+1]]
        pred = SinglePrediction(to_pred)

        if(pred == 0):
            print("hihat")
            clicks_hihat[i] = 1
        elif(pred == 1):
            print('kick')
            clicks_kick[i] = 1
        elif(pred == 2):
            print('snare')
            clicks_snare[i] = 1


    return convert_to_angles(divisions, clicks_hihat, clicks_kick, clicks_snare)
    


def SinglePrediction(x):
    classlist = ['hihat', 'kick', 'snare']
    
    if(len(x) > 0):
        #Resample
        orig_sr = 48000
        dest_sr = 22050
        x = librosa.resample(x,orig_sr,dest_sr)

        pad_width = dest_sr*5 - len(x)
        x_pad = np.pad(x, pad_width)
        #MFCCs
        mfcc = librosa.feature.mfcc(x_pad)

        #Shape data
        mfcc = np.moveaxis(mfcc,0,1)
        mfcc = np.expand_dims(mfcc,axis=0)
        print(mfcc.shape)

        #Load and compile
        #model = tf.keras.models.load_model('kick_snare_hat_classifier.hdf5')
        #model.compile(loss="sparse_categorical_crossentropy", metrics=["accuracy"])

        #Predict
        preds = model(mfcc, training = False)
        preds = np.argmax(preds,axis=1)
        

    return preds[0]
