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
$sql = "INSERT INTO subscription (name, email) VALUES (?, ?)";
 
if($stmt = $mysqli->prepare($sql)){
    // Bind variables to the prepared statement as parameters
    $stmt->bind_param("ss", $name, $email);
    
    // Set parameters
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    
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