@echo off
@rem RAIN execution batch file

set ARGS=

:loop
if [%1] == [] goto end
    set ARGS=%ARGS% %1
    shift
    goto loop
:end

@rem Load RAIN environment settings
set RAIN_HOME=C:\Users\rtiwari\workspace\RAIN
call "%RAIN_HOME%\bin\setRAINEnv.cmd"

@rem Start Node interpreter with RAIN
%RAIN_NODE% %MOIST_HOME% %PARAM% %ARGS%