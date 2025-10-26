@echo off
echo.
echo ========================================
echo   FORCING NEW DEPLOYMENT
echo ========================================
echo.

git add .
git commit -m "Force deploy - fix admin registrations"
git push

echo.
echo ========================================
echo   PUSHED! Wait 2-3 minutes for Netlify
echo ========================================
echo.
echo Then:
echo 1. Go to https://app.netlify.com/sites/dhruvsim/deploys
echo 2. Wait for green checkmark
echo 3. Hard refresh admin page (Ctrl+Shift+R)
echo.
pause
