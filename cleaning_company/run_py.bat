@echo off
setlocal EnableDelayedExpansion
WHERE /q python
IF %ERRORLEVEL% NEQ 0 ( ECHO "python wasn't found, installing nvm to install python" 
    set python_version=3.12.2
    REM Define the URL and file name of the Python installer
    set "url=https://www.python.org/ftp/python/!python_version!/python-!python_version!-amd64.exe"
    set "installer=python-%python_version%-amd64.exe"

    REM Define the installation directory
    set "targetdir=C:\Python!python_version!"

    REM Download the Python installer
    echo Downloading Python installer...
    powershell -Command "(New-Object Net.WebClient).DownloadFile('!url!', '!installer!')"

    REM Install Python with a spinner animation
    echo Installing Python...
    start /wait !installer! /quiet /passive TargetDir=!targetdir! Include_test=0 ^
    && (echo Done.) || (echo Failed!)
    echo.

    REM Add Python to the system PATH
    echo Adding Python to the system PATH...
    setx PATH "!targetdir!;!PATH!"
    if !errorlevel! EQU 1 (
    echo Python has been successfully installed to your system BUT failed to set system PATH. Try running the script as administrator.
    pause
    exit
    )
    echo Python !python_version! has been successfully installed and added to the system PATH.

    REM Cleanup
    echo Cleaning up...
    del !installer!

    echo Done!) ^
ELSE ( ECHO python was found )

REM Activate the virtual environment
echo Activating virtual environment...
cd ../
call virt\Scripts\activate

REM Run the Django project
cd cleaning_company
echo Running Django project...
python manage.py runserver
@REM start explorer http://localhost:3000

@REM set url=https://endoflife.date/api/python.json

@REM set "response="
@REM for /f "usebackq delims=" %%i in (`powershell -command "& {(Invoke-WebRequest -Uri '%url%').Content}"`) do set "response=!response!%%i"

@REM set "latest_py_version="
@REM for /f "tokens=1,2 delims=}" %%a in ("%response%") do (
@REM     set "object=%%a}"
@REM     for %%x in (!object!) do (
@REM         for /f "tokens=1,* delims=:" %%y in ("%%x") do (
@REM             if "%%~y" == "latest" (
@REM                 set "latest_py_version=%%~z"
@REM             )
@REM         )
@REM     )
@REM )

@REM echo %latest_py_version%

@REM REM Set the minimum required Python version
@REM set python_version=%latest_py_version%

@REM REM Check if Python is already installed and if the version is less than python_version
@REM echo Checking if Python %python_version% or greater is already installed...
@REM set "current_version="
@REM where python >nul 2>nul && (
@REM     for /f "tokens=2" %%v in ('python --version 2^>^&1') do set "current_version=%%v"
@REM )
@REM if "%current_version%"=="" (
@REM     echo Python is not installed. Proceeding with installation.
@REM ) else (
@REM     if "%current_version%" geq "%python_version%" (
@REM         echo Python %python_version% or greater is already installed. Exiting.
@REM         pause
@REM         exit
@REM     )
@REM )

REM Define the URL and file name of the Python installer
@REM set "url=https://www.python.org/ftp/python/%python_version%/python-%python_version%-amd64.exe"
@REM set "installer=python-%python_version%-amd64.exe"

@REM REM Define the installation directory
@REM set "targetdir=C:\Python%python_version%"

@REM REM Download the Python installer
@REM echo Downloading Python installer...
@REM powershell -Command "(New-Object Net.WebClient).DownloadFile('%url%', '%installer%')"

@REM REM Install Python with a spinner animation
@REM echo Installing Python...
@REM start /wait %installer% /quiet /passive TargetDir=%targetdir% Include_test=0 ^
@REM && (echo Done.) || (echo Failed!)
@REM echo.

@REM REM Add Python to the system PATH
@REM echo Adding Python to the system PATH...
@REM setx PATH "%targetdir%;%PATH%"
@REM if %errorlevel% EQU 1 (
@REM   echo Python has been successfully installed to your system BUT failed to set system PATH. Try running the script as administrator.
@REM   pause
@REM   exit
@REM )
@REM echo Python %python_version% has been successfully installed and added to the system PATH.

@REM REM Cleanup
@REM echo Cleaning up...
@REM del %installer%

@REM echo Done!
pause
