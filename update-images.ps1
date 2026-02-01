$html = Get-Content 'index.html' -Raw

# Fried Chicken - already done
$html = $html -replace 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec\?w=400&q=80', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80'

# Burgers - update specific burger images
$html = $html -replace '(?<=data-name="Chicken Burger"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80'
$html = $html -replace '(?<=data-name="Cheese Burger"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&q=80'
$html = $html -replace '(?<=data-name="Club Sandwich"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
$html = $html -replace '(?<=data-name="Double Decker Burger"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80'

# Pizza - update specific pizza images
$html = $html -replace '(?<=data-name="Chicken Tikka Pizza"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1628840042765-356cda07504e\?w=400&q=80', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80'
$html = $html -replace '(?<=data-name="Veggie Supreme"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1628840042765-356cda07504e\?w=400&q=80', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96a47?w=400&q=80'
$html = $html -replace '(?<=data-name="BBQ Chicken Pizza"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1628840042765-356cda07504e\?w=400&q=80', 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&q=80'
$html = $html -replace '(?<=data-name="Margherita Pizza"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1628840042765-356cda07504e\?w=400&q=80', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80'

# Drinks - update specific drink images
$html = $html -replace '(?<=data-name="Pepsi"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1581006852262-e4307cf6283a\?w=400&q=80', 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80'
$html = $html -replace '(?<=data-name="Sprite"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1581006852262-e4307cf6283a\?w=400&q=80', 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&q=80'
$html = $html -replace '(?<=data-name="Fresh Orange Juice"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1581006852262-e4307cf6283a\?w=400&q=80', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80'
$html = $html -replace '(?<=data-name="Mango Shake"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1581006852262-e4307cf6283a\?w=400&q=80', 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&q=80'
$html = $html -replace '(?<=data-name="Chocolate Shake"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1581006852262-e4307cf6283a\?w=400&q=80', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'

# Sides - update specific side images
$html = $html -replace '(?<=data-name="French Fries \(Large\)"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1573080496219-bb080dd4f877\?w=400&q=80', 'https://images.unsplash.com/photo-1630431341973-02e1d0f0f8e0?w=400&q=80'
$html = $html -replace '(?<=data-name="Onion Rings"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1573080496219-bb080dd4f877\?w=400&q=80', 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80'
$html = $html -replace '(?<=data-name="Mozzarella Sticks"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1573080496219-bb080dd4f877\?w=400&q=80', 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&q=80'
$html = $html -replace '(?<=data-name="Coleslaw"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1573080496219-bb080dd4f877\?w=400&q=80', 'https://images.unsplash.com/photo-1625938145744-e380515399af?w=400&q=80'

# Desserts - update specific dessert images
$html = $html -replace '(?<=data-name="Ice Cream Sundae"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80'
$html = $html -replace '(?<=data-name="Chocolate Brownie"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&q=80'
$html = $html -replace '(?<=data-name="Apple Pie"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400&q=80'
$html = $html -replace '(?<=data-name="Cookies"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80'
$html = $html -replace '(?<=data-name="Cheesecake Slice"[\s\S]{0,200}src=")https://images.unsplash.com/photo-1568901346375-23c9450c58cd\?w=400&q=80', 'https://images.unsplash.com/photo-1533134242116-8e9b7a5d4e5c?w=400&q=80'

$html | Set-Content 'index.html'
Write-Host "All images updated successfully!"
