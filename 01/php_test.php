<html>
<body>

  Begin the tests.
  <hr>
  <?php
    echo "Hello I am the PHP!";
    echo "<br>";
    $string_test = <<< TEST
    Superlong
    multi-line
    string.
TEST;
    echo $string_test;
    echo "<br>";
  ?>
  <hr>
  Include something
  <?php include("menu.php"); ?>
  <hr>
  <?php
    $destination = "Las Vegas";
    echo "Traveling to $destination<br />";
    switch ($destination){
        case "Las Vegas":
            echo "Bring an extra $500";
            break;
        case "Amsterdam":
            echo "Bring an open mind";
            break;  
        case "Egypt":
            echo "Bring 15 bottles of SPF 50 Sunscreen";
            break;  
        case "Tokyo":
            echo "Bring lots of money";
            break;
        case "Caribbean Islands":
            echo "Bring a swimsuit";
            break;  
        default:
            echo "Bring lots of underwear!";
            break;
    } // end of switch
  ?>
  <hr>
  <?php
    $employeeAges;
    $employeeAges["Lisa"] = "28";
    $employeeAges["Jack"] = "16";
    $employeeAges["Ryan"] = "35";
    $employeeAges["Rachel"] = "46";
    $employeeAges["Grace"] = "34";

    foreach( $employeeAges as $name => $age){
        echo "Name: $name, Age: $age <br />";
    }
  ?>
  <hr>
  <?php
    if(get_magic_quotes_gpc())
      echo "Magic quotes are enabled";
    else
      echo "Magic quotes are disabled";
  ?>
  <hr>
  <?php
    // File manipulation
    $dir = '/tmp';

    // // create new directory with 744 permissions if it does not exist yet
    // // owner will be the user/group the PHP script is run under
    // if ( !file_exists($dir) ) {
    //  mkdir ($dir, 0744);
    // }

    // write
    $ourFileName = $dir."/testFile.txt";
    echo "Creating file: ".$ourFileName."<br />";
    $ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");

    // Write some data
    $stringData = "Bobby Bopper\n";
    fwrite($ourFileHandle, $stringData);
    $stringData = "Tracy Tanner\n";
    fwrite($ourFileHandle, $stringData);

    fclose($ourFileHandle);

    // read
    $fh = fopen($ourFileName, "r") or die("can't read from file");
    // $theData = fread($fh, filesize($ourFileName));
    $theData = fgets($fh);
    fclose($fh);
    echo "Read data : ".$theData."<br />";

    // delete
    unlink($ourFileName);
  ?>
  <hr>
  <?php
    echo date("d/m/y h:i:s")."<br />"; 
    $tomorrow = mktime(0, 0, 0, date("m"), date("d")+1, date("y"));
    echo "Tomorrow is ".date("d/m/y", $tomorrow)."<br />"; 
  ?>
  <hr>
  End the tests.

</body>
</html>