To start the server just open "start_here.py" compile and run. 
Now it will call only the Run function of "server.py", maybe we can use it as entry point of other processes.
In the server.py I've added a function call in the section "do_POST", called "process" declared in the file "data_process.py".
The script "data_process.py" at the moment just take the raw audio data passed during the do_POST of the server.
This data is in a byte buffer form and with the numpy function "fromarraybuffer" it's converted in a float32 array. 
This array will be written in the file test.wav. 