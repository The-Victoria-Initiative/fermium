<?php
/*
$target_path = "php_data/";

$target_path = $target_path . basename( $_FILES['uploadedfile']['name']); 

if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
    echo "The file ".  basename( $_FILES['uploadedfile']['name']). 
    " has been uploaded";
} else{
    echo "There was an error uploading the file, please try again!";
}
*/
echo "You have tried to upload the file: ".$_FILES['uploadedfile']['name']."<br />";
echo "This lives in the temporary location: ".$_FILES['uploadedfile']['tmp_name']."<br />";
echo "Upload disabled because of dragons <br />";
?>