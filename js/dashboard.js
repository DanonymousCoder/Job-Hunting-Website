let defDisplay = document.getElementById("date-range-display");
let updDate = document.getElementById("update-date");

let dashBoard = document.getElementById("dashb");
let messages = document.getElementById("message");

let messagesTab = document.getElementById("messages-tab");
let dashTab = document.getElementById("dashboard");
let app = document.getElementById("applications");
let appTab = document.getElementById("app-tab");
let find = document.getElementById("find");
let findTab = document.getElementById("find-tab");

let cont = document.getElementById("container");
let darkTog = document.getElementById("dark-mode");
let lightTog = document.getElementById("icon");

let sptBt = document.getElementById("spt-bt");
let deftBt = document.getElementById("dft-bt");

let spt = document.getElementById("spt");
let deft = document.getElementById("deft");

darkTog.addEventListener("click", darkInit);

 messages.addEventListener("click",() => {
  messages.classList.add("active");
  dashBoard.classList.remove("active");

  messagesTab.classList.add("active2")
  dashTab.classList.remove("active2");
  appTab.classList.remove("active2");
} )

dashBoard.addEventListener("click",() => {
  messages.classList.remove("active");
  dashBoard.classList.add("active");

  messagesTab.classList.remove("active2")
  dashTab.classList.add("active2");
  appTab.classList.remove("active2");
} )

app.addEventListener("click",() => {
  messages.classList.remove("active");
  dashBoard.classList.remove("active");
  app.classList.add("active");

  messagesTab.classList.remove("active2");
  dashTab.classList.remove("active2");
  appTab.classList.add("active2");
} )

find.addEventListener("click", () => {
  messages.classList.remove("active");
  dashBoard.classList.remove("active");
  app.classList.remove("active");

  messagesTab.classList.remove("active2");
  dashTab.classList.remove("active2");
  appTab.classList.remove("active2");
  findTab.classList.add("active2")
})


defDisplay.addEventListener("click", showDate);
updDate.addEventListener("click", updateDate);


function showDate() {
    const form = document.getElementById("date-range-form");
    form.style.display = form.style.display === "flex" ? "none" : "flex";
}


function updateDate() {
    const startInput = document.getElementById("start").value;
    const endInput = document.getElementById("end").value;
  
    if (startInput && endInput) {
      const startDate = new Date(startInput).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      const endDate = new Date(endInput).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
      document.getElementById("start-date").textContent = startDate;
      document.getElementById("end-date").textContent = endDate;
  
      // Hide the form after updating
      document.getElementById("date-range-form").style.display = "none";
    } else {
      alert("Please select both start and end dates.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const dashName = document.getElementById('fulname');
  const fullName = localStorage.getItem("fullName");

  const maail = document.getElementById("maail");
  const mail = localStorage.getItem("eMail");

  const firname = document.getElementById("firname");
  const firname_ = document.getElementById("firname2");


  if (fullName && mail) {
      dashName.textContent = fullName;
      maail.textContent = mail;

      nameSplit = fullName.split(' ');
      firname.textContent = nameSplit[0];
      firname_.textContent = nameSplit[0];
  } else {
      dashName.textContent = "Guest"; // Fallback if no name is found
  }
});


function darkInit() {
  

  // Toggle the icon between moon and sun
  if (lightTog.classList.contains("bx-moon")) {
      lightTog.classList.remove("bx-moon");
      lightTog.classList.add("bx-sun");
  } else {
      lightTog.classList.remove("bx-sun");
      lightTog.classList.add("bx-moon");
  }
}

const parentLinks = document.querySelectorAll('.links > div');
const parentSetts = document.querySelectorAll('.setts > div');
const parentTabs = document.querySelectorAll('.content > main');

    parentLinks.forEach(link => {
        link.addEventListener('click', () => {
           
            parentLinks.forEach(item => item.classList.remove('active'));

            
            link.classList.add('active');
        });
    });

    parentSetts.forEach(sett => {
      sett.addEventListener('click', () => {
         
          parentSetts.forEach(item => item.classList.remove('active'));

          
          sett.classList.add('active');
      });
  });
/*
parentTabs.forEach(tab => {
  tab.classList.add
}) */

  deftBt.addEventListener("click", () => {
    spt.style.display = "none";
    deft.style.display = "flex";
  
    sptBt.src = "../assets/images/View.png";
    deftBt.src = "../assets/images/View2.png";
  })

sptBt.addEventListener("click", () => {
  spt.style.display = "flex";
  deft.style.display = "none";

  sptBt.src = "../assets/images/View-active.png";
  deftBt.src = "../assets/images/View2-non.png";
})