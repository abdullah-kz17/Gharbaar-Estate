function Get-Tree {
    param(
        [string]$Path = ".",
        [string]$Indent = ""
    )

    $items = Get-ChildItem -Path $Path | Where-Object { $_.Name -ne 'node_modules' }
    foreach ($item in $items) {
        if ($item.PSIsContainer) {
            Write-Output "$Indent+-- $($item.Name)"
            Get-Tree -Path $item.FullName -Indent ("$Indent    ")
        } else {
            Write-Output "$Indent|-- $($item.Name)"
        }
    }
}

# Change the path below to your project root
Get-Tree -Path "E:\gharbaar" | Out-File -FilePath "E:\gharbaar\structure.txt"

# Optional: Also display it in console
Get-Tree -Path "E:\gharbaar"
