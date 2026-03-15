# 🚀 Deploy Admin Dashboard to Vercel

**Time:** 10-15 minutes

---

## 📋 Steps

### 1️⃣ Go to Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2️⃣ Click "Add New" → "Project"

### 3️⃣ Click "Import Git Repository"

### 4️⃣ Select GitHub Account

### 5️⃣ Search for `tuya-platform` and select it

### 6️⃣ Fill in Configuration

| Field | Value |
|-------|-------|
| Project Name | `tuya-admin-dashboard` |
| Framework | Next.js |
| Root Directory | `apps/admin-dashboard` |
| Build Command | `npm run build` |
| Output Directory | `.next` |

### 7️⃣ Add Environment Variables

Click "Environment Variables" and add:

```
NEXT_PUBLIC_API_URL = https://placeholder.railway.app
NEXT_PUBLIC_SOCKET_URL = wss://placeholder.railway.app
NEXT_PUBLIC_APP_NAME = TUYA Admin
NEXT_PUBLIC_APP_VERSION = 1.0.0
NEXT_PUBLIC_ENVIRONMENT = production
```

### 8️⃣ Click "Deploy"

### 9️⃣ Wait 5-10 minutes

### 🔟 Copy the URL

Example: `https://tuya-admin-dashboard-xxx.vercel.app`

---

## ✅ Done!

You now have:
- ✅ Passenger App: https://tuya-app-sudan.vercel.app/
- ✅ Driver App: https://tuya-driver-app-xxx.vercel.app
- ✅ Admin Dashboard: https://tuya-admin-dashboard-xxx.vercel.app

---

**Next:** Deploy Backend to Railway
