# Quick Fix - Add Second Variable

## You're Almost There! 

You added the first variable ✅ but need to add the **second one**.

---

## Step 1: Add Second Variable

Go back to: https://app.netlify.com/sites/technosapiensdhruv/configuration/env

Click **"Add a variable"** again

### Add This:

```
Key: VITE_SUPABASE_ANON_KEY

Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiYnFrdm5jdnBnaGhxYXJveGF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NzcyMDUsImV4cCI6MjA3NjM1MzIwNX0.92dk5d261ieCCI6PPxyrtcab_ZZR-KCOX52kD40xVnQ
```

Click **"Create variable"**

---

## Step 2: Redeploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** 
3. Select **"Clear cache and deploy site"**
4. Wait 1-2 minutes

✅ **Done!**

---

## Both Variables Should Be:

1. ✅ `VITE_SUPABASE_URL` = `https://dbbqkvncvpghhqaroxav.supabase.co`
2. ⚠️ `VITE_SUPABASE_ANON_KEY` = `eyJhbGci...` (the long key)

---

**After adding both and redeploying, your site will work!** 🚀
