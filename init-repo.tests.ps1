BeforeAll {
    $script:ScriptPath = Join-Path $PSScriptRoot "init-repo.ps1"
}

Describe "init-repo.ps1" {
    Context "When .git directory already exists" {
        BeforeEach {
            Mock Set-Location {}
            Mock Test-Path { return $true }
            Mock Write-Warning {}
            Mock Write-Output {}
            Mock git { return "origin" } -ParameterFilter { $args[0] -eq 'remote' }
            Mock git {} -ParameterFilter { $args[0] -eq 'push' }
        }

        It "should skip git init and warn the user" {
            . $script:ScriptPath

            Assert-MockCalled Test-Path -Times 1 -ParameterFilter { $Path -eq ".git" }
            Assert-MockCalled Write-Warning -Times 1 -ParameterFilter { $Message -match "Existing git repository detected" }
            Assert-MockCalled git -Times 0 -ParameterFilter { $args[0] -eq 'init' }
        }
    }

    Context "When .git directory does not exist" {
        BeforeEach {
            Mock Set-Location {}
            Mock Test-Path { return $false }
            Mock Write-Warning {}
            Mock Write-Output {}
            Mock git { return "origin" } -ParameterFilter { $args[0] -eq 'remote' }
            Mock git {} -ParameterFilter { $args[0] -in 'init', 'add', 'commit', 'log', 'push' }
        }

        It "should initialize the repository and make the first commit" {
            . $script:ScriptPath

            Assert-MockCalled Test-Path -Times 1 -ParameterFilter { $Path -eq ".git" }
            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'init' -and $args[1] -eq '-b' -and $args[2] -eq 'main' }
            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'add' -and $args[1] -eq '-A' }
            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'commit' -and $args[1] -eq '-m' -and $args[2] -eq 'Initial commit' }
        }
    }

    Context "When 'origin' remote is not configured" {
        BeforeEach {
            Mock Set-Location {}
            Mock Test-Path { return $true }
            Mock Write-Warning {}
            Mock Write-Output {}
            # Return nothing so 'origin' is not in the list
            Mock git { return "" } -ParameterFilter { $args[0] -eq 'remote' }
            Mock git {} -ParameterFilter { $args[0] -eq 'remote' -and $args[1] -eq 'add' }
            Mock git {} -ParameterFilter { $args[0] -eq 'push' }
        }

        It "should add the origin remote" {
            . $script:ScriptPath

            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'remote' -and $args[1] -eq 'add' -and $args[2] -eq 'origin' -and $args[3] -eq 'https://github.com/vladutzeloo/own-jarvis.git' }
        }
    }

    Context "When 'origin' remote is already configured" {
        BeforeEach {
            Mock Set-Location {}
            Mock Test-Path { return $true }
            Mock Write-Warning {}
            Mock Write-Output {}
            # Return origin
            Mock git { return "origin" } -ParameterFilter { $args[0] -eq 'remote' }
            Mock git {} -ParameterFilter { $args[0] -eq 'push' }
        }

        It "should output that the remote is already configured and leave it alone" {
            . $script:ScriptPath

            Assert-MockCalled git -Times 0 -ParameterFilter { $args[0] -eq 'remote' -and $args[1] -eq 'add' }
            Assert-MockCalled Write-Output -Times 1 -ParameterFilter { $InputObject -match "already configured" }
        }
    }

    Context "When script completes" {
         BeforeEach {
            Mock Set-Location {}
            Mock Test-Path { return $true }
            Mock Write-Warning {}
            Mock Write-Output {}
            Mock git { return "origin" } -ParameterFilter { $args[0] -eq 'remote' }
            Mock git {} -ParameterFilter { $args[0] -eq 'push' }
        }

        It "should push to main" {
            . $script:ScriptPath

            Assert-MockCalled git -Times 1 -ParameterFilter { $args[0] -eq 'push' -and $args[1] -eq '-u' -and $args[2] -eq 'origin' -and $args[3] -eq 'main' }
        }
    }
}
