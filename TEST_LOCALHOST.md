# 🧪 Test on Localhost - Step by Step

## Step 1: Start Dev Server
```bash
cd techno-sapiens
npm run dev
```

## Step 2: Open Admin Page
Go to: http://localhost:5173/admin

## Step 3: Check Console (F12)
Look for these logs:
- 🔄 Fetching registrations...
- 📦 Supabase response: {count: X, error: null, data: [...]}
- ✅ Found X registrations

## Step 4: If Still Shows 0 Registrations

Run this in browser console:
```javascript
// Test 1: Direct query
const { data, error } = await supabase.from('registrations').select('*');
console.log('Direct query:', data, error);

// Test 2: Check current user
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);

// Test 3: Check RLS status
const { data: testData } = await supabase.from('registrations').select('count');
console.log('Count:', testData);
```

## Step 5: Expected Result
You should see:
- ✅ Tabs: "Registrations" and "Events"
- ✅ Registrations tab shows all data
- ✅ User names, emails, events visible
- ✅ Refresh button works

---

## If It Works on Localhost:
Then we'll deploy to Netlify!

## If It Doesn't Work:
Send me the console output and we'll debug further.
