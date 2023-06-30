import requests as requests
from flask import Flask, request
from dotenv import load_dotenv
import time
import os
app = Flask(__name__)
import subprocess



@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/query', methods=[ 'POST'])
def getQuestion():

    question = request
    print(question)
    print('done')

    #why isnt any of this being printed?

    # answer = get_answer(question)
    # print(answer)
    # url = 'http://192.168.1.201:3000/pushAnswer'
    #
    # data = {'answer': 'blabla'}
    #
    # requests.request("POST", url, data=data)
    # print('done')

    return 'success'



def get_answer(question):
    load_dotenv('C:/Users/Ivor/Documents/GitHub/privateGPT/.env')

    f = open("question.txt", "w")
    f.write(question)
    f.close()

    command='start cmd /K python C:/Users/Ivor/Documents/GitHub/privateGPT/privateGPT.py'

    subprocess.Popen(command,stdin=subprocess.PIPE, shell=True)

    print('done')

   # f = open("answer.txt", "r")

    #answer=f.readline()
    answer="blabla"
    f.close()


    return answer


if __name__ == '__main__':


    app.run('192.168.1.114', 5000, debug=True)

