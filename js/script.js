const playerVideo = document.querySelector('.player__video');
const video = playerVideo.querySelector('.video');
const playToggle = document.getElementById('play-toggle');
const iconPlay = playToggle.querySelector('.icon__play');
const sound = playerVideo.querySelector('.sound');
const playbackRate = playerVideo.querySelector('.playbackRate');
const skipButtons = playerVideo.querySelectorAll('[data-skip]');
const currentTimeElement = playerVideo.querySelector('.current');
const durationTimeElement = playerVideo.querySelector('.duration');
const fullscreen = document.getElementById('fullscreen');
const progress = playerVideo.querySelector('.progress');
const progressBar = playerVideo.querySelector('.progress__filled');

//Play-toggle button function
function playOrPause() {
    if (video.paused) {
        video.play();
        iconPlay.setAttribute('src', './assets/icons/pause.png');
    } else {
        video.pause();
        iconPlay.setAttribute('src', './assets/icons/play.png');
    };
};

playToggle.addEventListener('click', playOrPause);
video.addEventListener('click', playOrPause);

//Volume function
sound.addEventListener('mousemove', (e) => {
    video.volume = e.target.value;
});

//Playback rate function
playbackRate.addEventListener('mousemove', (e) => {
    video.playbackRate = e.target.value;
});

//Skip-buttons function
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};

skipButtons.forEach((button) => button.addEventListener('click', skip));

//Time display function
const currentTime = () => {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0'+currentSeconds : currentSeconds}`;
    durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds < 10 ? '0'+durationSeconds : durationSeconds}`;
};

video.addEventListener('timeupdate', currentTime);

//Full-screen function
function toggleFullscreen() {
    if (!video.fullscreenElement) {
        video.requestFullscreen();
    } else {
        video.exitFullscreen();
    };
};

fullscreen.addEventListener('click', toggleFullscreen);

//Progress bar functions
video.addEventListener('timeupdate', () => {
    const filledWidth = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${filledWidth}%`;    
});

progress.addEventListener('click', (e) => {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
});
