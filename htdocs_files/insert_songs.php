<?php
// Database connection
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "music_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Songs data
$songs = [
    "Arijit Singh - Aaj Phir.mp3",
    "Arijit Singh - Aayat.mp3",
    "Arijit Singh - Laal Ishq.mp3",
    "Arijit Singh - Raabta.mp3",
    "Arijit Singh - Sawan Aaya Hai.mp3",
    "Arijit Singh - Teri Meri Kahaani.mp3",
    "Arijit Singh - Tum Hi Ho.mp3",
    "Arijit Singh - Wo Ladki.mp3",
    "Arijit Singh - Yeh Fitoor Mera.mp3",
    "Arijit Singh - Zaalima.mp3"
];

// Prepare SQL statement with placeholders
$stmt = $conn->prepare("INSERT INTO songs (`index`, songFullName, songName, songimg, songArtist, link, trackTime) VALUES (?, ?, ?, ?, ?, ?, ?)");

$songimg = "https://i.scdn.co/image/ab67616d0000b2731d26b3e7ea803059a6e4ffea";
$trackTime = "0:30"; // Default track time for simplicity

foreach ($songs as $index => $fullName) {
    // Extract songArtist and songName from songFullName
    $parts = explode(" - ", $fullName);
    $songArtist = $parts[0];
    $songName = pathinfo($parts[1], PATHINFO_FILENAME);
    $link = "/music/" . $fullName;

    // Bind parameters and execute the insert statement
$index_value = $index + 1; // Calculate the index value in a separate variable

// Bind parameters with the calculated variable
$stmt->bind_param("issssss", $index_value, $fullName, $songName, $songimg, $songArtist, $link, $trackTime);
    $stmt->execute();
}

echo "Data inserted successfully";

// Close the statement and connection
$stmt->close();
$conn->close();
?>
