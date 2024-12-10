let cont = document.getElementById("container");
let darkTog = document.getElementById("dark-mode");
let lightTog = document.getElementById("icon");

let ham = document.getElementById("ham");
let link = document.getElementById("link");
let btn = document.getElementById("butn");

let signup = document.getElementById("signup");
let login = document.getElementById("login");
let home = document.getElementById("homee");

signup.addEventListener("click", signUp);
login.addEventListener("click", logIn);
home.addEventListener("click", goHome);

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

function signUp() {
    window.location.href = "../pages/signup.html";
}

function logIn() {
    window.location.href = "../pages/login.html";
}

function goHome() {
    window.location.href = "../index.html";
}