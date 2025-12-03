# Adding Lee Marchman's Photo to the App

## Quick Steps

1. **Get the photo** of Lee Marchman (headshot/portrait)
2. **Save it as:** `lee-marchman.jpg`
3. **Place it in:** `lees-barometer-app/public/assets/`
4. **Refresh the app** - photo appears automatically!

---

## Detailed Instructions

### Step 1: Prepare the Photo

**What works best:**
- Headshot or portrait photo
- Clear view of face
- Good lighting
- Professional or casual (both work)
- Square crop preferred

**Photo Specifications:**
- **Format:** JPG or PNG (JPG recommended)
- **Dimensions:** 300x300 pixels or larger (square)
- **File Size:** Under 500KB
- **Aspect Ratio:** 1:1 (square) works best

### Step 2: Crop to Square (Optional but Recommended)

**Using Windows Photos:**
1. Open photo in Photos app
2. Click "Edit" (pencil icon)
3. Click "Crop" (crop icon)
4. Select "Aspect ratio" → "Square"
5. Adjust to frame face nicely
6. Click checkmark to save

**Using Mac Preview:**
1. Open photo in Preview
2. Tools → Adjust Size
3. Make width = height (e.g., 400 x 400)
4. Save

**Using Online Tool:**
1. Go to: https://www.iloveimg.com/crop-image
2. Upload photo
3. Select square crop
4. Download result

### Step 3: Rename & Save

**Rename to exactly:**
```
lee-marchman.jpg
```

**Important:**
- All lowercase
- Hyphens (not spaces or underscores)
- `.jpg` extension (or `.png` if PNG format)

### Step 4: Place in Correct Folder

**Copy the file to:**
```
lees-barometer-app/public/assets/lee-marchman.jpg
```

**Folder structure should look like:**
```
lees-barometer-app/
├── public/
│   └── assets/
│       ├── icon.svg
│       ├── lee-marchman.jpg  ← Your photo here!
│       └── ADD_PHOTO_HERE.txt
```

### Step 5: Test It

**Desktop app:**
```bash
cd lees-barometer-app
npm run electron:dev
```

**Web version (after deploying):**
- Just visit your Vercel URL
- Photo loads automatically

---

## What You'll See

### With Photo:
```
┌─────────────────────┐
│   ╭─────────╮       │
│   │  Photo  │       │  ← Round photo (120px)
│   │ of Lee  │       │    with blue border
│   ╰─────────╯       │
│                     │
│   Lee's Barometer   │
│   Reading App       │
└─────────────────────┘
```

### Without Photo (Placeholder):
```
┌─────────────────────┐
│   ╭─────────╮       │
│   │    ⚓    │       │  ← Anchor icon
│   │Lee March│       │    with dashed border
│   ╰─────────╯       │
│                     │
│   Lee's Barometer   │
│   Reading App       │
└─────────────────────┘
```

---

## Styling Details

**Photo Display:**
- **Size:** 120px diameter (circular)
- **Border:** 4px solid nautical blue (#E6F3FF)
- **Shadow:** Subtle drop shadow
- **Hover Effect:** Scales to 105% and border turns white
- **Position:** Top of sidebar, centered
- **Responsive:** Scales to 60px on mobile

**Fallback:**
- If photo not found, shows placeholder
- Placeholder has anchor icon + "Lee Marchman" text
- App still works perfectly without photo

---

## Troubleshooting

### Photo doesn't appear?

**Check:**
1. ✅ File named exactly: `lee-marchman.jpg`
2. ✅ File is in: `public/assets/` folder
3. ✅ File is JPG or PNG format
4. ✅ Refresh browser (Ctrl+R or Cmd+R)
5. ✅ Clear cache (Ctrl+Shift+R or Cmd+Shift+R)

### Photo looks distorted?

**Solution:** Crop to square before adding
- Square images (1:1 ratio) look best in circles
- 400x400, 500x500, or 600x600 pixels recommended

### Photo is too large (file size)?

**Compress it:**
1. Go to: https://tinyjpg.com/
2. Upload photo
3. Download compressed version
4. Should be under 500KB

### Want to change the photo later?

**Just replace the file:**
1. Delete old `lee-marchman.jpg`
2. Add new `lee-marchman.jpg`
3. Refresh app

---

## Using a Different Photo Name?

If you want to use a different filename:

**Edit:** `src/components/Sidebar.js`

**Change this line:**
```javascript
src="/assets/lee-marchman.jpg"
```

**To:**
```javascript
src="/assets/YOUR-FILENAME.jpg"
```

---

## Deployment Notes

### GitHub:
- Commit the photo with Git:
```bash
git add public/assets/lee-marchman.jpg
git commit -m "Add Lee Marchman photo"
git push
```

### Vercel:
- Photo automatically deploys with the app
- No configuration needed
- Works immediately on next push

### Desktop Build:
- Photo is bundled into installer
- Users get photo automatically
- No manual setup required

---

## Alternative: Using a URL

If photo is already hosted online:

**Edit:** `src/components/Sidebar.js`

**Change:**
```javascript
src="/assets/lee-marchman.jpg"
```

**To:**
```javascript
src="https://example.com/path/to/photo.jpg"
```

**Pros:**
- No file needed in project
- Easy to update remotely

**Cons:**
- Requires internet connection
- Slower loading
- Depends on external hosting

---

## Quick Checklist

- [ ] Got photo of Lee Marchman
- [ ] Cropped to square (optional)
- [ ] Renamed to `lee-marchman.jpg`
- [ ] Placed in `public/assets/` folder
- [ ] Refreshed app
- [ ] Photo appears in sidebar? ✓

---

## Example Photos That Work Well

**Good Examples:**
- Professional headshot
- Clear outdoor photo
- Conference/work photo
- Profile picture style
- Upper body with face visible

**Less Ideal:**
- Group photos (hard to crop)
- Far away shots (face too small)
- Dark/underexposed photos
- Blurry images

---

## Need Help?

**Photo not working?**
1. Check browser console (F12) for errors
2. Verify file path is correct
3. Try a different photo
4. Check file permissions

**Want to remove photo?**
1. Delete `lee-marchman.jpg` from `public/assets/`
2. Refresh app
3. Placeholder appears automatically

---

## Summary

✨ **Super easy to add:**
1. Get photo → Save as `lee-marchman.jpg` → Put in `public/assets/` → Done!

🎨 **Looks professional:**
- Round photo with nautical border
- Hover effects
- Responsive design
- Fallback if photo missing

🚀 **Works everywhere:**
- Desktop app
- Web version
- Mobile responsive

---

**Ready to add the photo!** 📸⚓

