document.getElementById("btn").addEventListener("click", function() {
    document.getElementById("pianoimg").scrollIntoView({
        behavior: "smooth" 
    });
});
document.getElementById("btn").addEventListener("click", function() {
  
    document.getElementById("pianoimg").scrollIntoView({
        behavior: "smooth" 
    });

    setTimeout(function() {
        document.getElementById("pno").style.opacity = 1; 
        document.getElementById("pno").style.transition = "opacity 1s"; 
    }, 600); 
});


const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'sundari final1mp3.mp3',
        displayName: 'Sundari',
        cover: 'sundariimg.jpeg',
        artist: 'Luke Manohar',
    },
    {
        path: 'Perfectmp3.mp3',
        displayName: 'Perfect',
        cover: 'perfectimg.jpeg',
        artist: 'Luke Manohar',
    },
    {
        path: 'until i found yoump3.mp3',
        displayName: 'Until I Found You',
        cover: 'untilimg.webp',
        artist: 'Luke Manohar',
    },
    {
        path: 'interstellarmp3.mp3',
        displayName: 'Interstellar',
        cover: 'Interstellar img.avif',
        artist: 'Luke Manohar',
    },
    {
        path: 'ReelAudiomp3.mp3',
        displayName: 'Apna bana le piya',
        cover: 'guitarimg.jpg',
        artist: 'Luke Manohar',
    }

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

