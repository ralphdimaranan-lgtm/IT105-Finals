let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Audio element
let curr_track = document.createElement('audio');

// Track list with background images
let trackList = [
  {
    name: "Nandito Ako",
    artist: "Rob Deniel",
    image: "AHAHAHAH1.jpg",
    path: "Rob Deniel performs Ikaw Sana and Nandito Ako LIVE on Wish 107.5.mp3",
    bg: "bg1.jpg"
  },
  {
    name: "Butsekik",
    artist: "Yoyoy Villame",
    image: "yoyoy.jpg",
    path: "Butsekik - Yoyoy Villame Lyrics.mp3",
    bg: "pg2.jpg"
  },
  {
    name: "Making Love Out of Nothing At All",
    artist: "Air Supply",
    image: "air banayad.jpg",
    path: "Air Supply - Making Love Out Of Nothing At All (Official HD Video).mp3",
    bg: "pg3.jpg"
  }
];

// Load track
function loadTrack(track_index) {
  clearInterval(updateTimer);

  curr_track.src = trackList[track_index].path;
  curr_track.load();

  // TEXT + IMAGE
  track_art.style.backgroundImage = "url(" + trackList[track_index].image + ")";
  track_name.textContent = trackList[track_index].name;
  track_artist.textContent = trackList[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + trackList.length;

  // BACKGROUND PER TRACK
  document.body.style.background = `url('${trackList[track_index].bg}')`;
  document.body.style.backgroundSize = "cover";

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

loadTrack(track_index);

// Controls
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = `<i class="fa fa-pause-circle fa-5x"></i>`;
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = `<i class="fa fa-play-circle fa-5x"></i>`;
}

function nextTrack() {
  track_index = (track_index + 1) % trackList.length;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  track_index = (track_index - 1 + trackList.length) % trackList.length;
  loadTrack(track_index);
  playTrack();
}

// Seek + Volume
function seekUpdate() {
  if (!isNaN(curr_track.duration)) {
    let position = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = position;

    let curM = Math.floor(curr_track.currentTime / 60);
    let curS = Math.floor(curr_track.currentTime % 60);
    let durM = Math.floor(curr_track.duration / 60);
    let durS = Math.floor(curr_track.duration % 60);

    curr_time.textContent = `${curM}:${curS < 10 ? "0"+curS : curS}`;
    total_duration.textContent = `${durM}:${durS < 10 ? "0"+durS : durS}`;
  }
}

seek_slider.onchange = () => {
  curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
};

volume_slider.onchange = () => {
  curr_track.volume = volume_slider.value / 100;
};
