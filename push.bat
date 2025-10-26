@echo off
echo Adding files...
git add .

echo Committing...
git commit -m "Add admin protection and fix real-time updates"

echo Pushing to GitHub...
git push

echo.
echo Done! Check Netlify for deployment status.
pause
