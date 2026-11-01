# Spotify Web Player Clone (with Login & MySQL backend)

A Spotify-style music player built with **React**, with a **PHP + MySQL** backend (run on XAMPP) for user login/signup and song data. Made as a college project.

This project started from [oguz3/spotify-web-player](https://github.com/oguz3/spotify-web-player), a front-end-only clone. This version adds:

- Login and Signup pages (`src/Login.js`, `src/Signup.js`)
- A PHP backend for accounts (`htdocs_files/react-login-backend/`)
- A MySQL music database with insert scripts for 10 albums + Liked Songs (`htdocs_files/`)
- A custom Hindi song library (Arijit Singh, Atif Aslam, and others) with thumbnails

> **Security warning:** the login/signup backend is vulnerable to **SQL injection** and stores passwords in **plain text**. It is fine for a local demo but must not be put online as-is. See [Security: SQL injection](#security-sql-injection-in-loginphp).

---

## Tech stack

| Part | Tech |
|---|---|
| Frontend | React 17, React Router 5, Redux, CSS Modules, Axios |
| Backend | PHP (mysqli) on Apache via XAMPP |
| Database | MySQL / MariaDB (via XAMPP / phpMyAdmin) |

## Project structure

```
spotify-web-player/
├── public/
│   ├── music/          # MP3 files (NOT in the repo — add your own, see setup)
│   ├── thumbnail/      # Song and album cover images
│   └── image/
├── src/
│   ├── App.js          # Routes: /login, /signup, /, /search, /library, /playlist/:path
│   ├── Login.js        # Login form → POST to Login.php
│   ├── Signup.js       # Signup form → POST to Signup.php
│   ├── data/index.js   # Playlists + songs shown in the app (hardcoded)
│   ├── component/      # Sidebar, footer player, cards, buttons, top nav
│   ├── pages/          # Home, Search, Library, Playlist
│   ├── actions/, reducers/   # Redux (current song, play/pause)
│   └── hooks/, functions/, constants/, icons/, style/
└── htdocs_files/       # Copy these into XAMPP's htdocs folder
    ├── react-login-backend/
    │   ├── Login.php   # Checks email + password against `users`
    │   └── Signup.php  # Inserts a new row into `users`
    ├── getSongs.php    # Returns any table as JSON: getSongs.php?table=album1
    ├── insert_songs*.php      # One-time scripts that fill the song tables
    └── create table album.txt # SQL for an album table
```

---

## Setup

### 1. Requirements

- [Node.js](https://nodejs.org/) 16 or newer (includes npm)
- [XAMPP](https://www.apachefriends.org/) (Apache + MySQL + PHP)
- Git

### 2. Clone and install

```bash
git clone https://github.com/Shantil-K/spotify-web-player.git
cd spotify-web-player
npm install
```

### 3. Add the music files

The MP3s are **not in this repo** (about 450 MB, and copyrighted). Create the folder and put your MP3s in it:

```
public/music/
```

File names must match the `link` values in `src/data/index.js`, in the form `Artist - Song.mp3`, for example:

```
public/music/Arijit Singh - Tum Hi Ho.mp3
public/music/Ankit Tiwari - Tu Hai Ki Nahi.mp3
```

Thumbnails are already in `public/thumbnail/` and are named after the song (`Tum Hi Ho.jpg`).

### 4. Set up the PHP backend

1. Install and open **XAMPP Control Panel**, then start **Apache** and **MySQL**.
2. Copy the **contents** of `htdocs_files/` into XAMPP's `htdocs` folder:
   - Windows: `C:\xampp\htdocs\`
   - Linux: `/opt/lampp/htdocs/`
   - macOS: `/Applications/XAMPP/htdocs/`

   After copying, this URL should exist: `http://localhost/react-login-backend/Login.php`

   > Don't overwrite XAMPP's own `index.php` unless you mean to. The one in this folder is just XAMPP's default.

### 5. Create the databases

Open **phpMyAdmin** at <http://localhost/phpmyadmin>, go to the **SQL** tab, and run:

```sql
-- Database for login/signup
CREATE DATABASE react_login;
USE react_login;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Database for songs
CREATE DATABASE music_database;
USE music_database;
```

Then create one table per playlist. The insert scripts use these table names: `songs`, `likedsongs`, `album1` … `album10`. They all have the same columns:

```sql
USE music_database;

CREATE TABLE album1 (
    `index` INT PRIMARY KEY,
    songFullName VARCHAR(60),
    songName VARCHAR(60),
    songimg VARCHAR(100),
    songArtist VARCHAR(100),
    link VARCHAR(80),
    trackTime VARCHAR(10)
);
-- Repeat for album2 ... album10, likedsongs, songs
-- (or in phpMyAdmin: select album1 → Operations → "Copy table (structure only)")
```

Fill the tables by opening each insert script once in the browser:

```
http://localhost/insert_songs_album1.php
http://localhost/insert_songs_album2.php
...
http://localhost/insert_songs_likedsongs.php
http://localhost/insert_songs.php
```

Check it worked: <http://localhost/getSongs.php?table=album1> should return JSON.

> The React app currently reads songs from `src/data/index.js`, not from this database. The database and `getSongs.php` are there so the app can be switched to load songs from MySQL later.

If your MySQL `root` user has a password, update `$password = "";` at the top of every PHP file.

### 6. Run the app

```bash
npm start
```

Open:

- <http://localhost:3000/signup>: create an account
- <http://localhost:3000/login>: log in (redirects to the player)
- <http://localhost:3000/>: the player

### Troubleshooting

| Problem | Fix |
|---|---|
| Login says "Network Error" / 404 | `src/Login.js` posts to `.../login.php` (lowercase) but the file is `Login.php`. Windows doesn't care about case; **Linux and macOS do**. Change the URL in `Login.js` to `Login.php`. |
| `Connection failed: Unknown database` | The `react_login` or `music_database` database wasn't created (step 5). |
| `Connection failed: Access denied` | Your MySQL root password isn't empty. Update `$password` in the PHP files. |
| Songs show but don't play | The MP3 is missing from `public/music/` or its name doesn't exactly match `src/data/index.js`. |
| Port 80 / 3306 already in use | Stop the other web server or MySQL, or change the ports in XAMPP config. |

---

## How login works

1. `Signup.js` sends `{ email, password }` as JSON to `Signup.php`.
2. `Signup.php` checks whether the email exists, and if not, inserts it into `users`.
3. `Login.js` sends `{ email, password }` to `Login.php`.
4. `Login.php` runs `SELECT * FROM users WHERE email='…' AND password='…'`. If a row comes back, it returns `success: true` and a `redirect_url`, and the browser goes to the player.

Note: the player pages (`/`, `/search`, …) are **not protected**. Anyone can open them without logging in, because no session or token is saved after login.

---

## Security: SQL injection in Login.php

### The problem

`htdocs_files/react-login-backend/Login.php` builds its SQL query by pasting the user's input straight into the string:

```php
$email = $data->email;
$password = $data->password;

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);
```

Whatever the user types becomes part of the SQL **code**, not just data. A single quote `'` in the input ends the string early, and anything after it runs as SQL.

### Example attack: log in without a password

The attacker types:

- **Email:** `anything' OR '1'='1' -- `
- **Password:** `whatever`

The query becomes:

```sql
SELECT * FROM users WHERE email='anything' OR '1'='1' -- ' AND password='whatever'
```

- `'1'='1'` is always true, so **every user row matches**.
- `-- ` starts a comment, so the password check is ignored.
- `num_rows > 0`, so the login succeeds.

Knowing a real email is just as bad. Entering `victim@gmail.com' -- ` as the email logs in as that user with no password.

### Other places with the same bug

- **`Signup.php`** builds both its `SELECT … WHERE email='$email'` and its `INSERT INTO users … VALUES ('$email', '$password')` the same way, so it can be injected too. It also sends raw MySQL errors back to the browser (`"Error: " . $conn->error`), which helps an attacker understand the database.
- **`getSongs.php`** puts the table name in the query, but it checks it with a regex (`^[a-zA-Z_][a-zA-Z0-9_]*$`) first, so it is **not** injectable. It can still read *any* table in `music_database`, though.
- **`insert_songs_*.php`** already use prepared statements. ✅

### Related problems

1. **Plain-text passwords:** passwords are stored and compared as-is. Anyone who can see the database (or exploit the injection) gets every password.
2. **Database runs as `root` with no password:** the app has full control of every database on the server.
3. **`Access-Control-Allow-Origin: *`:** any website can call these endpoints.
4. **No input checks:** a missing `email` or `password` in the JSON isn't handled.

### The fix: prepared statements + password hashing

**Signup.php** (store a hash, never the password):

```php
$email = trim($data->email ?? '');
$plain = $data->password ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($plain) < 6) {
    echo json_encode(["success" => false, "message" => "Invalid email or password too short."]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
if ($stmt->get_result()->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "User already exists with this email."]);
    exit;
}

$hash = password_hash($plain, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $hash);

echo json_encode($stmt->execute()
    ? ["success" => true,  "message" => "Signup successful"]
    : ["success" => false, "message" => "Signup failed"]);   // don't leak $conn->error
```

**Login.php** (look up by email, then check the hash in PHP):

```php
$email = trim($data->email ?? '');
$plain = $data->password ?? '';

$stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$row = $stmt->get_result()->fetch_assoc();

if ($row && password_verify($plain, $row['password'])) {
    echo json_encode(["success" => true, "message" => "Login successful",
                      "redirect_url" => "http://localhost:3000/"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
}
```

Why this works:

- With `prepare()` + `bind_param()`, the SQL and the user's input are sent to MySQL **separately**. The `?` is always treated as a value, so a `'` or `--` in the input is just text and can't change the query.
- `password_hash()` stores a salted bcrypt hash, so even a leaked database doesn't reveal passwords. `password_verify()` checks a login against it.
- Make sure the `password` column is `VARCHAR(255)` so the hash fits. Accounts created before this change have plain-text passwords and need to sign up again.

Also recommended before putting this online:

- Create a separate MySQL user with only `SELECT`/`INSERT` rights on `react_login`, and give it a strong password.
- Set `Access-Control-Allow-Origin` to your frontend's address (e.g. `http://localhost:3000`) instead of `*`.
- Start a PHP session (or issue a token) on login, and protect the player routes in React.
- Use HTTPS so passwords aren't sent in clear text.

---

## Credits

- Original front-end clone: [oguz3/spotify-web-player](https://github.com/oguz3/spotify-web-player)
- Music and artwork belong to their respective artists and labels. They are used here only for a non-commercial educational project and are not distributed in this repo.
