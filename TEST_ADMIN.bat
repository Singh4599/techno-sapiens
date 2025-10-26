@echo off
cls
echo.
echo ========================================
echo   TESTING ADMIN FEATURES
echo ========================================
echo.
echo What's been fixed:
echo.
echo 1. /admin/manage REMOVED
echo 2. /admin now requires login (Singh/4599)
echo 3. Search and filter added
echo 4. Two CSV export buttons:
echo    - Export Filtered CSV (only filtered data)
echo    - Export All CSV (complete data)
echo.
echo ========================================
echo   STARTING DEV SERVER...
echo ========================================
echo.
cd /d "%~dp0"
npm run dev
