# 🧪 Test Commands for Browser Console

After running the SQL, open your site and run these in browser console (F12):

## Test 1: Check Admin Status
```javascript
// Test if you're admin
const { data: admin } = await supabase.from('admin_users').select('*');
console.log('Admin users:', admin);
```

## Test 2: Check Registrations
```javascript
// Test registrations access
const { data: regs } = await supabase.from('registrations').select('*');
console.log('Registrations:', regs);
```

## Test 3: Check Current User
```javascript
// Check current user
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user?.email);
```

## Test 4: Test Registration Creation
```javascript
// Test creating a registration (replace with actual event_id)
const { data, error } = await supabase.from('registrations').insert([{
  user_id: user.id,
  event_id: 'your-event-id',
  status: 'confirmed'
}]);
console.log('Test registration:', data, error);
```

---

## 🔍 What to Check:

1. **Admin users table** should show your email
2. **Registrations table** should be accessible
3. **Current user** should show your logged-in email
4. **Test registration** should work without errors

**Run these tests and tell me what the console shows!** 🔧
