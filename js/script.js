document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menu-bar");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.getElementById("close-side-menu");

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("home").hidden = false;
  }, 1500);

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sideMenu.classList.toggle("active");
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sideMenu.classList.remove("active");
  });

  sideMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    sideMenu.classList.remove("active");
  });

});