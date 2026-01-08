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
  const res = await fetch(file);
  const result = await res.json();
  return result
}

function loadAnimes(animes){
  let div = document.querySelector(".anime")
  div.innerHTML = ""
  if(animes.length ===0){
    div.innerHTML = `<div class="animeCard flex align-center hover justify-center">No anime yet.</div>`
    return
  }
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

function loadMusics(musics){
  let div = document.querySelector(".music")
  div.innerHTML = ""
  if(musics.length ===0){
    div.innerHTML = `<div class="animeCard flex align-center hover justify-center">No music yet.</div>`
    return
  }
  musics.forEach((music)=>{
    div.innerHTML += `<div class="musicCard flex align-center hover">
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
  let query, section, animes, musics;
  animes = await fetchData("/data/anime.json")
  loadAnimes(animes)
  musics = await fetchData("/data/music.json")
  loadMusics(musics)
  const search = document.getElementById("search-input")
  search.addEventListener("input", async ()=>{
    query = search.value.trim().toLowerCase()
    Array.from(document.querySelector(".exploreBtn").getElementsByTagName("button")).forEach(e=>{
      if(e.getAttribute("class") === "active"){
        section = e.id.slice(0, -3)
      }
    })
    let data = await fetchData(`/data/${section}.json`)
    newData = data.filter(e=>{
      if(section === "anime"){
        return e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query);
      }
      else if(section === "music"){
        return e.title.toLowerCase().includes(query) || e.artist.toLowerCase().includes(query);
      }
    });
    console.log(newData)
    if(section === "anime"){
      loadAnimes(newData)
    }
    else if (section === "music"){
      loadMusics(newData)
    }
  })
}

main()