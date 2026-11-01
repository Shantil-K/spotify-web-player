import React from 'react';
import TitleM from '../text/title-m';

import styles from "./searchpage-card.module.css";

// Array of possible href values
const possibleHrefs = [
    "/playlist/turkcerock",
    "/playlist/dailymix1",
    "/playlist/calmayadoyamadiklarin",
    "/playlist/dailymix2",
    "/playlist/dailymix3",
    "/playlist/haftalikkesif"
];

// Function to randomly select an href from the array
function getRandomHref() {
    const randomIndex = Math.floor(Math.random() * possibleHrefs.length);
    return possibleHrefs[randomIndex];
}

function SearchPageCard({ cardData }) {
    const randomHref = getRandomHref(); // Generate random href

    return (
        <div key={cardData.title} className={styles.SearchCardBox} style={{ backgroundColor: cardData.bgcolor }}>
            <a href={randomHref}> 
                <div className={styles.SearchCard}>
                    <img src={cardData.imgurl} alt={`${cardData.title}`} />
                    <TitleM>{cardData.title}</TitleM>
                </div>
            </a>
        </div>
    );
}

export default SearchPageCard;
