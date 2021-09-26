# Import packages
from pydub import AudioSegment
from pydub.playback import play  
# Play
playaudio = AudioSegment.from_file("source/audiofile-1630952739672-bualoban-001.wav", format="wav")
play(playaudio)