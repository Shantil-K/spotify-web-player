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
    ["songFullName" => "Arijit Singh - Raabta.mp3", "trackTime" => "4:03"],
    ["songFullName" => "Vishal   Shekhar - Bin Tere.mp3", "trackTime" => "5:30"],
    ["songFullName" => "Mohit Chauhan - Tum Se Hi.mp3", "trackTime" => "5:21"],
    ["songFullName" => "Harshdeep Kaur - Uff.mp3", "trackTime" => "4:32"],
    ["songFullName" => "Vishal   Shekhar - Ishq Wala Love.mp3", "trackTime" => "4:18"]
];

// Prepare SQL statement with placeholders
$stmt = $conn->prepare("INSERT INTO likedsongs (`index`, songFullName, songName, songimg, songArtist, link, trackTime) VALUES (?, ?, ?, ?, ?, ?, ?)");

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
