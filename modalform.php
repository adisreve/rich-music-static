<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$mysqli = new mysqli("localhost", "root", "", "demo");
 
// Check connection
if($mysqli === false){
    die("ERROR: Could not connect. " . $mysqli->connect_error);
}
 
// Prepare an insert statement
$sql = "INSERT INTO modalform (name, email, phone, country, city) VALUES (?, ?, ?, ?, ?)";
 
if($stmt = $mysqli->prepare($sql)){
    // Bind variables to the prepared statement as parameters
    $stmt->bind_param("sssss", $name, $email, $phone, $country, $city);
    
    // Set parameters
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
	$phone = $_REQUEST['phone'];
	$country = $_REQUEST['country'];
	$city = $_REQUEST['city'];
    
    // Attempt to execute the prepared statement
    if($stmt->execute()){
        echo "Records inserted successfully.";
    } else{
        echo "ERROR: Could not execute query: $sql. " . $mysqli->error;
    }
} else{
    echo "ERROR: Could not prepare query: $sql. " . $mysqli->error;
}
 
// Close statement
$stmt->close();
 
// Close connection
$mysqli->close();

?>