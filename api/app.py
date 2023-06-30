import requests as requests
from flask import Flask, request
from dotenv import load_dotenv
import time
import os
import json

app = Flask(__name__)
import subprocess



@app.route('/')
def hello_world():
    return 'Hello World!'



@app.route('/query', methods=[ 'POST'])
def getQuestion():




    #print(question,id,timeline)

    url = 'http://localhost:3000/pushAnswer'
    payload = {'answer': 'blabla',
               'id': '1'}
    headers = {
        'Content-Type': 'application/json'
    }
    id=request.json['id']
    question=request.json['question']
    timeline=request.json['timeline']


    request.body = {'id': id,
                    'question': question,
                    'timeline': timeline,
                    'answer': 'volim te'}

    payload = json.dumps(request.body)
    response = requests.request("POST", url, headers=headers, data=payload)


    return 'success'



def get_answer(question):
    load_dotenv('C:/Users/Ivor/Documents/GitHub/privateGPT/.env')

    f = open("question.txt", "w")
    f.write(question)
    f.close()

    #ovo ce trazit odgovor od privateGPT.py


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

