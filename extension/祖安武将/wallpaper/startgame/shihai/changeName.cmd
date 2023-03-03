@echo off
set me=%0
setlocal enabledelayedexpansion
set i=1
for /r %%c  in (*.*) do (
if not "%%c"=="%me:"=%" (
for /f  %%a in ("%%c") do ren %%a !i!%%~xa
set /a i=!i!+1
)
)
pause
exit