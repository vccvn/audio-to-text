from pydub import AudioSegment

wav_audio = AudioSegment.from_file("audio.wav", format="wav")
raw_audio = AudioSegment.from_file("audio.wav", format="raw", frame_rate=44100, channels=2, sample_width=2)

wav_audio.export("audio1.mp3", format="mp3")
raw_audio.export("audio2.mp3", format="mp3")