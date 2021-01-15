import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import librosa
import sklearn
import json

import tensorflow as tf
model = tf.keras.models.load_model('kick_snare_hat_classifier.hdf5')



def convert_to_angles(divisions, clicks_hihat, clicks_kick, clicks_snare):

    # print('INIZIO convert_to_angles')
    # print(divisions)
    # print(clicks_hihat)
    # print(clicks_kick)
    # print(clicks_snare)


    step = 360/divisions

    step_arr = np.zeros(divisions)

    for i in range(divisions):
        step_arr[i] = i*step


    angles_hihat = np.multiply(step_arr,clicks_hihat)
    angles_kick = np.multiply(step_arr,clicks_kick)
    angles_snare = np.multiply(step_arr,clicks_snare)

    angles_hihat = angles_hihat[angles_hihat != 0]
    angles_kick = angles_kick[angles_kick != 0]
    angles_snare = angles_snare[angles_snare != 0]

    angles_hihat = np.rint(angles_hihat)
    angles_kick = np.rint(angles_kick)
    angles_snare = np.rint(angles_snare)

    if clicks_hihat[0] == 1:
        angles_hihat = np.insert(angles_hihat, 0,0)

    if clicks_kick[0] == 1:
        angles_kick = np.insert(angles_kick, 0,0)

    if clicks_snare[0] == 1:
        angles_snare = np.insert(angles_snare, 0,0)

    # print(angles_hihat)
    # print(angles_kick)
    # print(angles_snare)
    # print('FINE convert_to_angles')

    return angles_hihat, angles_kick, angles_snare


def checkKey(dict, key):
    if key in dict.keys():
        return True
    else:
        return False


def Prediction(x, clicks, divisions):

    #print('INIZIO PREDICTION')

    divisions = int(divisions)

    # Funzione che ottiene gli indici degli 1
    indexesOfNotes = [i for i, e in enumerate(clicks) if e==1]

    indexesOfNotes = np.asarray(indexesOfNotes)*256

    #print(len(indexesOfNotes))

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

    #print(len((cuts)))


    # Ceate result dictionary (divisionNumber -> pred)

    result_dict = {}
    for i in range(len(indexesOfNotes)):
        to_pred = x[cuts[i]:cuts[i+1]]
        pred = SinglePrediction(to_pred)
        if pred==0:
            print('Hihat')
        if pred==1:
            print('Kick')
        if pred==2:
            print('Snare')

        result_dict[np.rint(indexesOfNotes[i]/len(x)*divisions)] = pred

    #print(result_dict)

    # Build the divisions long istheres
    isthere_hihat = np.zeros(divisions)
    isthere_kick = np.zeros(divisions)
    isthere_snare = np.zeros(divisions)

    for i in range(divisions):
        if(checkKey(result_dict, i)):
            if(result_dict[i]==0):
                isthere_hihat[i] = 1
            if(result_dict[i]==1):
                isthere_kick[i] = 1
            if(result_dict[i]==2):
                isthere_snare[i] = 1

    print(indexesOfNotes)
    print('cuts:', cuts)

    #print('FINE PREDICTION')

    return convert_to_angles(divisions, isthere_hihat, isthere_kick, isthere_snare)



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
