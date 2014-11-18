<html>
<body>
  <h4>Order Form</h4>

  <form action="process.php" method="get"> 
    Name: <input name="name" type="text" /> 
    <select name="item"> 
      <option>Paint</option>
      <option>Brushes</option>
      <option>Rubbers</option>
      <option>Kisses</option>
    </select>
    Quantity: <input name="quantity" type="text" /> 
    Colour: <input name="colour" type="text" />
    <input type="submit" />

  </form>
</body>
</html>