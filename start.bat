@echo off
echo ========================================
echo Debora di Bellucci App
echo ========================================
echo.

echo === OPZIONI DISPONIBILI ===
echo 1. Avvia server di sviluppo (locale)
echo 2. Deploy su Vercel (produzione)
echo.

set /p scelta=Scegli un'opzione (1-2): 

if "%scelta%"=="1" (
    cd frontend
    npm run dev
) else if "%scelta%"=="2" (
    vercel --prod --yes
) else (
    echo Opzione non valida!
    pause
)