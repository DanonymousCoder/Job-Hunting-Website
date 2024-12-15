let form = document.getElementById("signupp");

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("signsub");

    submitButton.addEventListener("click", saveDetails);

    function saveDetails() {
        const fullName = document.getElementById("fname").value;
        const eMail= document.getElementById("mail").value;

        if (fullName && eMail) {
            localStorage.setItem("fullName", fullName);
            localStorage.setItem("eMail", eMail);
            window.location.href = "/Job-Hunting-Website/pages/dashboard.html"; // Redirect to dashboard
        } else {
            alert("Please enter your full name.");
        }
    }
});
