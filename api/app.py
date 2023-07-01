import requests as requests
from flask import Flask, request
from dotenv import load_dotenv
import time
import os
import json


load_dotenv('../.env')
host=os.environ.get('HOSTNAME')
api_port=os.environ.get('API_PORT')
client_port=os.environ.get('CLIENT_PORT')


app = Flask(__name__)
import subprocess



@app.route('/')
def hello_world():
    return 'Hello World!'



@app.route('/query', methods=[ 'POST'])
def getQuestion():


    # copy request.json to query, and add answer
    # q: from where do i get request.json? a: from the request
    query = request.json

    if query['question'] == 'i ja tebe':
        query['answer'] = '❤️'
    else:
        query['answer'] = 'volim te'
        query['sources'] = ['blaa asfh afuishfuiajskb weahsui hsdui ', 'bla2', 'bla3']
    query['timeline'].append(time.time()*1000)

    pushQuery(query)


    return 'success'


def pushQuery(query):
    headers = {
        'Content-Type': 'application/json'
    }
    url = "http://"+host+":"+client_port+"/pushAnswer"
    payload = json.dumps(query)
    response = requests.request("POST", url, headers=headers, data=payload)
    return

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
    app.run(host,api_port,debug=True)

