$ErrorActionPreference = "Stop"

try {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
    $batPath = Join-Path $scriptDir "auto-launch.bat"

    if (-Not (Test-Path $batPath)) {
        Write-Warning "Could not find auto-launch.bat at $batPath"
        exit 1
    }

    $startupFolder = [System.Environment]::GetFolderPath('Startup')
    $shortcutPath = Join-Path $startupFolder "Jarvis-AutoLaunch.lnk"

    $wshShell = New-Object -ComObject WScript.Shell
    $shortcut = $wshShell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $batPath
    $shortcut.WorkingDirectory = $scriptDir
    $shortcut.Description = "Auto-launch Jarvis on startup"
    $shortcut.Save()

    Write-Output "Successfully created Jarvis auto-launch shortcut in the Startup folder."
    Write-Output "Shortcut path: $shortcutPath"
    Write-Output "Target path: $batPath"

} catch {
    Write-Warning "Failed to setup startup shortcut. Error details: $_"
    exit 1
}
