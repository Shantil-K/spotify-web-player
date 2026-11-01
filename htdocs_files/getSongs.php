<?php
header("Access-Control-Allow-Origin: *");  // For cross-origin access
header("Content-Type: application/json");

// Database connection
$conn = new mysqli("localhost", "root", "", "music_database");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get table name from URL parameter
$table = isset($_GET['table']) ? $_GET['table'] : 'songs';  // Default to 'songs' if not provided

// Validate table name with regex (alphanumeric and underscore, no spaces)
if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $table)) {
    die("Invalid table name.");
}

// Prepare and execute SQL query
$sql = "SELECT * FROM " . $table;
$result = $conn->query($sql);

$songs = array();
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
}

// Return JSON response
echo json_encode($songs);
$conn->close();
?>
