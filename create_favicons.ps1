Add-Type -AssemblyName System.Drawing

$sourcePath = "d:\Office\Softwares-Office-Clients\SDP\assets\img\logo.png"
$destDir = "d:\Office\Softwares-Office-Clients\SDP\assets\img"

$image = [System.Drawing.Image]::FromFile($sourcePath)

$sizes = @(
    @{ Name = "favicon-32x32.png"; Size = 32 },
    @{ Name = "favicon-16x16.png"; Size = 16 },
    @{ Name = "apple-touch-icon.png"; Size = 180 },
    @{ Name = "android-chrome-192x192.png"; Size = 192 },
    @{ Name = "android-chrome-512x512.png"; Size = 512 }
)

# Determine square size
$maxDim = [Math]::Max($image.Width, $image.Height)

foreach ($item in $sizes) {
    $targetSize = $item.Size
    $destPath = Join-Path -Path $destDir -ChildPath $item.Name

    $bitmap = New-Object System.Drawing.Bitmap $targetSize, $targetSize
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Set high quality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Fill background with transparent (or whatever the source is)
    $graphics.Clear([System.Drawing.Color]::Transparent)

    # Calculate padding to preserve aspect ratio
    $scale = $targetSize / $maxDim
    $newWidth = $image.Width * $scale
    $newHeight = $image.Height * $scale
    
    # For a little padding, let's scale it to 80% of target
    $padScale = 0.8
    $scaledWidth = $newWidth * $padScale
    $scaledHeight = $newHeight * $padScale
    
    $x = ($targetSize - $scaledWidth) / 2
    $y = ($targetSize - $scaledHeight) / 2

    $graphics.DrawImage($image, $x, $y, $scaledWidth, $scaledHeight)

    $bitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bitmap.Dispose()
    Write-Host "Created $($item.Name)"
}

$image.Dispose()
