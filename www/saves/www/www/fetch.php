<?php

define("SERVER_NAME", "localhost");
define("USERNAME","root");
define("PASSWD", "1234");
define("DB", "PTUTO");


$conn = mysqli_connect(SERVER_NAME, USERNAME, PASSWD, DB);

if (!$conn)
    die("mysql connection error:". mysqli_connect_error);


$dbconnect = mysqli_select_db($conn, 'PTUTO');
$username = $_POST['username'];
$result = mysqli_query($conn, "SELECT * From admin WHERE username = '$username' " );

while ($row = mysqli_fetch_array($result)){
    if ($row["password"] == $_POST["password"])
        echo "success";
    else {
        echo "fail";
    }
    
};
    
?>