document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser || !currentUser.fullName || !currentUser.email) {
        window.location.href = "../pages/login.html";
        return;
    }

    const elements = {
        cont: document.getElementById("container"),
        darkTog: document.getElementById("dark-mode"),
        lightTog: document.getElementById("icon"),
        defDisplay: document.getElementById("date-range-display"),
        updDate: document.getElementById("update-date"),
        dashBoard: document.getElementById("dashb"),
        messages: document.getElementById("message"),
        browse: document.getElementById("browse"),
        messagesTab: document.getElementById("messages-tab"),
        dashTab: document.getElementById("dashboard"),
        app: document.getElementById("applications"),
        appTab: document.getElementById("app-tab"),
        find: document.getElementById("find"),
        findTab: document.getElementById("find-tab"),
        browseTab: document.getElementById("brows-tab"),
        appDetailsTab: document.getElementById("app-details"),
        logoutBtn: document.getElementById("logout-btn"),
        dashName: document.getElementById("fulname"),
        mailName: document.getElementById("maail"),
        firname: document.getElementById("firname"),
        firname2: document.getElementById("firname2"),
        searchInput: document.getElementById("find-job-keyword"),
        searchButton: document.getElementById("find-job-search-btn"),
        resultsCount: document.getElementById("find-results-count"),
        sptBt: document.getElementById("spt-bt"),
        deftBt: document.getElementById("dft-bt"),
        spt: document.getElementById("spt"),
        deft: document.getElementById("deft")
    };

    const nameParts = currentUser.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || currentUser.fullName;

    if (elements.dashName) {
        elements.dashName.textContent = currentUser.fullName;
    }

    if (elements.mailName) {
        elements.mailName.textContent = currentUser.email;
    }

    if (elements.firname) {
        elements.firname.textContent = firstName;
    }

    if (elements.firname2) {
        elements.firname2.textContent = firstName;
    }

    if (elements.logoutBtn) {
        elements.logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "../pages/login.html";
        });
    }

    const stats = loadJobStats();
    const jobCards = Array.from(document.querySelectorAll(".find .apply, .find .box, .app-details .card .right a, .job .right a, .buttons a"));
    const saveButtons = Array.from(document.querySelectorAll(".find .buttons a, .applies-box .box .head button, .app-details .right a"));
    const applyButtons = Array.from(document.querySelectorAll(".find .buttons a, .app-details .job .right a, .buttons a"));
    const displayCards = Array.from(document.querySelectorAll(".find .apply"));
    const displayCardBox = Array.from(document.querySelectorAll(".find .applies-box .box"));
    const jobActionFeedback = ensureFeedbackNode();

    function ensureFeedbackNode() {
        let node = document.getElementById("job-action-feedback");
        if (!node) {
            node = document.createElement("p");
            node.id = "job-action-feedback";
            node.className = "job-action-feedback";
            const searchBox = document.querySelector(".find .search-box");
            if (searchBox && searchBox.parentNode) {
                searchBox.parentNode.insertBefore(node, searchBox.nextSibling);
            }
        }
        return node;
    }

    function loadJobStats() {
        return JSON.parse(localStorage.getItem("jobStats") || "{}");
    }

    function persistJobStats() {
        localStorage.setItem("jobStats", JSON.stringify(stats));
    }

    function getJobKey(card) {
        const title = card.querySelector("h2, p.bold, .d1 > p")?.textContent?.trim() || "Unknown job";
        const company = card.querySelector(".locate p:first-child, .loc p:first-child, .company p")?.textContent?.trim() || "Unknown company";
        return `${title}__${company}`.toLowerCase();
    }

    function setActiveTab(targetTab) {
        const tabs = [elements.dashTab, elements.messagesTab, elements.appTab, elements.findTab, elements.browseTab, elements.appDetailsTab].filter(Boolean);
        tabs.forEach((tab) => tab.classList.remove("active2"));
        if (targetTab) {
            targetTab.classList.add("active2");
        }
    }

    function setActiveLink(activeLink) {
        [elements.dashBoard, elements.messages, elements.app, elements.find, elements.browse].forEach((item) => {
            if (item) {
                item.classList.remove("active");
            }
        });
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }

    function showDashboard() {
        setActiveTab(elements.dashTab);
        setActiveLink(elements.dashBoard);
    }

    function showMessages() {
        setActiveTab(elements.messagesTab);
        setActiveLink(elements.messages);
    }

    function showApplications() {
        setActiveTab(elements.appTab);
        setActiveLink(elements.app);
    }

    function showFind() {
        setActiveTab(elements.findTab);
        setActiveLink(elements.find);
    }

    function showBrowse() {
        setActiveTab(elements.browseTab);
        setActiveLink(elements.browse);
    }

    if (elements.dashBoard) {
        elements.dashBoard.addEventListener("click", showDashboard);
    }

    if (elements.messages) {
        elements.messages.addEventListener("click", showMessages);
    }

    if (elements.app) {
        elements.app.addEventListener("click", showApplications);
    }

    if (elements.find) {
        elements.find.addEventListener("click", showFind);
    }

    if (elements.browse) {
        elements.browse.addEventListener("click", showBrowse);
    }

    if (elements.defDisplay) {
        elements.defDisplay.addEventListener("click", () => {
            const form = document.getElementById("date-range-form");
            if (form) {
                form.style.display = form.style.display === "flex" ? "none" : "flex";
            }
        });
    }

    if (elements.updDate) {
        elements.updDate.addEventListener("click", () => {
            const startInput = document.getElementById("start")?.value;
            const endInput = document.getElementById("end")?.value;

            if (startInput && endInput) {
                const startDate = new Date(startInput).toLocaleDateString("en-US", { month: "long", day: "numeric" });
                const endDate = new Date(endInput).toLocaleDateString("en-US", { month: "long", day: "numeric" });

                const startLabel = document.getElementById("start-date");
                const endLabel = document.getElementById("end-date");
                if (startLabel) {
                    startLabel.textContent = startDate;
                }
                if (endLabel) {
                    endLabel.textContent = endDate;
                }

                const form = document.getElementById("date-range-form");
                if (form) {
                    form.style.display = "none";
                }
            }
        });
    }

    function toggleDarkMode() {
        if (!elements.cont || !elements.lightTog) {
            return;
        }

        elements.cont.classList.toggle("dark");
        if (elements.lightTog.classList.contains("bx-moon")) {
            elements.lightTog.classList.remove("bx-moon");
            elements.lightTog.classList.add("bx-sun");
        } else {
            elements.lightTog.classList.remove("bx-sun");
            elements.lightTog.classList.add("bx-moon");
        }
    }

    if (elements.darkTog) {
        elements.darkTog.addEventListener("click", toggleDarkMode);
    }

    const allJobCards = Array.from(document.querySelectorAll(".find .apply, .find .box"));
    const currentViewCards = Array.from(document.querySelectorAll(".find .applies.deft .apply, .find .applies-box.spt .box"));

    function markApplied(card) {
        const key = getJobKey(card);
        stats[key] = stats[key] || { saved: false, appliedCount: 0 };
        stats[key].appliedCount += 1;
        persistJobStats();
        showFeedback(`Applied to ${extractJobTitle(card)}. Total applications: ${stats[key].appliedCount}.`);
        updateCounters();
    }

    function toggleSaved(card) {
        const key = getJobKey(card);
        stats[key] = stats[key] || { saved: false, appliedCount: 0 };
        stats[key].saved = !stats[key].saved;
        persistJobStats();
        showFeedback(`${extractJobTitle(card)} ${stats[key].saved ? "saved" : "removed from saved jobs"}.`);
        updateCounters();
    }

    function extractJobTitle(card) {
        return card.querySelector("h2, .d1 > p, .bold")?.textContent?.trim() || "this job";
    }

    function showFeedback(message) {
        if (!jobActionFeedback) {
            return;
        }
        jobActionFeedback.textContent = message;
        jobActionFeedback.classList.remove("error");
    }

    function updateCounters() {
        const appliedTotal = Object.values(stats).reduce((sum, job) => sum + (job.appliedCount || 0), 0);
        const savedTotal = Object.values(stats).reduce((sum, job) => sum + (job.saved ? 1 : 0), 0);

        const totalJobsCard = document.querySelector(".tot-jobs .num");
        const interviewedCard = document.querySelector(".interviewed .num");
        if (totalJobsCard) {
            totalJobsCard.textContent = String(appliedTotal || 45);
        }
        if (interviewedCard) {
            interviewedCard.textContent = String(savedTotal || 18);
        }

        if (elements.resultsCount) {
            const visibleCount = allJobCards.filter((card) => card.style.display !== "none").length;
            elements.resultsCount.textContent = `Showing ${visibleCount || allJobCards.length} results`;
        }
    }

    function applyJobFilters() {
        const query = (elements.searchInput?.value || "").trim().toLowerCase();
        let visibleCount = 0;

        allJobCards.forEach((card) => {
            const haystack = card.textContent.toLowerCase();
            const matches = !query || haystack.includes(query);
            card.style.display = matches ? "" : "none";
            if (matches) {
                visibleCount += 1;
            }
        });

        if (elements.resultsCount) {
            elements.resultsCount.textContent = `Showing ${visibleCount} results`;
        }

        showFeedback(query ? `Filtered jobs by "${query}".` : "Showing all jobs.");
    }

    if (elements.searchButton) {
        elements.searchButton.addEventListener("click", (event) => {
            event.preventDefault();
            applyJobFilters();
        });
    }

    if (elements.searchInput) {
        elements.searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                applyJobFilters();
            }
        });
    }

    currentViewCards.forEach((card) => {
        const applyLink = card.querySelector(".buttons a, .right a, .job .right a");
        const saveAction = card.querySelector(".head button, .right img");

        if (applyLink) {
            applyLink.addEventListener("click", (event) => {
                event.preventDefault();
                markApplied(card);
            });
        }

        if (saveAction) {
            saveAction.addEventListener("click", (event) => {
                event.preventDefault();
                toggleSaved(card);
            });
        }
    });

    if (elements.sptBt && elements.deftBt && elements.spt && elements.deft) {
        elements.deftBt.addEventListener("click", () => {
            elements.spt.style.display = "none";
            elements.deft.style.display = "flex";
            elements.sptBt.src = "../assets/images/View.png";
            elements.deftBt.src = "../assets/images/View2.png";
        });

        elements.sptBt.addEventListener("click", () => {
            elements.spt.style.display = "grid";
            elements.deft.style.display = "none";
            elements.sptBt.src = "../assets/images/View-active.png";
            elements.deftBt.src = "../assets/images/View2-non.png";
        });
    }

    const parentLinks = document.querySelectorAll(".links > div");
    const parentSetts = document.querySelectorAll(".setts > div");

    parentLinks.forEach((item) => {
        item.addEventListener("click", () => {
            parentLinks.forEach((link) => link.classList.remove("active"));
            item.classList.add("active");
        });
    });

    parentSetts.forEach((sett) => {
        sett.addEventListener("click", () => {
            parentSetts.forEach((item) => item.classList.remove("active"));
            sett.classList.add("active");
        });
    });

    function loadFromState() {
        const totalJobsCard = document.querySelector(".tot-jobs .num");
        const interviewedCard = document.querySelector(".interviewed .num");
        if (totalJobsCard) {
            totalJobsCard.textContent = String(Object.values(stats).reduce((sum, job) => sum + (job.appliedCount || 0), 0) || 45);
        }
        if (interviewedCard) {
            interviewedCard.textContent = String(Object.values(stats).reduce((sum, job) => sum + (job.saved ? 1 : 0), 0) || 18);
        }
        updateCounters();
    }

    loadFromState();

    if (elements.resultsCount) {
        elements.resultsCount.textContent = `Showing ${allJobCards.length} results`;
    }
});
