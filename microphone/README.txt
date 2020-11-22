USAGE:
1. start the index.html file
2. click the RESUME button to resume the audiocontext.
3. click the START button, it will start the recording.
4. click the STOP button, it will take your data and do POST to the server.

This POST function is declared in the file "fetch.js".
The function called "post_to_server" use the fetch function in a asyncrous way, 
with the strcture: async *name_of_func*(){await *your_variable* = fetch('URL to fetch', options)}
The OPTIONS field decleare the type of method of the fetch (POST), the type of your data (HEADER) and the actual data (BODY).

The "microphone.js" is your main file and use the techologies seen at lesson.
The function "startrecording", called at button click, reset the AudioIndex to start writing on the AudioData. 
AudioData stores al Float32 values of the recording.

*THINGS TO DO FOR FUTURE IMPROVMENTS*
A dynamic and effienct way to represet the whole data recorded during the actual recording.
MAYBE it could be done filtering the array and represent only some samples to speed up the drawing process. 