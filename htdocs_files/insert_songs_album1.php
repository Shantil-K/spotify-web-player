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

// Songs data with manual track times
$songs = [
    ["songFullName" => "Arijit Singh - Aaj Phir.mp3", "trackTime" => "4:21"],
    ["songFullName" => "Arijit Singh - Aayat.mp3", "trackTime" => "4:22"],
    ["songFullName" => "Arijit Singh - Laal Ishq.mp3", "trackTime" => "6:27"],
    ["songFullName" => "Arijit Singh - Raabta.mp3", "trackTime" => "4:03"],
    ["songFullName" => "Arijit Singh - Sawan Aaya Hai.mp3", "trackTime" => "4:48"],
    ["songFullName" => "Arijit Singh - Teri Meri Kahaani.mp3", "trackTime" => "5:31"],
    ["songFullName" => "Arijit Singh - Tum Hi Ho.mp3", "trackTime" => "4:21"],
    ["songFullName" => "Arijit Singh - Wo Ladki.mp3", "trackTime" => "4:12"],
    ["songFullName" => "Arijit Singh - Yeh Fitoor Mera.mp3", "trackTime" => "4:43"],
    ["songFullName" => "Arijit Singh - Zaalima.mp3", "trackTime" => "4:59"]
];

// Prepare SQL statement with placeholders
$stmt = $conn->prepare("INSERT INTO album1 (`index`, songFullName, songName, songimg, songArtist, link, trackTime) VALUES (?, ?, ?, ?, ?, ?, ?)");

foreach ($songs as $index => $song) {
    $fullName = $song['songFullName'];
    $trackTime = $song['trackTime'];

    // Extract songArtist and songName from songFullName
    $parts = explode(" - ", $fullName);
    $songArtist = $parts[0];
    $songName = pathinfo($parts[1], PATHINFO_FILENAME);
    $link = "/music/" . $fullName;
    $songimg = "/thumbnail/" . $songName . ".jpg";
    $index_value = $index + 1;

    // Bind parameters and execute the insert statement
    $stmt->bind_param("issssss", $index_value, $fullName, $songName, $songimg, $songArtist, $link, $trackTime);
    $stmt->execute();
}

echo "Data inserted successfully";

// Close the statement and connection
$stmt->close();
$conn->close();
?>
