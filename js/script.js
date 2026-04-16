let cont = document.getElementById("container");
let darkTog = document.getElementById("dark-mode");
let lightTog = document.getElementById("icon");

let ham = document.getElementById("ham");
let closeNav = document.getElementById("close-nav");
let link = document.getElementById("link");
let btn = document.getElementById("butn");

let signup = document.getElementById("signup");
let login = document.getElementById("login");



if (signup) {
    signup.addEventListener("click", signUp);
}

if (login) {
    login.addEventListener("click", logIn);
}

if (darkTog && cont) {
    darkTog.addEventListener("click", darkInit);
}

if (ham) {
    ham.addEventListener("click", navOpen);
}

if (closeNav) {
    closeNav.addEventListener("click", navClose);
}

// Check if container is at max-width (1440px)
function isContainerAtMaxWidth() {
    const containerMaxWidth = 1440;
    return window.innerWidth >= containerMaxWidth;
}

// Update body dark mode based on container width
function updateBodyDarkMode() {
    if (cont && cont.classList.contains("dark") && isContainerAtMaxWidth()) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Listen for window resize to update body dark mode
window.addEventListener("resize", updateBodyDarkMode);

function darkInit() {
    if (!cont || !lightTog) {
        return;
    }

    cont.classList.toggle("dark");
    
    // Update body dark mode when container reaches max-width
    updateBodyDarkMode();

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
    if (!link || !btn) {
        return;
    }

    link.classList.toggle("active");
    btn.classList.toggle("active");
}

function navClose() {
    if (!link || !btn) {
        return;
    }

    link.classList.remove("active");
    btn.classList.remove("active");
}

function signUp() {
    window.location.href = "pages/signup.html";
}

function logIn() {
    window.location.href = "pages/login.html";
}



/**
 * Coming Soon Modal
 */

const comingSoonModal = document.getElementById("coming-soon-modal");
const modalCloseBtn = document.getElementById("modal-close");
const comingSoonElements = document.querySelectorAll(".coming-soon");

// Show modal when clicking on coming soon elements
comingSoonElements.forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        if (comingSoonModal) {
            comingSoonModal.classList.add("active", "show");
        }
    });
});

// Close modal when clicking close button
if (modalCloseBtn && comingSoonModal) {
    modalCloseBtn.addEventListener("click", () => {
        comingSoonModal.classList.remove("active", "show");
    });
}

// Close modal when clicking outside
if (comingSoonModal) {
    comingSoonModal.addEventListener("click", (e) => {
        if (e.target === comingSoonModal) {
            comingSoonModal.classList.remove("active", "show");
        }
    });
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (comingSoonModal && e.key === "Escape" && (comingSoonModal.classList.contains("active") || comingSoonModal.classList.contains("show"))) {
        comingSoonModal.classList.remove("active", "show");
    }
});


/**
 * Tutorial
 */

document.addEventListener("DOMContentLoaded", () => {
    const steps = [
        {
            text: "Scroll down to view the whole landing page.",
            target: null,
            action: () => {
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
            target: "#darkmode-btn",
            action: () => {
                return new Promise((resolve) => {
                    const button = document.querySelector("#darkmode-btn");

                    if (!button) {
                        resolve();
                        return;
                    }

                    const onClick = () => {
                        button.removeEventListener("click", onClick);
                        resolve();
                    }
                    button.addEventListener("click", onClick);
                });
            },
        },
    ];


    let currentStep = 0;
    const tutorialBox = document.getElementById("tutorial-box");
    const tutorialText = document.getElementById("tutorial-text");
    const skipTutorialBtn = document.getElementById("skip-tutorial-btn");
    const startTutorialBtn = document.getElementById("start-tutorial-btn");

    if (!tutorialBox || !tutorialText || !skipTutorialBtn || !startTutorialBtn) {
        return;
    }


    // Start the tutorial

    startTutorialBtn.addEventListener("click", () => {
        currentStep = 0;
        showStep();
    })

    // Skip tutorial

    skipTutorialBtn.addEventListener("click", () => {
        tutorialBox.classList.add("hidden");
        alert("Tutorial skipped!");
    })

    // Show a specific step

    function showStep() {
        if (currentStep >= steps.length) {
            completeTutorial();
            return;
        }

        const step = steps[currentStep];
        tutorialText.textContent = step.text;
        tutorialBox.classList.remove("hidden");

        // Position the tutorial box 

        if (step.target) {
            const targetElement = document.querySelector(step.target);
        }
    }
})


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.head > p').forEach(function (p) {
        p.classList.add('head-p');
    });
});



/*
function goHome() {
    window.location.href = "../index.html";
    /Job-Hunting-Website
}
    */