@echo off
for /f "eol=# tokens=*" %%i in (%~dp0.env) do set %%i


cd api
start python privateGPT.py

cd ../client
start node server.js

start http://%CLIENT_HOST%:%CLIENT_PORT%/
