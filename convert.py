#!/usr/bin/python
import sys
import os
import os.path
import random
import string
# import subprocess

import mutagen
from mutagen.wave import WAVE

from pydub import AudioSegment
from pydub.silence import split_on_silence

import speech_recognition as sr

def str_random():
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(10))



r = sr.Recognizer()


def getLanguage(argument):
    switcher = {
        1: "vi-VN",
        2: "en-US"
        
    }
    return switcher.get(argument, 0)
# end get lang

def getSelection():
    while True:
        try:
            userInput = int(input())
            if(userInput<1 or userInput>2):
                print("Not an integer! Try again.")
                continue
        except ValueError:
            print("Not an integer! Try again.")
            continue
        else:
            return userInput
            break

def getInputFile():
    while True:
        try:
            userInput = input()
            if os.path.isfile(userInput) != True:
                print("File input is not exists")
                continue
        except ValueError:
            print("Not a file! Try again.")
            continue
        else:
            return userInput
            break

def audio_duration(length):
    hours = length // 3600  # calculate in hours
    length %= 3600
    mins = length // 60  # calculate in minutes
    length %= 60
    seconds = length  # calculate in seconds
  
    return hours, mins, seconds  # returns the duration

def get_audio_duration(path = 'test.wav'):
    # Create a WAVE object
    # Specify the directory address of your wavpack file
    # "alarm.wav" is the name of the audiofile
    audio = WAVE(path)
    
    # contains all the metadata about the wavpack file
    audio_info = audio.info
    length = int(audio_info.length)
    hours, mins, seconds = audio_duration(length)
    return hours, mins, seconds

def get_audio_length(path = 'test.wav'):
    # Create a WAVE object
    # Specify the directory address of your wavpack file
    # "alarm.wav" is the name of the audiofile
    audio = WAVE(path)
    
    # contains all the metadata about the wavpack file
    audio_info = audio.info
    length = int(audio_info.length)
    return length


# a function that splits the audio file into chunks
# and applies speech recognition
def silence_based_conversion(lang = 'vi-VN', path = "test.wav", outputFile = 'test.txt'):
    print("open file: ", path)
    # open the audio file stored in
    # the local system as a wav file.
    song = AudioSegment.from_wav(path)
  
    # open a file where we will concatenate  
    # and store the recognized text
    fh = open(outputFile, "w+")
          
    # split track where silence is 0.5 seconds 
    # or more and get chunks
    chunks = split_on_silence(song,
        # must be silent for at least 0.5 seconds
        # or 500 ms. adjust this value based on user
        # requirement. if the speaker stays silent for 
        # longer, increase this value. else, decrease it.
        min_silence_len = 500,
  
        # consider it silent if quieter than -16 dBFS
        # adjust this per requirement
        silence_thresh = -16
    )

    taskKey = str_random()
    # create a directory to store the audio chunks.
    try:
        os.mkdir('chunks/'+taskKey)
    except(FileExistsError):
        pass
  
    # move into the directory to
    # store the audio files.
    os.chdir('chunks/'+taskKey)
  
    i = 0
    # process each chunk
    for chunk in chunks:
              
        # Create 0.5 seconds silence chunk
        chunk_silent = AudioSegment.silent(duration = 10)
  
        # add 0.5 sec silence to beginning and 
        # end of audio chunk. This is done so that
        # it doesn't seem abruptly sliced.
        audio_chunk = chunk_silent + chunk + chunk_silent
  
        # export audio chunk and save it in 
        # the current directory.
        print("saving chunk{0}.wav".format(i))
        # specify the bitrate to be 192 k
        audio_chunk.export("./chunk{0}.wav".format(i), bitrate ='192k', format ="wav")
  
        # the name of the newly created chunk
        filename = 'chunk'+str(i)+'.wav'
  
        print("Processing chunk "+str(i))
  
        # get the name of the newly created chunk
        # in the AUDIO_FILE variable for later use.
        file = filename
  
        # create a speech recognition object
        r2 = sr.Recognizer()
  
        # recognize the chunk
        with sr.AudioFile(file) as source:
            # remove this if it is not working
            # correctly.
            r2.adjust_for_ambient_noise(source)
            audio_listened = r2.listen(source)
  
            try:
                # try converting it to text
                rec = r2.recognize_google(audio_listened, language = lang)
                # write the output to the file.
                fh.write(rec+". ")
    
            # catch any errors.
            except sr.UnknownValueError:
                print("Could not understand audio")
    
            except sr.RequestError as e:
                print("Could not request results. check your internet connection")
  
        i += 1
  
    os.chdir('../..')


def shortFileConvertion(lang = 'vi-VN', inputPath = 'test.wav', outputPath = ''):
    with sr.AudioFile(inputPath) as source:
        print('Đang phân tích file')
        audio_text = r.listen(source)
        # recoginize_() method will throw a request error if the API is unreachable, hence using exception handling
        try:
        
            # using google speech recognition
            print('đang chuyển audio sang văn bản ...')
            text = r.recognize_google(audio_text, language = lang)
            print(text)
            if outputPath != '' :
                try: 
                    f = open(outputPath, "w")
                    f.write(text)
                    f.close()
                except:
                    print("Có lỗi xảy ra chưa lưu dc file")

        except:
            print('Có lỗi xảy ra vui lòng thử lại')


def startConvertion(lang = 'vi-VN', inputPath = 'test.wav', outputPath = ''):
    if os.path.isfile(inputPath) != True:
        return False
    removeAfter = False
    fileName = inputPath
    fileEp = inputPath.split(".")
    # return False
    length = 0
    if len(fileEp) > 1: 
        ext = fileEp.pop()
        if ext != "wav":
            fna = inputPath + ".wav"
            # subprocess.call(['sox', inputPath, '-e', 'mu-law', 
            #        '-r', '16k', fna, 'remix', '1,2'])
            # subprocess.call(['ffmpeg', '-i', inputPath, fna])
            source_audio = AudioSegment.from_file(inputPath, format=ext)
            source_audio.export(fna, format="wav")
            # length = get_audio_length(fna)
            
            fileName = fna
            
            # removeAfter = True
            
    length = get_audio_length(fileName)
        #end if ext != 'wac'
    if length > 60:
        silence_based_conversion(lang, fileName, outputPath)
    else:
        shortFileConvertion(lang, fileName, outputPath)

    if removeAfter == True: 
        os.remove(fileName)

#end
if __name__ == '__main__':
    if len(sys.argv) > 2 :
        lang = int(sys.argv[1])    
        filename = sys.argv[2]
        outFile = ''
        if len(sys.argv) > 3: 
            outFile = sys.argv[3]
        languageSelection = getLanguage(lang)
        startConvertion(languageSelection, filename, outFile)
    else:
            
        # we can add select language
        
        print("Please select language for translate")
        print("1: Tiếng Việt (Vietnamese)")
        print("2: Tiếng Amh (English)")
        languageSelection = getLanguage(getSelection())
        print("Please enter input filename")
        filename = getInputFile()
        print("Please enter output filename (optional)")
        outFile = input()
        startConvertion(languageSelection, outFile)
    