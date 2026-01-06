# Vercel ga Deploy Qilish Qo'llanmasi

## 1. Vercel Account Yaratish

1. [vercel.com](https://vercel.com) ga kiring
2. GitHub account bilan sign up qiling
3. Vercel dashboard ga kiring

## 2. GitHub Repository Yaratish

```bash
# Git repository yaratish (agar yo'q bo'lsa)
cd /home/user/Desktop/Quiz-App
git init
git add .
git commit -m "Initial commit: Quiz App with localStorage"

# GitHub ga push qilish
# 1. GitHub da yangi repository yarating
# 2. Quyidagi commandlarni bajaring:
git remote add origin https://github.com/YOUR_USERNAME/quiz-app.git
git branch -M main
git push -u origin main
```

## 3. Vercel ga Deploy Qilish

### Variant A: Vercel Dashboard orqali (OSON)

1. Vercel dashboard ga kiring
2. **"Add New Project"** tugmasini bosing
3. GitHub repository ni tanlang
4. **Import** qiling
5. Deploy tugmasini bosing

Vercel avtomatik ravishda:
- ✅ `npm run vercel-build` ni bajaradi
- ✅ Client ni build qiladi
- ✅ API routes ni serverless functions ga o'tkazadi
- ✅ Deploy qiladi

### Variant B: Vercel CLI orqali

```bash
# Vercel CLI o'rnatish
npm install -g vercel

# Login qilish
vercel login

# Deploy qilish
cd /home/user/Desktop/Quiz-App
vercel

# Production ga deploy
vercel --prod
```

## 4. Vercel Konfiguratsiya

Loyihada quyidagi fayllar mavjud:

### `vercel.json`
```json
{
  "version": 2,
  "buildCommand": "npm run build:client",
  "outputDirectory": "client/dist",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/index.ts"
    }
  ]
}
```

### `api/index.ts`
Express server Vercel serverless function sifatida ishlaydi.

## 5. Environment Variables (Agar kerak bo'lsa)

Vercel dashboard da:
1. Project Settings → Environment Variables
2. Kerakli variables qo'shing

## 6. Deploy Natijasi

Deploy tugagach:
- ✅ Production URL: `https://quiz-app-xxx.vercel.app`
- ✅ Preview URL: Har bir commit uchun
- ✅ Automatic deployments: Har push da

## 7. Muammolarni Hal Qilish

### Muammo: API routes ishlamayapti
**Yechim:** `vercel.json` da routes to'g'ri sozlanganini tekshiring

### Muammo: Build xatosi
**Yechim:** 
```bash
# Local da test qiling
npm run build:client
```

### Muammo: 404 errors
**Yechim:** SPA routing uchun `vercel.json` da catch-all route mavjud

## 8. Alternative: Netlify ga Deploy

Agar Vercel bilan muammo bo'lsa, Netlify ham yaxshi variant:

```bash
# Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## 9. Alternative: Railway ga Deploy

Railway Express apps uchun juda qulay:

1. [railway.app](https://railway.app) ga kiring
2. GitHub repository ni ulang
3. Deploy qiling

Railway avtomatik ravishda Express serverni detect qiladi va deploy qiladi.

## 10. Tavsiyalar

✅ **Railway** - Express apps uchun eng oson (traditional server)  
✅ **Vercel** - Serverless, tez, bepul tier yaxshi  
✅ **Netlify** - SPA uchun juda yaxshi  
✅ **Render** - Bepul tier, Express uchun qulay  

## Xulosa

Sizning Quiz App uchun **Railway** yoki **Render** ni tavsiya qilaman, chunki:
- Express server traditional tarzda ishlaydi
- Serverless ga o'tkazish shart emas
- Deploy juda oson
- Bepul tier yetarli

Vercel uchun `api/index.ts` fayli tayyor, lekin Railway/Render da hozirgi `server/index.ts` to'g'ridan-to'g'ri ishlaydi.
