@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === moneychecknote 업데이트 푸시 ===
git add -A
git commit -m "update"
git push
echo.
echo [완료] Cloudflare Pages가 자동으로 재배포합니다(1~2분).
pause
