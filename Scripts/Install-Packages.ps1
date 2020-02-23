$RootDirectory = Resolve-Path "$PSScriptRoot\..\";

Push-Location $RootDirectory;

Write-Host "Installing npm dependencies";
npm install;

Pop-Location;