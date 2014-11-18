<?php
  $sessionPath="/tmp";
  // This should be set in php.ini really, but it doesn't seem to want to pick up my changes
  ini_set('session.save_path',$sessionPath); 
  session_start(); // start up your PHP session! 
?>

<html>
<body>

<?php

  if(isset($_SESSION['views']))
    $_SESSION['views']++;
  else
    $_SESSION['views'] = 1;

  echo "Pageviews = ". $_SESSION['views']."<br />"; //retrieve data
  // print_r($_SESSION);

  //Calculate 60 days in the future
  //seconds * minutes * hours * days + current time
  $inTwoMonths = 60 * 60 * 24 * 60 + time(); 
  setcookie('lastVisit', date("G:i:s - m/d/y"), $inTwoMonths); 

  if(isset($_COOKIE['lastVisit']))
    $visit = $_COOKIE['lastVisit']; 
  else
    echo "You've got some stale cookies!<br />";
  echo "Your last visit was - ". $visit."<br />";

  session_write_close();
?>

</body>
</html>