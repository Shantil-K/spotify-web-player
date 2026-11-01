import * as Icons from '../icons';
import styles from './search-box.module.css';
import React, { useState } from 'react';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  // Static list of music files from the /music directory
  const musicFiles = [
    { name: 'Tu Hai Ki Nahi', path: '/music/Ankit Tiwari - Tu Hai Ki Nahi.mp3' },
    { name: 'Aaj Phir', path: '/music/Arijit Singh - Aaj Phir.mp3' },
    { name: 'Aayat', path: '/music/Arijit Singh - Aayat.mp3' },
    { name: 'Laal Ishq', path: '/music/Arijit Singh - Laal Ishq.mp3' },
    { name: 'Raabta', path: '/music/Arijit Singh - Raabta.mp3' },
    { name: 'Sawan Aaya Hai', path: '/music/Arijit Singh - Sawan Aaya Hai.mp3' },
    { name: 'Teri Meri Kahani', path: '/music/Arijit Singh - Teri Meri Kahani.mp3' },
    { name: 'Tum Hi Ho', path: '/music/Arijit Singh - Tum Hi Ho.mp3' },
    { name: 'Wo Ladki', path: '/music/Arijit Singh - Wo Ladki.mp3' },
    { name: 'Yeh Fitoor Mera', path: '/music/Arijit Singh - Yeh Fitoor Mera.mp3' },
    { name: 'Zaalima', path: '/music/Arijit Singh - Zaalima.mp3' },
    { name: 'Deena Jeena', path: '/music/Atif Aslam - Deena Jeena.mp3' },
    { name: 'Jeene Laga Hoon', path: '/music/Atif Aslam - Jeene Laga Hoon.mp3' },
    { name: 'Woh Lamhe Woh Baatein', path: '/music/Atif Aslam - Woh Lamhe Woh Baatein (From Zeher).mp3' },
    { name: 'Kaise Mujhe', path: '/music/Benny Dayal - Kaise Mujhe.mp3' },
    { name: 'Uff', path: '/music/Harshdeep Kaur - Uff.mp3' },
    { name: 'Ek Din Teri Raahon Mein', path: '/music/Javed Ali - Ek Din Teri Raahon Mein.mp3' },
    { name: 'Guzarish', path: '/music/Javed Ali - Guzarish.mp3' },
    { name: 'Khamoshiyan', path: '/music/Jeet Gannguli - Khamoshiyan (From Khamoshiyan).mp3' },
    { name: 'Tu Jo Mila', path: '/music/Atif Aslam - Tu Jo Mila.mp3' },
    { name: 'Dil Ibaadat', path: '/music/K.K. - Dil Ibaadat.mp3' },
    { name: 'Bheegi Bheegi Raaton Mein', path: '/music/Lata Mangeshkar - Bheegi Bheegi Raaton Mein (From Ajnabee).mp3' },
    { name: 'Phir Mohabbat', path: '/music/Mohd Irfan - Phir Mohabbat.mp3' },
    { name: 'Pee Loon', path: '/music/Mohit Chauhan - Pee Loon.mp3' },
    { name: 'Tum Se Hi', path: '/music/Mohit Chauhan - Tum Se Hi.mp3' },
    { name: 'Hawayein', path: '/music/Pritam - Hawayein (From Jab Harry Met Sejal).mp3' },
    { name: 'Janam Janam', path: '/music/Pritam - Janam Janam.mp3' },
    { name: 'Kalank (Title Track)', path: '/music/Pritam - Kalank (Title Track).mp3' },
    { name: 'Tu Hi Haqeeqat', path: '/music/Pritam - Tu Hi Haqeeqat.mp3' },
    { name: 'Tu Hi Meri Shab Hai', path: '/music/Pritam - Tu Hi Meri Shab Hai (From Gangster).mp3' },
    { name: 'Zara Sa', path: '/music/Pritam - Zara Sa.mp3' },
    { name: 'Be Intehaan', path: '/music/Pritam Chakraborty - Be Intehaan.mp3' },
    { name: 'Apna Bana Le', path: '/music/Sachin-Jigar - Apna Bana Le.mp3' },
    { name: 'O Humdum Suniyo Re', path: '/music/Shaan - O Humdum Suniyo Re.mp3' },
    { name: 'Lahu Munh Lag Gaya', path: '/music/Shail Hada - Lahu Munh Lag Gaya.mp3' },
    { name: 'Khuda Jaane', path: '/music/Shilpa Rao - Khuda Jaane.mp3' },
    { name: 'Saans', path: '/music/Shreya Ghoshal - Saans.mp3' },
    { name: 'Bin Tere', path: '/music/Vishal-Shekhar - Bin Tere.mp3' },
    { name: 'Ishq Wala Love', path: '/music/Vishal-Shekhar - Ishq Wala Love.mp3' },
  ];

  // Handle input change
  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setQuery(userInput);

    // Filter songs based on the user input
    if (userInput) {
      const filtered = musicFiles.filter((song) =>
        song.name.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs([]); // Clear the list when input is empty
    }
  };

  return (
    <div className={styles.SeachBox}>
      <Icons.Search />
      <input
        placeholder="Search for Artists, Songs or Podcasts"
        maxLength="80"
        value={query}
        onChange={handleInputChange}
      />

      {/* Display filtered songs as a dropdown list */}
      {filteredSongs.length > 0 && (
        <div className={styles.SongList}>
          {filteredSongs.map((song, index) => (
            <a
              key={index}
              href={song.path}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.SongItem}
            >
              {song.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
