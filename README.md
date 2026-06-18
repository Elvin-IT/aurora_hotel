
# Luxury Hotel Website Design

This is a code bundle for Luxury Hotel Website Design. The original project is available at https://www.figma.com/design/3LyJXv7fiO2qdYcOA6YLOX/Luxury-Hotel-Website-Design.

## Requirements

- Node.js and npm installed.
- This project was verified with Node `v24.15.0` and npm `11.12.1`.

## Running the code

From this project folder, install the dependencies:

```powershell
npm.cmd install
```

Start the local development server:

```powershell
npm.cmd run dev
```

Then open the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

## Windows PowerShell note

If `npm install` fails with a message like `npm.ps1 cannot be loaded because running scripts is disabled on this system`, the project is not broken. PowerShell is blocking the `npm.ps1` shim.

Use `npm.cmd` instead:

```powershell
npm.cmd install
npm.cmd run dev
```

Alternatively, run the same npm commands from Command Prompt instead of PowerShell.

## Production build

To check that the app builds successfully:

```powershell
npm.cmd run build
```

To preview the production build locally:

```powershell
npm.cmd run preview
```

## Deploying to GitHub and Vercel

This project is ready to deploy as a Vite static site.

### 1. Check the project locally

```powershell
npm.cmd install
npm.cmd run build
```

### 2. Create a GitHub repository

1. Go to https://github.com/new.
2. Create an empty repository. Do not add a README, `.gitignore`, or license on GitHub because this project already has local files.
3. Copy the repository URL GitHub gives you.

### 3. Push this folder to GitHub

Run these commands from this project folder. Replace `YOUR_GITHUB_REPO_URL` with your repository URL.

```powershell
git init
git add .
git commit -m "Initial deploy-ready Vite app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 4. Import the project into Vercel

1. Go to https://vercel.com/new.
2. Import the GitHub repository.
3. Use these settings:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

4. Click Deploy.

### Vercel routing note

This app uses React Router with browser URLs such as `/rooms`, `/dining`, and `/contact`. The `vercel.json` file rewrites those URLs back to `index.html`, so refreshing a nested page works after deployment.
