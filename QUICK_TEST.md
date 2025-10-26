# 🎯 Quick Test - Admin Registrations CSV

## Problem:
Admin page should show:
- ✅ User Name (jo register karte time dala)
- ✅ Email (jo register karte time dala)
- ✅ Phone Number
- ✅ Event Name (kis event ke liye register kiya)
- ✅ Team Size
- ✅ Payment Status
- ✅ Export CSV button

## Solution:

### Step 1: Login First
Go to: http://localhost:5174/login
Login with your account

### Step 2: Then Go to Admin
Go to: http://localhost:5174/admin

### Step 3: You Should See:
- **Two Tabs:** Registrations | Events
- **Registrations Tab (default)** shows:
  - Table with all user data
  - Name, Email, Phone, Event, Status
  - Export CSV button
  - Refresh button

### Step 4: Export CSV
Click "Export CSV" button
CSV will have:
- ID
- Name  
- Email
- Phone
- Event Name
- Team Size
- Status
- Payment Status
- Amount

---

## If Still Not Working:
Send screenshot of:
1. Admin page after login
2. Console (F12)
