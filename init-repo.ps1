# Run once from this folder:  powershell -ExecutionPolicy Bypass -File .\init-repo.ps1
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

$RemoteUrl = "https://github.com/vladutzeloo/own-jarvis.git"

if (Test-Path .git) {
    Write-Host "This folder is already a git repository." -ForegroundColor Yellow
    Write-Host "Refusing to wipe history. If you really want to start over, delete the .git folder yourself first."
    exit 1
}

git init -b main
git add -A
git commit -m "Initial commit"
git log --oneline -1

$existingRemote = git remote 2>$null
if ($existingRemote -notcontains "origin") {
    git remote add origin $RemoteUrl
} else {
    Write-Host "Remote 'origin' already configured; leaving it alone."
}

git push -u origin main
