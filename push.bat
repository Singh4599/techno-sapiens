@echo off
echo.
echo ========================================
echo   DEPLOYING ADMIN REALTIME UPDATES
echo ========================================
echo.

git add .
echo [1/3] Files staged...

git commit -m "Fix admin realtime updates - remove created_at ordering"
echo [2/3] Changes committed...

git push
echo [3/3] Pushed to GitHub!

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Run SQL in Supabase (see FINAL_DEPLOYMENT_STEPS.md)
echo 2. Wait for Netlify deploy (2-3 minutes)
echo 3. Test on live site
echo.
pause
