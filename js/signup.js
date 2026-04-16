document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupp");
    const feedback = document.getElementById("signup-feedback");
    const homeBtn = document.getElementById("homee");

    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

    if (!form || !feedback) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fullName = document.getElementById("fname").value.trim();
        const email = document.getElementById("mail").value.trim().toLowerCase();
        const password = document.getElementById("pswrd").value;

        if (fullName.length < 2) {
            showFeedback("Please enter your full name.", true);
            return;
        }

        if (!email.includes("@")) {
            showFeedback("Please enter a valid email address.", true);
            return;
        }

        if (password.length < 6) {
            showFeedback("Password must be at least 6 characters.", true);
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
            showFeedback("This email is already registered. Please login.", true);
            return;
        }

        const newUser = {
            fullName,
            email,
            password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify({ fullName, email }));
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("eMail", email);

        showFeedback("Account created. Redirecting to your dashboard...", false);
        setTimeout(() => {
            window.location.href = "../pages/dashboard.html";
        }, 600);
    });

    function showFeedback(message, isError) {
        feedback.textContent = message;
        feedback.classList.toggle("error", isError);
    }
});
 