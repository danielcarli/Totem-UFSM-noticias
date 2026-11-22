@echo off
rem Publica o Destaques UFSM no GitHub (dois cliques). Veja scripts\publicar.mjs.
cd /d "%~dp0"
node scripts\publicar.mjs %*
echo.
pause
