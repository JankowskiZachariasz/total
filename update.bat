set "params=%*"
cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )
cd keystoneBufor
call net stop bufor_keystone.exe
call git pull origin
call npm install
call npx keystone build
call net start bufor_keystone.exe
cd ..
cd NextJS_bufor
call net stop bufor_server.exe
call git pull origin
call npm install
call npm run build
call net start bufor_server.exe
cd ..
cd Syncer
call net stop bufor_syncer.exe
call git pull origin
call npm install
call tsc index.ts
call net start bufor_syncer.exe
cd ..
cmd /k
