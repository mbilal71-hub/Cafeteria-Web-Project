$html = Get-Content 'index.html' -Raw

# Fried Chicken - Cooked Bucket and unique pieces
$html = $html -replace 'photo-1587593810167-a84920ea0781', 'photo-1626645738196-c2a7c87a8f58' # Bucket
$html = $html -replace 'photo-1626082927389-6cd097cdc6ec', 'photo-1626082927389-6cd097cdc6ec' # Standard piece (kept original ID for one)

# Pizza - Fixed Veggie Supreme
$html = $html -replace 'photo-1571407970349-bc81e7e96a47', 'photo-1541745537411-b8046dc6d66c'

# Sides - Fixed French Fries and Coleslaw
$html = $html -replace 'photo-1573080496219-bb080dd4f877', 'photo-1630384060421-cb20d0e0649d'
$html = $html -replace 'photo-1625938145744-e380515399af', 'photo-1550304084-ad483eee4eee'

# Desserts - Fixed Cheesecake and Cookies
$html = $html -replace 'photo-1533134242116-8e9b7a5d4e5c', 'photo-1524351199679-46cddfdb52c0'

$html | Set-Content 'index.html'

