# Beatbox Machine

**The human-machine rhythm converter**

Created by:
**Enrico Zoboli & Simone Shawn Cazzaniga**


##About The Project

The goal of the project is to create an application to convert the rhythm produced by the human beatbox into a rhythmic visual system and a playable rhythmic clock. The aim is to support those who want quickly sketch a rhythmic idea to be used later in their projects.

###Built With

**Frontend:**

* HTML
* CSS
* Javascript

**Backend:**

* Python 3.8

##Geting Started

###Prerequisites

**1. Python 3.8**

**2. Python packages necessary to run localy the project:**

* Numpy
* Simplejson
* Librosa
* Scipy
* Sklearn
* Tensorflow

###Usage

![Alt Text](Beatbox_gif.gif)

####General Usage

* Start the Python server by running in Python3 the file "start_here.py". Be sure to include all packages in the enviroment as listed in the section **Packages**.

* Click the start/power button to start the AudioContext of your browser.

* Start a new recording by click the "Add button" of a section.

* Beatbox the desired rhythm with your device microphone.

* Create a new **"Rhythm Clock"** by clicking the "Clock Button".


####Playback

* Once a clock has been created, click its center in order to arm it.
* Press the "Start Button" to listen all the armed clocks.
* Press the "Stop Button" to stop all clocks.

####BPM

* Adjust the BPM of the Rhythm using the BPM section in the right corner.
* Every clock is synchronized to the BPM value showed in the box.

####Section

* Each vertical section can contain up to three clocks. 
* To Add a new clock in a section click the "Add Button" in the top of the section.
* All the clocks inserted in a section can be armed simultaneusly by using the "Section Division" in the top left corner of the application page.

####Remove

* Each clock can be removed from the application page using the "Cross Button" in the left corner of a clock.

##Contact

* Simone Shawn Cazzaniga: simoneshawn.cazzaniga@mail.polimi.it
* Enrico Zoboli: enrico.zoboli@mail.polimi.it

