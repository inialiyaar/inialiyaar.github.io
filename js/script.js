let menu_btn = document.getElementById("menu-bar");
let side_menu = document.getElementById("sideMenu");
let close_btn = document.getElementById("close-side-menu");
let body = document.body
let about = document.getElementById("about-text");

setTimeout(() => {
  if (!document.getElementById("loader")) return;
  document.getElementById("loader").style.display = "none";
  document.getElementById("home").hidden = false;
}, 1500);

const ShowMenu = ((event) => {
  event.stopPropagation();
  side_menu.classList.toggle("PushMenu");
});

const CloseMenu = ((event) => {
  event.stopPropagation();
  side_menu.classList.remove("PushMenu");
});
menu_btn.addEventListener("click", ShowMenu);
close_btn.addEventListener("click", CloseMenu);

body.addEventListener("click", CloseMenu);

let aboutList = ["Bot developer", "Web developer", "Python programmer",];

let aboutListIndex = 0;
let charIndex = 0;
let text = "";

function typeWriter() {
  if (!about) return;
  if (charIndex < aboutList[aboutListIndex].length) {
    text += aboutList[aboutListIndex].charAt(charIndex);
    about.innerHTML = text + "<span> |</span>";
    charIndex++;
    setTimeout(typeWriter, 120);
  }
  else {
    text = "";
    setTimeout(erase, 2000);
  }
};

function erase() {
  if (charIndex != 0) {
    charIndex--;
    about.innerHTML = about.innerHTML.slice(0, charIndex) + "<span> |</span>";
    setTimeout(erase, 80);
  }
  else {
    aboutListIndex = (aboutListIndex + 1) % aboutList.length;
    setTimeout(typeWriter, 120);
  }
};

typeWriter();

let Music = document.querySelector(".music");

function addMusicCard(img, title, artist, duration, lyrics) {
  if (!Music) return;
  let musicCard = document.createElement("div");
  musicCard.setAttribute("class", "hover");
  Music.append(musicCard);
  
  let image = document.createElement("img");
  image.setAttribute("src", img);
  image.setAttribute("alt", title);
  musicCard.append(image);
  
  let h2Title = document.createElement("h2");
  musicCard.append(h2Title);
  h2Title.innerHTML = title;
  
  let h3Artist = document.createElement("h3");
  musicCard.append(h3Artist);
  h3Artist.innerHTML = artist;
  
  let spanDuration = document.createElement("span");
  musicCard.append(spanDuration);
  spanDuration.innerHTML = duration;
  
  let aLyrics = document.createElement("a");
  aLyrics.innerHTML = "lyrics";
  aLyrics.setAttribute("href", lyrics);
  aLyrics.setAttribute("target", "_blank");
  musicCard.append(aLyrics);
};

addMusicCard("../MyMusic/assets/tu-hai-kahan.jpeg", "Tu Hai Kahan", "AUR", "Duration: 4 minutes 24 seconds", "https://www.smule.com/song/uraan-tu-hai-kahan-karaoke-lyrics/19442783_19442783/arrangement")
addMusicCard("../MyMusic/assets/kabhi-kabhi.jpeg", "Kabhi Kabhi", "AUR", "Duration: 3 minutes 36 seconds", "https://genius.com/Aur-kabhi-kabhi-lyrics")
addMusicCard("../MyMusic/assets/shikayat.jpeg", "Shikayat", "AUR", "Duration: 4 minutes 33 seconds", "https://genius.com/Genius-romanizations-aur-shikayat-romanized-lyrics")
addMusicCard("../MyMusic/assets/meherban.jpeg", "Meherban", "JANI", "Duration: 3 minutes 32 seconds", "https://genius.com/Jani-and-jokhay-meherban-lyrics")
addMusicCard("../MyMusic/assets/tu-bata.jpeg", "Tu Bata", "Aftab", "Duration: 2 minutes 40 seconds", "https://www.shazam.com/song/1818727612/tu-bata")
addMusicCard("../MyMusic/assets/you.jpeg", "You", "AUR", "Duration: 4 minutes 03 seconds", "https://genius.com/Aur-you-lyrics/")
addMusicCard("../MyMusic/assets/you.jpeg", "Me", "AUR", "Duration: 4 minutes 03 seconds", "https://genius.com/Aur-me-lyrics")
addMusicCard("../MyMusic/assets/you.jpeg", "Purple", "AUR", "Duration: 4 minutes 42 seconds", "https://genius.com/Aur-purple-lyrics")
addMusicCard("../MyMusic/assets/you.jpeg", "Paint", "AUR", "Duration: 2 minutes 51 seconds", "https://genius.com/Aur-paint-lyrics")
addMusicCard("../MyMusic/assets/you.jpeg", "Again", "AUR", "Duration: 3 minutes 22 seconds", "https://genius.com/Aur-again-lyrics")