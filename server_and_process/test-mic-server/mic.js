
var mywav;
var data_to_send;
//JUST TO MAKE SURE HTML IS READY
jQuery(document).ready(function () {
    var $ = jQuery;

    //CLASS OF THE RECORDER
    var myRecorder = {
        objects: {
            context: null,
            stream: null,
            recorder: null
        },
        init: function () {
            if (null === myRecorder.objects.context) {
                myRecorder.objects.context = new (
                    window.AudioContext || window.webkitAudioContext
                );
            }
        },
        start: function () {
            var options = { audio: true, video: false };
            navigator.mediaDevices.getUserMedia(options).then(function (stream) {
                myRecorder.objects.stream = stream;
                myRecorder.objects.recorder = new Recorder(
                    myRecorder.objects.context.createMediaStreamSource(stream),
                    { numChannels: 1 }
                );
                myRecorder.objects.recorder.record();
            }).catch(function (err) { });
        },
        stop: function (listObject) {
            if (null !== myRecorder.objects.stream) {
                myRecorder.objects.stream.getAudioTracks()[0].stop();
            }
            if (null !== myRecorder.objects.recorder) {
                myRecorder.objects.recorder.stop();

                // Validate object
                if (null !== listObject
                    && 'object' === typeof listObject
                    && listObject.length > 0) {
                    // Export the WAV file
                    myRecorder.objects.recorder.exportWAV(function (blob) {
                        var url = (window.URL || window.webkitURL)
                            .createObjectURL(blob);
                        console.log(blob)

                        //NOW FETCH DATA TO THE SERVER
                        let promise = blob.arrayBuffer()

                        function gotdata(data) {
                            mywav = data;
                        }

                        promise.then(gotdata).then(()=>{
                            console.log(mywav);
                            extract_data(mywav);
                        }
                        )

                        async function extract_data(myrec) {

                            let view = await new DataView(myrec)

                            let arr_to_send = [];

                            for (let i = 0; i < view.byteLength; i++) {
                                arr_to_send.push(view.getInt8(i))
                            }
                            post_to_server(arr_to_send);
                        }


                        
                        


                        ///.....////

                        //FOLLOWING ONLY FOR DOWNLOAD AND PLAYBACK, MAYBE ONLY PLAYBACK
                        /*
                        // Prepare the playback
                        var audioObject = $('<audio controls></audio>')
                            .attr('src', url);
                        
                        
                        // Prepare the download link
                        var downloadObject = $('<a>&#9660;</a>')
                            .attr('href', url)
                            .attr('download', new Date().toUTCString() + '.wav');
    
                        /*
                        // Wrap everything in a row
                        var holderObject = $('<div class="row"></div>')
                            .append(audioObject)
                            .append(downloadObject);
                        
                        // Append to the list
                        listObject.append(holderObject);
                        */

                    });
                }
            }
        }
    };

    // Prepare the recordings list
    var listObject = $('[data-role="recordings"]');

    // Prepare the record button
    $('[data-role="controls"] > button').click(function () {
        // Initialize the recorder
        myRecorder.init();

        // Get the button state 
        var buttonState = !!$(this).attr('data-recording');

        // Toggle
        if (!buttonState) {
            $(this).attr('data-recording', 'true');
            myRecorder.start();
        } else {
            $(this).attr('data-recording', '');
            myRecorder.stop(listObject);
        }
    });
});