setTimeout(()=>{
  document.getElementById("loader").style.display = "none";
  document.getElementById("home").hidden = false;
}, 1500)

let menu_btn = document.getElementById("menu-bar")
let side_menu = document.getElementById("sideMenu")
let close_btn = document.getElementById("close-side-menu")
let body = document.body
let about = document.getElementById("about-text")

const ShowMenu = ((event) =>{
  event.stopPropagation()
  side_menu.classList.toggle("PushMenu")
})

const CloseMenu = ((event)=>{
  event.stopPropagation()
  side_menu.classList.remove("PushMenu")
})
menu_btn.addEventListener("click", ShowMenu)
close_btn.addEventListener("click", CloseMenu)

body.addEventListener("click", CloseMenu)

let aboutList = ["Bot developer", "Web developer", "Python programmer"]

let aboutListIndex = 0;
let charIndex = 0;
let text = "";

function typeWriter() {
  if (charIndex < aboutList[aboutListIndex].length){
      text += aboutList[aboutListIndex].charAt(charIndex)
      about.innerHTML = text + " |";
      charIndex++;
      setTimeout(typeWriter, 120)
  }
  else{
    text = ""
    setTimeout(erase, 2000)
  }
}

function erase() {
  if (charIndex != 0) {
    charIndex--;
    about.innerHTML = about.innerHTML.slice(0, charIndex) + " |";
    setTimeout(erase, 80)
  }
  else {
    aboutListIndex = (aboutListIndex + 1) % aboutList.length;
    setTimeout(typeWriter, 120)
  }
}

typeWriter()