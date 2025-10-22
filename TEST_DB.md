# Database Test

## Check if registrations exist in Supabase:

1. Go to: https://supabase.com/dashboard
2. Open your project: `dbbqkvncvpghhqaroxav`
3. Go to **Table Editor**
4. Click on **registrations** table
5. Check if there are any rows

## If NO rows:
- Registrations are not being saved to database
- They might be in localStorage only

## If YES rows:
- Check the column names
- Make sure `user_id`, `event_id`, `status`, `payment_status` exist

## Console Test:

Open browser console on `/admin` page and run:

```javascript
const { data, error } = await supabase.from('registrations').select('*');
console.log('Registrations:', data);
console.log('Error:', error);
```

This will show you exactly what's in the database!
