@echo off
title ParaguayReal - Local Dev Server
echo =======================================================
echo     Iniciando servidor de desarrollo de ParaguayReal
echo =======================================================
echo.
echo Abriendo http://localhost:3005 en tu navegador...
start http://localhost:3005
echo 2. Levantando servidor Next.js...
echo.
npm run dev
pause
