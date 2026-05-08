# Run once from this folder:  powershell -ExecutionPolicy Bypass -File .\init-repo.ps1
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

if (Test-Path .git) {
    Write-Host "Removing existing .git folder..."
    Remove-Item -Recurse -Force .git
}

git init -b main
git add -A
git commit -m "Initial commit"
git log --oneline -1

git remote add origin https://github.com/vladutzeloo/own-jarvis.git
git push -u origin main
