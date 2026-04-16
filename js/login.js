document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const feedback = document.getElementById("login-feedback");
    const homeBtn = document.getElementById("home");

    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

    if (!form || !feedback) {
        return;
    }

    const cachedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (cachedUser && cachedUser.fullName) {
        const heading = document.getElementById("welcome-heading");
        if (heading) {
            const firstName = cachedUser.fullName.split(" ")[0];
            heading.textContent = `Welcome Back, ${firstName}`;
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("mail").value.trim().toLowerCase();
        const password = document.getElementById("pswrd").value;

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const matchedUser = users.find((user) => user.email === email && user.password === password);

        if (!matchedUser) {
            showFeedback("Incorrect email or password.", true);
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify({
            fullName: matchedUser.fullName,
            email: matchedUser.email
        }));
        localStorage.setItem("fullName", matchedUser.fullName);
        localStorage.setItem("eMail", matchedUser.email);

        showFeedback("Logged in successfully. Redirecting...", false);
        setTimeout(() => {
            window.location.href = "../pages/dashboard.html";
        }, 500);
    });

    function showFeedback(message, isError) {
        feedback.textContent = message;
        feedback.classList.toggle("error", isError);
    }
});
