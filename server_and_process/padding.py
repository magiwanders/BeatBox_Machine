from pydub import AudioSegment
from pathlib import Path

dataset_path = Path('./kicks_to_pad')
filelist = list(dataset_path.rglob('*wav'))
filelist = [f.as_posix() for f in filelist]


pad_ms = 5000  # Add here the fix length you want (in milliseconds)


for file in filelist:
    audio = AudioSegment.from_wav(file)
    assert pad_ms > len(audio), "Audio was longer that 1 second. Path: " + str(full_path)
    silence = AudioSegment.silent(duration=pad_ms-len(audio)+1)

    padded = audio + silence  # Adding silence after the audio
    padded.export('./padd/snare_'+str(filelist.index(file)+92)+'.wav', format='wav')