<html>
<body>
<?php
function myCompanyMotto($name){
    echo "Thank you ".$name."<br/>";
    echo "We deliver quantity, not quality!<br />";
}

$quantity = $_GET['quantity'];
$item = $_GET['item'];
$colour = $_GET['colour'];
$name = $_GET['name'];

echo "You ordered ". $quantity . " of " . $colour . " " . $item . ".<br />";
echo "Thank you for ordering from Zinc Art Supplies!<br />";
echo "But we have no " . $item . ", so instead you can have " . $quantity ." <strong>Jess-bear cuddles!</strong><br/>";

myCompanyMotto($name);

echo "<hr>";
$brush_price = 5; 
$counter = 10;

echo "<table border=\"1\" align=\"center\">";
echo "<tr><th>Quantity</th>";
echo "<th>Price</th></tr>";
while ( $counter <= 100 ) {
    echo "<tr><td>";
    echo $counter;
    echo "</td><td>";
    echo $brush_price * $counter;
    echo "</td></tr>";
    $counter = $counter + 10;
}
echo "</table>";

?>
</body>
</html>