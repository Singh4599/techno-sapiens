# Fix Git Repository Connection

## Problem:
Git is showing "Repository not found" error because it's trying to push to the old deleted repo.

## Solution:

### Step 1: Check current remote
```bash
cd techno-sapiens
git remote -v
```

### Step 2: Remove old remote (if exists)
```bash
git remote remove origin
```

### Step 3: Add correct remote
```bash
git remote add origin https://github.com/Singh4599/techno-sapiens.git
```

### Step 4: Verify
```bash
git remote -v
```

Should show:
```
origin  https://github.com/Singh4599/techno-sapiens.git (fetch)
origin  https://github.com/Singh4599/techno-sapiens.git (push)
```

### Step 5: Push all changes
```bash
git add .
git commit -m "Fix admin RLS and registrations display"
git push -u origin main
```

If it asks for force push:
```bash
git push -u origin main --force
```

---

## Quick Commands (Copy-Paste):

```bash
cd techno-sapiens
git remote remove origin
git remote add origin https://github.com/Singh4599/techno-sapiens.git
git add .
git commit -m "Fix admin RLS and registrations display"
git push -u origin main
```

Done! ✅
