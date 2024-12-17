let form = document.getElementById("signupp");

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("signsub");

    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        saveDetails();
    });

    function saveDetails() {
        const fullName = document.getElementById("fname").value;
        const eMail= document.getElementById("mail").value;

        if (fullName && eMail) {
            localStorage.setItem("fullName", fullName);
            localStorage.setItem("eMail", eMail);
            window.location.href = "../pages/dashboard.html"; // Redirect to dashboard
        } else {
            alert("Please enter your full name.");
        }
    }
}); 
 