<html>
<body>

<!-- 
  This test was made following the tutorial here:
        http://www.tizag.com/mysqlTutorial/mysqlconnection.php
  With DB creation and permission instructions from here:
        http://www.rackspace.com/knowledge_center/article/installing-mysql-server-on-centos
-->

<h1> MySQL tests </h1>

<?php
  // Connect to MySQL
  mysql_connect("localhost", "testuser", "testpassword") or die(mysql_error());
  echo "Connected to MySQL<br />";

  // Connect to DB
  mysql_select_db("test") or die(mysql_error());
  echo "Connected to Database<br />";

  // Create a DB
  // // Create a MySQL table in the selected database
  // mysql_query("CREATE TABLE example(
  //   id INT NOT NULL AUTO_INCREMENT, 
  //   PRIMARY KEY(id),
  //   name VARCHAR(30), 
  //   age INT)")
  // or die(mysql_error());  

  // echo "Table Created!<br !>";


  // Insert a row of information into the table "example"
  mysql_query("INSERT INTO example 
    (name, age) VALUES('Timmy Mellowman', '23' ) ") 
    or die(mysql_error());  

  mysql_query("INSERT INTO example 
    (name, age) VALUES('Sandy Smith', '21' ) ") 
    or die(mysql_error());  

  mysql_query("INSERT INTO example 
    (name, age) VALUES('Bobby Wallace', '15' ) ") 
    or die(mysql_error());  

  echo "Data Inserted!<br />";

  // Retrieve all the data from the "example" table
  $result = mysql_query("SELECT * FROM example")
    or die(mysql_error());  

  // // store the record of the "example" table into $row
  // $row = mysql_fetch_array( $result );
  // // Print out the contents of the entry 
  // echo "Name: ".$row['name'];
  // echo " Age: ".$row['age']."<br />";

  // // Fetch all entries
  // while($row = mysql_fetch_array($result)){
  //   echo $row['name']. " - ". $row['age'];
  //   echo "<br />";
  // }
  echo "<table border='1'>";
  echo "<tr> <th>Name</th> <th>Age</th> </tr>";
  // keeps getting the next row until there are no more to get
  while($row = mysql_fetch_array( $result )) {
    // Print out the contents of each row into a table
    echo "<tr><td>"; 
    echo $row['name'];
    echo "</td><td>"; 
    echo $row['age'];
    echo "</td></tr>"; 
  } 

?>

</body>
</html>