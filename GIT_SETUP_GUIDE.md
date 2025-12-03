# Git & GitHub Setup Guide

## Initial Git Setup

### Step 1: Initialize Git Repository

Open terminal in the `lees-barometer-app` folder:

```bash
git init
git add .
git commit -m "Initial commit: Lee's Barometer & Calibration Helper v1.0"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `lees-barometer-app` (or your preferred name)
3. Description: "Nautical-themed desktop app for barometric pressure conversion and instrument calibration"
4. Choose **Public** or **Private**
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 3: Link Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/lees-barometer-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Verify Upload

Go to your GitHub repository URL and you should see all files!

---

## Future Updates

When you make changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

---

## What Gets Pushed to Git

✅ **Included:**
- All source code (`src/` folder)
- Configuration files (`package.json`, etc.)
- Documentation (all `.md` files)
- Scripts (`install.bat`, `run.sh`, etc.)
- Assets (icons, SVG files)
- `.gitignore` (tells Git what to ignore)

❌ **Excluded** (by `.gitignore`):
- `node_modules/` - Dependencies (too large, can be reinstalled)
- `build/` - Production builds (generated)
- `dist/` - Electron installers (generated)
- `.vercel/` - Vercel deployment files
- IDE settings (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`, `Thumbs.db`)

---

## Cloning on Another Computer

To download and run on another machine:

```bash
git clone https://github.com/YOUR_USERNAME/lees-barometer-app.git
cd lees-barometer-app
npm install
npm run electron:dev
```

---

## Common Git Commands

```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard HEAD
```

---

## Branch Strategy (Optional)

**For solo development:**
- Work directly on `main` branch

**For team development:**
- `main` - Production-ready code
- `develop` - Active development
- `feature/*` - New features
- `bugfix/*` - Bug fixes

```bash
# Create feature branch
git checkout -b feature/new-calculator
# Make changes, commit
git commit -m "Add new calculator feature"
# Merge back to main
git checkout main
git merge feature/new-calculator
git push
```

---

## GitHub Repository Settings

### Recommended Settings:

1. **About Section** (right side):
   - Description: "Nautical-themed scientific calibration tool"
   - Website: Your Vercel URL (after deployment)
   - Topics: `electron`, `react`, `nautical`, `calibration`, `scientific`

2. **README Display**:
   - Your README.md will automatically display

3. **Releases** (optional):
   - Create releases for each version
   - Attach built installers (.exe, .dmg, .AppImage)

### Creating a Release:

```bash
# Tag the version
git tag -a v1.0.0 -m "Version 1.0 - Initial Release"
git push origin v1.0.0
```

Then on GitHub:
1. Go to **Releases** → **Draft a new release**
2. Choose tag: `v1.0.0`
3. Release title: "Ship Log v1.0"
4. Description: List features
5. Attach built installers
6. Click **Publish release**

---

## `.gitignore` Explanation

The `.gitignore` file tells Git which files to ignore:

```gitignore
node_modules/       # Don't commit dependencies (huge!)
build/              # Don't commit compiled code
dist/               # Don't commit installers
*.exe               # No Windows executables
.env                # Don't commit secrets/keys
.vercel             # Don't commit Vercel config
```

---

## Troubleshooting

### "fatal: remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/lees-barometer-app.git
```

### "error: failed to push some refs"

```bash
git pull --rebase origin main
git push
```

### Accidentally committed `node_modules/`

```bash
git rm -r --cached node_modules/
git commit -m "Remove node_modules"
git push
```

### Want to change last commit message

```bash
git commit --amend -m "New commit message"
git push --force  # Only if not pushed yet
```

---

## Git Best Practices

1. **Commit often** - Small, focused commits
2. **Good commit messages** - Describe what and why
3. **Pull before push** - Avoid conflicts
4. **Don't commit secrets** - API keys, passwords
5. **Use branches** - For experimental features
6. **Review changes** - Use `git diff` before commit

### Good Commit Message Examples:

```bash
git commit -m "Add temperature unit conversion feature"
git commit -m "Fix pH calibration slope calculation"
git commit -m "Update documentation for DO tool"
git commit -m "Refactor sound effects utility"
```

---

## GitHub Desktop (Alternative)

If you prefer a GUI:

1. Download **GitHub Desktop**: https://desktop.github.com/
2. **Add** → **Add Existing Repository**
3. Choose `lees-barometer-app` folder
4. Click **Publish repository**
5. Use GUI for commits, pushes, pulls

---

## Collaboration

### Adding Collaborators:

1. Go to repository **Settings** → **Collaborators**
2. Click **Add people**
3. Enter their GitHub username
4. They can now push to your repo

### Pull Requests (for contributions):

1. Contributor forks your repo
2. Makes changes in their fork
3. Creates pull request
4. You review and merge

---

## Repository Backup

GitHub automatically backs up your code, but you can also:

```bash
# Create a backup
git clone https://github.com/YOUR_USERNAME/lees-barometer-app.git backup/

# Or use GitHub's download ZIP
# Repository page → Code → Download ZIP
```

---

## Next Steps

1. ✅ Complete steps 1-4 above
2. ✅ Verify files are on GitHub
3. ✅ Proceed to VERCEL_DEPLOYMENT_GUIDE.md for web deployment
4. ✅ (Optional) Create releases for built installers

---

**Your code is now safe and version-controlled! ⚓**

