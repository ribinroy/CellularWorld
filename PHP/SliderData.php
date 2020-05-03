<?php
$dir = "/home/cellularworld/public_html/Images/MainPage/Slider/";

// Open a directory, and read its contents
$jsonData = array();
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
    //   echo "filename:" . $file . "<br>";
      $jsonData[] = $file;
    }
    closedir($dh);
  }
}
echo json_encode($jsonData);
?>