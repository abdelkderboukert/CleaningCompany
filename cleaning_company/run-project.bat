@ECHO off

ECHO Starting run_py.bat...
CALL run_py.bat
IF %ERRORLEVEL% NEQ 0 (
    ECHO Error running run_py.bat
    PAUSE
    EXIT /B 1
)

ECHO Starting run-next.bat...
cd frontend
CALL run-next.bat
IF %ERRORLEVEL% NEQ 0 (
    ECHO Error running run-next.bat
    PAUSE
    EXIT /B 1
)

ECHO All scripts completed successfully!