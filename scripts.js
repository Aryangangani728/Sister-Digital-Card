// Function to handle page transitions
function nextPage(currentPageId, nextPageId) {
    const currentPage = document.getElementById(currentPageId);
    const nextPage = document.getElementById(nextPageId);

    // 1. Hide the current page
    currentPage.classList.remove('active');
    currentPage.classList.add('hidden');

    // 2. Show the next page
    nextPage.classList.remove('hidden');
    nextPage.classList.add('active');
}

// --- Dynamic Song Changing Logic ---

const songs = {
    palpal: {
        title: "Pal Pal Har Pal",
        artist: "Shreya Ghoshal & Sonu Nigam"
    },
    tuhi: {
        title: "Tu Hi Meri Shab Hai",
        artist: "K.K."
    },
    yaadpiya: {
        title: "Yaad Piya Ki Aane Lagi",
        artist: "Neha Kakkar"
    },
    dilbaro: {
        title: "Dilbaro",
        artist: "Harshdeep Kaur & Vibha Saraf"
    }
};

function changeSong() {
    const selector = document.getElementById('song-selector');
    const selectedSongKey = selector.value;
    const selectedSong = songs[selectedSongKey];

    document.getElementById('current-song-title').textContent = selectedSong.title;
    document.getElementById('current-song-artist').textContent = selectedSong.artist;
}


// --- Game Logic for Chocolate Hunt ---
document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.hunt-tile');
    const successMessage = document.getElementById('success-message');
    const gameNextButton = document.getElementById('game-next-button');
    
    // --- Setup the Game ---
    const tilesContent = Array(9).fill('empty');

    // Randomly place 3 chocolates.
    let chocolateCount = 0;
    while (chocolateCount < 3) {
        const randomIndex = Math.floor(Math.random() * 9);
        if (tilesContent[randomIndex] === 'empty') {
            tilesContent[randomIndex] = 'chocolate';
            chocolateCount++;
        }
    }

    let foundChocolates = 0;
    
    // --- Event Listener for Tiles ---
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            
            if (this.dataset.clicked === 'true') {
                return; 
            }

            this.dataset.clicked = 'true'; 
            this.style.pointerEvents = 'none'; 

            if (tilesContent[index] === 'chocolate') {
                // CHOCOLATE FOUND!
                this.textContent = '🍫';
                this.classList.add('found-chocolate');
                foundChocolates++;

                if (foundChocolates === 3) {
                    successMessage.style.display = 'block'; 
                    gameNextButton.disabled = false;        
                    
                    // Reveal remaining empty tiles
                    tiles.forEach((t) => {
                        if (t.dataset.clicked !== 'true') {
                            t.textContent = '✖️'; 
                            t.classList.add('empty-tile');
                            t.style.pointerEvents = 'none';
                        }
                    });
                }

            } else {
                // EMPTY TILE
                this.textContent = '✖️';
                this.classList.add('empty-tile');
            }
        });
    });
});