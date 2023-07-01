import requests as requests
from flask import Flask, request
from dotenv import load_dotenv
import time
import os
import json


load_dotenv('../.env')


app = Flask(__name__)
import subprocess



@app.route('/')
def hello_world():
    return 'Hello World!'



@app.route('/query', methods=[ 'POST'])
def getQuestion():

    host=os.environ.get('HOSTNAME')
    port=os.environ.get('CLIENT_PORT')


    url = "http://"+host+":"+port+"/pushAnswer"

    headers = {
        'Content-Type': 'application/json'
    }
    # copy request.json to request.body, and add answer
    request.body = request.json

    if request.body['question'] == 'i ja tebe':
        request.body['answer'] = '❤️'
    else:
        request.body['answer'] = 'volim te'
        request.body['sources'] = ['blaaaaaaaaaaaaaaaaaaaaaaaaasfsaaaaaaaaaaaaavasvaS<CVDSa', 'bla2', 'bla3']
    request.body['timeline'].append(time.time()*1000)

    payload = json.dumps(request.body)
    response = requests.request("POST", url, headers=headers, data=payload)


    return 'success'



def get_answer(question):

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

    host=os.environ.get('HOSTNAME')
    port=os.environ.get('API_PORT')
    app.run(host,port,debug=True)

