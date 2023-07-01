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
    get_answer(request.body['question'])


    payload = json.dumps(request.body)
    response = requests.request("POST", url, headers=headers, data=payload)


    return 'success'



def get_answer(question):

    f = open("question.txt", "w")
    f.write(question)
    f.close()

    script_path = r"privateGPT\privateGPT.py"

    venv_path = 'privateGPT\myenv'

    run_script_in_virtualenv(venv_path, script_path)

    #subprocess.run(cmd,stdin=subprocess.PIPE,shell=True)

    print('done')

   # f = open("answer.txt", "r")

    #answer=f.readline()
    answer="blabla"
    f.close()


    return answer

import subprocess
import os

def run_script_in_virtualenv(venv_path, script_path):

    activate_cmd = os.path.join(venv_path, "Scripts", "activate")  # Command to activate the virtual environment
    run_cmd = f"python {script_path}"  # Command to run the Python script
    # Combine the commands to be executed
    print(activate_cmd)
    print(run_cmd)
    print('sad run to')

    batch_script=r'script_env.bat'

    #cmd = f"start cmd /K {activate_cmd} && {run_cmd}"
    #why is batch script not being run?
    #a: because it is not in the venv directory and it is not being run from there either
    subprocess.Popen(['start','cmd', '/K', batch_script], cwd=venv_path, shell=True)

    # Execute the combined command in a new Command Prompt window
    #subprocess.Popen(cmd,stdin=subprocess.PIPE, shell=True)


if __name__ == '__main__':

    host=os.environ.get('HOSTNAME')
    port=os.environ.get('API_PORT')
    app.run(host,port,debug=True)

