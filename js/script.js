let about = document.getElementById("about-text")
let aboutList = ["Bot developer", "Web developer", "Python programmer",];
let aboutListIndex = 0;
let charIndex = 0;
let text = "";

setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("home").hidden = false;
}, 1500);

function typeWriter() {
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


Array.from(document.querySelector(".exploreBtn").getElementsByTagName("button")).forEach((e, idx, arr) => {
  e.addEventListener("click", () => {
    arr.forEach((e) => {
      e.classList.remove("active");
    })
    e.classList.add("active");
    Array.from(document.getElementsByClassName("content")).forEach(elm => {
      if (elm.getAttribute("class").split(" ")[0] === e.getAttribute("id").slice(0, -3)) {
        elm.style.display = "flex";
      }
      else {
        elm.style.display = "none";
      }
    })
  })
})

async function fetchFiles(folder){
  let files = []
  let file = await fetch(`/assets/${folder}/`)
  let textFormat = await file.text()
  let div = document.createElement("div")
  div.innerHTML = textFormat
  Array.from(div.getElementsByTagName("a")).forEach((e)=>{
    if(e.href.includes(`/assets/${folder}/`)){
      files.push(e.href)
    }
  })
  return files
}

function appendAnime(animes){
  animes.forEach((anime)=>{
    let div = document.querySelector(".anime")
    let img = anime.trim();
    anime = anime.slice(anime.indexOf("/anime/")+7).replaceAll("%20", " ").replace("%E2%80%A2", ".").replaceAll("%2C", ",").split("_")
    anime[2] = anime[2].replace(".jpg", "");
    anime[1].length>170?anime[1]=anime[1].slice(0, 170) + "...":anime[1]=anime[1]
    div.innerHTML += `<div class="animeCard flex align-center hover">
          <img src="${img}" alt="${anime[0]}">
          <div class="flex flex-column">
            <h4>${anime[0]}</h4>
            <p>${anime[1]}</p>
            <span>⭐ ${anime[2]}/10</span>
          </div>
        </div>`
  })
}

function appendMusic(musics){
  musics.forEach((music)=>{
    let img = music;
    music = music.slice(music.indexOf("/music")+7).replaceAll("%20", " ").split("_")
    music[2] = music[2].replace(".jpeg", "").split("-")
    document.querySelector(".music").innerHTML += `<div class="musicCard flex align-center hover">
          <img src="${img}" alt="${music[0]}">
          <div class="flex flex-column">
            <h4>${music[0]}</h4>
            <p>${music[1]}</p> 
            <p>Duration: ${music[2][0]} minutes ${music[2][1]} seconds</p>
          </div>
        </div>`
  })
}

async function main(){
  let animes = await fetchFiles("anime")
  appendAnime(animes)
  let musics = await fetchFiles("music")
  appendMusic(musics)
}

main()