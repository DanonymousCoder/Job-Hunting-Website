let cont = document.getElementById("container");
let darkTog = document.getElementById("dark-mode");
let lightTog = document.getElementById("icon");

let ham = document.getElementById("ham");
let link = document.getElementById("link");
let btn = document.getElementById("butn");

let signup = document.getElementById("signup");
let login = document.getElementById("login");



signup.addEventListener("click", signUp);
login.addEventListener("click", logIn);

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
    window.location.href = "/Job-Hunting-Website/pages/signup.html";
}

function logIn() {
    window.location.href = "/Job-Hunting-Website/pages/login.html";
}



/**
 * Tutorial
 */

document.addEventListener("DOMContentLoaded", () => {
    const steps = [
      {
        text : "Scroll down to view the whole landing page.",
        target : null,
        action : () => {
            return new Promise((resolve) => {
                const onScroll = () => {
                    if (window.scrollY > window.innerHeight / 2) {
                        window.removeEventListener("scroll", onScroll);
                        resolve();
                    }
                };
                window.addEventListener("scroll", onScroll);
            });
        },
      },
      {
        text: "Click the button to enable dark mode.",
        target : "#darkmode-btn",
        action : () => {
            return new Promise((resolve) => {
                const button = document.querySelector("#darkmode-btn");

                const onClick = () => {
                    button.removeEventListener("click", onClick);
                    resolve();
                }
                button.addEventListener("click", onclick);
            });
        },
      },
    ];


    let currentStep = 0;
    const tutorialBox = document.getElementById("tutorial-box")
  })




/*
function goHome() {
    window.location.href = "../index.html";
    /Job-Hunting-Website
}
    */   