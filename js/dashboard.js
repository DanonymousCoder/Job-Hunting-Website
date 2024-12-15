let defDisplay = document.getElementById("date-range-display");
let updDate = document.getElementById("update-date");
let form = document.getElementById("signupp");
let submiT = document.getElementById("signsub");


defDisplay.addEventListener("click", showDate);
updDate.addEventListener("click", updateDate);

submiT.addEventListener("submit", saveDetails);

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

function saveDetails() {
  const fname = document.getElementById("fname").value;

  let dashName= document.getElementById("fulname");
  dashName.innerHTML = fname;
}