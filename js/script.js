let cont = document.getElementById("container");
let darkTog = document.getElementById("dark-mode");
let lightTog = document.getElementById("icon");

let ham = document.getElementById("ham");
let link = document.getElementById("link");
let btn = document.getElementById("butn");

darkTog.addEventListener("click", darkInit);
ham.addEventListener("click", navOpen);

function darkInit() {
    cont.classList.toggle("dark");
    

    // Toggle the icon between moon and sun
    if (lightTog.classList.contains("bx-moon")) {
        lightTog.classList.remove("bx-moon");
        lightTog.classList.add("bx-sun");
    } else {
        lightTog.classList.remove("bx-sun");
        lightTog.classList.add("bx-moon");
    }
}

function navOpen() {
    link.classList.toggle("active");
    btn.classList.toggle("active");
}