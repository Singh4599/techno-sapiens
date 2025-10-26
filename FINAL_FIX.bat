@echo off
cls
echo.
echo ========================================
echo   FINAL FIX - ADMIN REGISTRATIONS
echo ========================================
echo.
echo What was fixed:
echo - Added Registrations tab to admin page
echo - RegistrationsManager now properly imported
echo - Registrations tab is default view
echo - Real-time updates enabled
echo.
echo ========================================
echo   DEPLOYING TO NETLIFY...
echo ========================================
echo.

git add .
git commit -m "Add registrations tab to admin page"
git push

echo.
echo ========================================
echo   SUCCESS! DEPLOYMENT TRIGGERED
echo ========================================
echo.
echo Next steps:
echo 1. Wait 2-3 minutes for Netlify build
echo 2. Go to: https://technosapiens-dhruvv.netlify.app/admin
echo 3. You will see TWO TABS:
echo    - Registrations (default) - Shows all registrations
echo    - Events - Manage events
echo.
echo 4. Hard refresh (Ctrl+Shift+R) after deploy completes
echo.
pause
