# Vercel Deployment Guide

## Important Note

⚠️ **This Electron desktop app can be deployed to Vercel as a web-only version.**

- **Desktop app**: Uses Electron, runs locally (Windows/Mac/Linux)
- **Web version**: React-only, runs in browser via Vercel

The web version will have all features but:
- No desktop window frame
- Runs in browser
- No native OS integration
- Sound effects work (browser audio)

---

## Prerequisites

1. Code pushed to GitHub (see GIT_SETUP_GUIDE.md)
2. Vercel account (free): https://vercel.com/signup

---

## Deployment Steps

### Step 1: Create Vercel Account

1. Go to https://vercel.com/signup
2. Sign up with **GitHub** (recommended)
3. Authorize Vercel to access your GitHub

### Step 2: Import Project

1. Click **"Add New Project"** or **"Import Project"**
2. Find your `lees-barometer-app` repository
3. Click **"Import"**

### Step 3: Configure Project

Vercel will auto-detect settings:

- **Framework Preset**: Create React App ✅ (auto-detected)
- **Root Directory**: `./` (keep default)
- **Build Command**: `npm run build` ✅ (auto-detected)
- **Output Directory**: `build` ✅ (auto-detected)
- **Install Command**: `npm install` ✅ (auto-detected)

**Click "Deploy"** 🚀

### Step 4: Wait for Deployment

- First deployment takes 2-5 minutes
- Vercel will show build logs
- Watch for any errors (check Build Logs tab)

### Step 5: Access Your App

Once deployed:
- Vercel shows: **"Congratulations! Your project has been deployed"**
- Click **"Visit"** to see your app
- URL will be: `https://lees-barometer-app-YOUR_USERNAME.vercel.app`

---

## Custom Domain (Optional)

### Using Vercel Domain:

Your app is live at: `https://your-project-name.vercel.app`

### Using Custom Domain:

1. Go to **Project Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `lees-barometer.com`
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

**Recommended domain registrars:**
- Namecheap: https://www.namecheap.com/
- Google Domains: https://domains.google/
- Cloudflare: https://www.cloudflare.com/

---

## Environment Variables (If Needed)

If you add API keys or secrets later:

1. Go to **Project Settings** → **Environment Variables**
2. Add variables:
   - Key: `REACT_APP_API_KEY`
   - Value: `your-secret-key`
3. Redeploy for changes to take effect

**In code, access with:**
```javascript
const apiKey = process.env.REACT_APP_API_KEY;
```

---

## Automatic Deployments

### How It Works:

Every time you push to GitHub:
1. Vercel detects the push
2. Automatically builds
3. Deploys new version
4. Live in ~2 minutes

### Push Updates:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push

# Vercel automatically deploys!
```

Check deployment status: https://vercel.com/dashboard

---

## Vercel Configuration

The `vercel.json` file configures deployment:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- Correct build process
- Single-page app routing works
- Static assets cached properly

---

## Deployment Branches

### Production (main branch):

- URL: `https://your-app.vercel.app`
- Auto-deploys from `main` branch

### Preview Deployments:

Every pull request gets a preview URL:
- URL: `https://your-app-git-feature-branch.vercel.app`
- Test before merging to main

To create preview:
```bash
git checkout -b feature/new-tool
# Make changes
git push -u origin feature/new-tool
# Create pull request on GitHub
# Vercel creates preview URL automatically
```

---

## Monitoring & Analytics

### Vercel Dashboard:

1. **Overview**: Deployment status, URLs
2. **Deployments**: History of all builds
3. **Analytics** (Pro plan): Traffic, performance
4. **Logs**: Runtime logs and errors

### Check Deployment Status:

- ✅ **Ready**: Deployment successful
- 🔄 **Building**: In progress
- ❌ **Error**: Build failed (check logs)

---

## Build Optimization

### Current Setup:

The app is already optimized:
- React production build (minified)
- Code splitting
- Asset optimization
- Caching headers

### Build Time:

- Initial build: ~3-5 minutes
- Subsequent builds: ~2-3 minutes
- Cached dependencies speed up future builds

---

## Troubleshooting

### Build Failed - Missing Dependencies

**Error:** `Cannot find module 'react'`

**Solution:**
```bash
# Make sure package.json includes all dependencies
git add package.json
git commit -m "Update dependencies"
git push
```

### Build Failed - Out of Memory

**Error:** `JavaScript heap out of memory`

