@echo off
cd /d "%~dp0.."
where py >nul 2>nul
if %errorlevel%==0 (set PY=py) else (where python >nul 2>nul && set PY=python)
if not defined PY goto nopy
echo Abriendo la web en http://localhost:8000  (cierra esta ventana para detener)
start "" http://localhost:8000
%PY% -m http.server 8000
goto :eof
:nopy
echo No encontre Python. Instalalo desde python.org (marca "Add to PATH") o usa la extension Live Server de VS Code.
pause
