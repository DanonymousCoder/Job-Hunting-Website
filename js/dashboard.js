const parentLinks = document.querySelectorAll('.links > div'); // Navigation links
const parentSetts = document.querySelectorAll('.setts > div'); // Settings links
const parentTabs = document.querySelectorAll('.content > main'); // Content tabs

// Function to reset active classes for navigation and tabs
function resetActive(elements, className) {
  elements.forEach(el => el.classList.remove(className));
}

// Handle click for navigation links and tabs
parentLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // Remove 'active' class from all links and tabs
    resetActive(parentLinks, 'active');
    resetActive(parentTabs, 'active2');

    // Add 'active' class to the clicked link
    link.classList.add('active');

    // Get the corresponding tab using the 'data-tab' attribute
    const targetTabId = link.getAttribute('data-tab');
    const targetTab = document.getElementById(targetTabId);

    // Add 'active2' to the matching tab
    if (targetTab)  {
      targetTab.classList.add('active2');
    };
  });
});

// Handle click for settings links (if required)
parentSetts.forEach(sett => {
  sett.addEventListener('click', () => {
    resetActive(parentSetts, 'active');
    sett.classList.add('active');
  });
});


const darkTog = document.getElementById("dark-mode");
const lightTog = document.getElementById("icon");

function darkInit() {
  lightTog.classList.toggle("bx-moon");
  lightTog.classList.toggle("bx-sun");
}

darkTog.addEventListener("click", darkInit);
