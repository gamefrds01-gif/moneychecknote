@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === moneychecknote GitHub 푸시 ===
set /p REPO=GitHub repo URL 붙여넣기(예 https://github.com/USER/moneychecknote.git): 
if "%REPO%"=="" ( echo URL 없음. 종료. & pause & exit /b )
git init
git config user.email >nul 2>nul || git config user.email "lkh820804@gmail.com"
git config user.name >nul 2>nul || git config user.name "AURION"
git add -A
git commit -m "moneychecknote 초기 배포"
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO%
git push -u origin main
echo.
echo [완료] 이제 Cloudflare Pages에서 이 repo를 연결하세요.
pause
