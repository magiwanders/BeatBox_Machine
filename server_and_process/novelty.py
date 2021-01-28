import numpy as np
import librosa
import matplotlib.pyplot as plt
#import IPython.display as ipd
import scipy as sp
from scipy.signal import find_peaks

def warp(x, low, interval):
    return np.remainder(x - low, interval) + low


def princarg(x):
    return warp(x, -np.pi, 2*np.pi)


def compute_novelty(x, Fs=1, N=512, H=256):
   
    X = librosa.stft(x, n_fft=N, hop_length=H, win_length=N, window='hanning')
    Fs_feature = Fs/H
    mag = np.abs(X)
    
    phase = np.angle(X)/(2*np.pi)
    
    unwr_phase = np.zeros_like(X, dtype=float)
    for i in np.arange(X.shape[1]):
        unwr_phase[:,i] = np.unwrap( np.angle(X[:,i]) )
    
    phase_shift = unwr_phase[:,2:] - 2*unwr_phase[:,1:-1] + unwr_phase[:,0:-2]
    phase_shift = princarg(phase_shift)    
    
    
    amp_pred = mag[:,1:-1]
    amp_true = mag[:,2:]
    
    novelty_complex = (amp_pred**2 + amp_true**2 - 2 * amp_pred * amp_true * np.cos(phase_shift))
    
    novelty_complex[novelty_complex<0]=0
    
    novelty_complex = np.sqrt(novelty_complex)
    
    novelty_complex = np.sum(novelty_complex, axis=0)
    novelty_complex = np.concatenate((novelty_complex, np.array([0, 0])))
    
    return novelty_complex, Fs_feature


def smooth(x, win_length=11, win_type='boxcar'):
    if x.ndim != 1:
        raise ValueError('smooth only accepts 1 dimension arrays.')

    if x.size < win_length:
        raise ValueError('Input vector needs to be bigger than window size.')

    if win_length<3:
        return x
    # mirror pad
    s = np.pad(x, int(win_length/2), mode='reflect')   
    
    # create window
    w = sp.signal.windows.get_window(win_type, win_length)
    
    # convolve with normalized window
    y=np.convolve(w/w.sum(), s, mode='valid')
    
    #normalize
    y=y/(np.max(y))
    
    #padding for garantee the same len of x and y
    pad_width = len(y) - len(x)
    y = np.pad(y, pad_width)
    
    # return the useful part of y
    return y