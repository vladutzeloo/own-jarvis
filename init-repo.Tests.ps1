$sut = "$PSScriptRoot/init-repo.ps1"

Describe "init-repo.ps1" {
    BeforeAll {
        $global:RemoteUrl = ""
        # Define mock functions for the actual git commands so they aren't executed
        function git {}
    }

    Context "When .git directory already exists" {
        It "should skip init/commit and output a warning" {
            # Mock Test-Path to return $true for '.git'
            Mock Test-Path { return $true } -ParameterFilter { $Path -eq '.git' }
            Mock Test-Path { return $false } -ParameterFilter { $Path -ne '.git' }

            # Mock Set-Location to avoid changing dirs
            Mock Set-Location {}

            # Mock 'git' to return specific values based on args, or do nothing
            Mock git { return "origin`nupstream" } -ParameterFilter { $args[0] -eq 'remote' -and $args.Count -eq 1 }
            Mock git {} -ParameterFilter { $args[0] -ne 'remote' -or $args.Count -gt 1 }

            # Mock Write-Warning and Write-Output
            Mock Write-Warning {}
            Mock Write-Output {}

            # Execute the script
            Invoke-Command -ScriptBlock ([scriptblock]::Create((Get-Content -Path "$PSScriptRoot/init-repo.ps1" -Raw)))

            # Assertions
            Assert-MockCalled Write-Warning -Times 1 -ParameterFilter {
                $Message -match "Existing git repository detected"
            }
            Assert-MockCalled git -Times 0 -ParameterFilter { $args[0] -eq 'init' }
            Assert-MockCalled git -Times 0 -ParameterFilter { $args[0] -eq 'add' }
            Assert-MockCalled git -Times 0 -ParameterFilter { $args[0] -eq 'commit' }
            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'push' }
        }
    }

    Context "When .git directory does not exist" {
        It "should initialize repo, add files, and commit" {
            # Mock Test-Path to return $false for '.git'
            Mock Test-Path { return $false } -ParameterFilter { $Path -eq '.git' }

            # Mock Set-Location
            Mock Set-Location {}

            # Mock 'git' to return something for `git remote`
            Mock git { return "origin" } -ParameterFilter { $args[0] -eq 'remote' -and $args.Count -eq 1 }
            Mock git {} -ParameterFilter { $args[0] -ne 'remote' -or $args.Count -gt 1 }

            # Mock Write-Output and Write-Warning
            Mock Write-Warning {}
            Mock Write-Output {}

            # Execute the script
            Invoke-Command -ScriptBlock ([scriptblock]::Create((Get-Content -Path "$PSScriptRoot/init-repo.ps1" -Raw)))

            # Assertions
            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'init' -and $args[1] -eq '-b' -and $args[2] -eq 'main' }
            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'add' -and $args[1] -eq '-A' }
            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'commit' -and $args[1] -eq '-m' -and $args[2] -eq 'Initial commit' }
            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'push' }
        }
    }

    Context "When remote 'origin' does not exist" {
        It "should add the remote 'origin'" {
            Mock Test-Path { return $true } -ParameterFilter { $Path -eq '.git' }
            Mock Set-Location {}

            # Mock `git remote` to return nothing (empty string or array)
            Mock git { return "" } -ParameterFilter { $args[0] -eq 'remote' -and $args.Count -eq 1 }
            Mock git {} -ParameterFilter { $args[0] -ne 'remote' -or $args.Count -gt 1 }

            Mock Write-Warning {}
            Mock Write-Output {}

            Invoke-Command -ScriptBlock ([scriptblock]::Create((Get-Content -Path "$PSScriptRoot/init-repo.ps1" -Raw)))

            Assert-MockCalled git -Times 1 -ParameterFilter {
                $args[0] -eq 'remote' -and $args[1] -eq 'add' -and $args[2] -eq 'origin' -and $args[3] -eq 'https://github.com/vladutzeloo/own-jarvis.git'
            }
        }
    }

    Context "When remote 'origin' already exists" {
        It "should not add remote and should output informational message" {
            Mock Test-Path { return $true } -ParameterFilter { $Path -eq '.git' }
            Mock Set-Location {}

            # Mock `git remote` to return origin
            Mock git { return "origin", "somethingelse" } -ParameterFilter { $args[0] -eq 'remote' -and $args.Count -eq 1 }
            Mock git {} -ParameterFilter { $args[0] -ne 'remote' -or $args.Count -gt 1 }

            Mock Write-Warning {}
            Mock Write-Output {}

            Invoke-Command -ScriptBlock ([scriptblock]::Create((Get-Content -Path "$PSScriptRoot/init-repo.ps1" -Raw)))

            Assert-MockCalled git -Times 0 -ParameterFilter {
                $args[0] -eq 'remote' -and $args[1] -eq 'add' -and $args[2] -eq 'origin'
            }
            Assert-MockCalled Write-Output -Times 1 -ParameterFilter {
                $InputObject -match "Remote 'origin' already configured"
            }
        }
    }
}
