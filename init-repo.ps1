# Run once from this folder:  powershell -ExecutionPolicy Bypass -File .\init-repo.ps1
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

$RemoteUrl = "https://github.com/vladutzeloo/own-jarvis.git"

if (Test-Path .git) {
    Write-Host "Existing git repository detected; skipping init/commit to preserve history." -ForegroundColor Yellow
} else {
    git init -b main
    git add -A
    git commit -m "Initial commit"
    git log --oneline -1
}

$existingRemote = git remote 2>$null
if ($existingRemote -notcontains "origin") {
    git remote add origin $RemoteUrl
} else {
    Write-Host "Remote 'origin' already configured; leaving it alone."
}

git push -u origin main
