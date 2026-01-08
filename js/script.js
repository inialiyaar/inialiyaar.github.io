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

async function fetchData(file){
  const res = await fetch(file)
  const result = await res.json()
  return result
}

async function loadAnimes(){
  let animes = await fetchData("/data/anime.json")
  let div = document.querySelector(".anime")
  animes.forEach((anime)=>{
    div.innerHTML += `<div class="animeCard flex align-center hover">
          <img src="${anime.image}" alt="${anime.title}">
          <div class="flex flex-column">
            <h4>${anime.title}</h4>
            <p>${anime.description}</p>
            <span>⭐ ${anime.rating}/10</span>
          </div>
        </div>`
  })
}

async function loadMusics(){
  let musics = await fetchData("/data/music.json")
  musics.forEach((music)=>{
    document.querySelector(".music").innerHTML += `<div class="musicCard flex align-center hover">
          <img src="${music.image}" alt="${music.title}">
          <div class="flex flex-column">
            <h4>${music.title}</h4>
            <p>${music.artist}</p> 
            <p>Duration: ${music.duration}</p>
          </div>
        </div>`
  })
}

async function main(){
  await loadAnimes()
  await loadMusics()
}

main()