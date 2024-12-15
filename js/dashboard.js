let defDisplay = document.getElementById("date-range-display");
let updDate = document.getElementById("update-date");


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
  const dashName = document.getElementById("fulname");
  const fullName = localStorage.getItem("fullName");

  const maail = document.getElementById("maail");
  const mail = localStorage.getItem("eMail");



  if (fullName && mail) {
      dashName.textContent = fullName;
      maail.textContent = mail;
  } else {
      dashName.textContent = "Guest"; // Fallback if no name is found
  }
});