**Solution:** Add to `package.json`:
```json
"scripts": {
  "build": "NODE_OPTIONS=--max_old_space_size=4096 react-scripts build"
}
```

### App Shows Blank Page

**Check:**
1. Browser console for errors (F12)
2. Vercel Function Logs
3. Make sure `homepage` in package.json is: `"./"`

**Solution:** Update `package.json`:
```json
{
  "homepage": "./",
  ...
}
```

### Sound Effects Not Playing

**Note:** Browser security requires user interaction:
- Sounds won't play until user clicks something
- This is normal browser behavior
- Desktop app doesn't have this limitation

### 404 on Refresh

**Solution:** Already handled by `vercel.json` rewrites!
If still issues, check `vercel.json` exists and is valid.

---

## Performance Tips

### 1. Image Optimization

If adding images:
```bash
npm install sharp
# Use WebP format for images
```

### 2. Code Splitting

Already implemented by Create React App:
- Only loads needed components
- Lazy loading for routes

### 3. Caching

Headers in `vercel.json` ensure:
- Static assets cached for 1 year
- HTML not cached (always fresh)

### 4. Compression

Vercel automatically compresses:
- Gzip for text/JS/CSS
- Brotli for modern browsers

---

## Cost & Limits

### Free Tier (Hobby):

- ✅ Unlimited personal projects
- ✅ Automatic HTTPS
- ✅ Automatic deployments
- ✅ 100 GB bandwidth/month
- ✅ 100 hours build time/month
- ✅ Custom domains

**This project easily fits in free tier!**

### Pro Tier ($20/month):

- More bandwidth
- Analytics
- Team collaboration
- Priority support

---

## Security

### HTTPS:

- ✅ Automatic SSL certificate
- ✅ Forced HTTPS redirect
- ✅ No configuration needed

### Headers:

Vercel automatically adds:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`

### Environment Secrets:

- Never commit secrets to Git
- Use Vercel environment variables
- Prefix with `REACT_APP_` for client-side access

---

## Comparison: Desktop vs Web

| Feature | Desktop (Electron) | Web (Vercel) |
|---------|-------------------|--------------|
| Installation | Download installer | Open URL |
| Updates | Manual download | Automatic |
| Offline use | ✅ Yes | ❌ No (need internet) |
| Sound effects | ✅ Instant | ⚠️ After user click |
| Native feel | ✅ Yes | ❌ Browser UI |
| File system | ✅ Full access | ⚠️ Limited (downloads) |
| CSV export | ✅ Save anywhere | ✅ Downloads folder |
| Cross-platform | ✅ Win/Mac/Linux | ✅ Any browser |
| Distribution | Manual/store | Just share URL |

---

## Vercel CLI (Optional)

### Install Vercel CLI:

```bash
npm install -g vercel
```

### Deploy from Terminal:

```bash
cd lees-barometer-app
vercel

# Or for production:
vercel --prod
```

### Useful Commands:

```bash
vercel dev          # Run locally with Vercel
vercel logs         # View deployment logs
vercel domains      # Manage domains
vercel env          # Manage environment variables
vercel list         # List all deployments
```

---

## Share Your App

### After Deployment:

**Desktop Version:**
- Share GitHub release: `https://github.com/YOUR_USERNAME/lees-barometer-app/releases`
- Users download installer

**Web Version:**
- Share Vercel URL: `https://your-app.vercel.app`
- Works instantly in any browser

**QR Code** (for web version):
1. Go to https://www.qr-code-generator.com/
2. Enter your Vercel URL
3. Download QR code
4. Print or share

---

## Next Steps

1. ✅ Deploy to Vercel (follow steps above)
2. ✅ Test web version thoroughly
3. ✅ Share URL with users
4. ✅ (Optional) Set up custom domain
5. ✅ Monitor analytics and usage

---

## Both Versions Strategy

**Recommended approach:**

1. **Desktop App** (Electron):
   - For users who want offline capability
   - Professional field use
   - Full features

2. **Web App** (Vercel):
   - Quick access, no install
   - Demonstrations
   - Mobile devices (responsive)

**Tell users:**
- "Try it online: https://your-app.vercel.app"
- "Download desktop version: https://github.com/username/repo/releases"

---

**Your app is now live on the web! 🚀⚓**

**Live URL:** Check your Vercel dashboard  
**Updates:** Automatic on every Git push  
**Access:** Anyone with the URL can use it

