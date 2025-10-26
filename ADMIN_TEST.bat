@echo off
cls
echo.
echo ========================================
echo   ADMIN LOGIN - COMPLETELY SEPARATE
echo ========================================
echo.
echo FIXED:
echo 1. /admin now requires ADMIN LOGIN (Singh/4599)
echo 2. Regular user login CANNOT access /admin
echo 3. Logout button added to admin panel
echo 4. Admin session stored separately
echo.
echo ========================================
echo   TEST STEPS:
echo ========================================
echo.
echo 1. Start server: npm run dev
echo 2. Go to: http://localhost:5174/admin
echo 3. Should redirect to: /admin/login
echo 4. Login with: Singh / 4599
echo 5. Access granted to admin panel
echo 6. Click Logout to exit
echo.
echo ========================================
echo   STARTING SERVER...
echo ========================================
echo.
cd /d "%~dp0"
npm run dev
