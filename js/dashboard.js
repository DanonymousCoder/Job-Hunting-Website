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
        messageInput: document.getElementById("msg-box"),
        sendMessageBtn: document.querySelector(".message-box .rit img"),
        chatWrapper: document.querySelector(".msg-txt .wrapper"),
        chatThread: document.querySelector(".msg-txt"),
        elonPreviewText: document.querySelector(".people .person.first-p .bottom p"),
        elonPreviewTime: document.querySelector(".people .person.first-p .top > p"),
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

    const chatStorageKey = `elonChatMessages_${currentUser.email}`;

    function loadChatMessages() {
        return JSON.parse(localStorage.getItem(chatStorageKey) || "[]");
    }

    function persistChatMessages(messages) {
        localStorage.setItem(chatStorageKey, JSON.stringify(messages));
    }

    function formatTime(date) {
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
        });
    }

    function createUserMessageNode(text, timeLabel) {
        const msgRow = document.createElement("div");
        msgRow.className = "jan user";

        const avatar = document.createElement("img");
        avatar.src = "../assets/images/Avatar.png";
        avatar.alt = "";

        const texts = document.createElement("div");
        texts.className = "texts";

        const sender = document.createElement("p");
        sender.className = "bold";
        sender.textContent = "You";

        const bubbleWrap = document.createElement("div");
        bubbleWrap.className = "double";
        const bubble = document.createElement("p");
        bubble.textContent = text;
        bubbleWrap.appendChild(bubble);

        const time = document.createElement("p");
        time.className = "time";
        time.textContent = timeLabel;

        texts.appendChild(sender);
        texts.appendChild(bubbleWrap);
        texts.appendChild(time);

        msgRow.appendChild(avatar);
        msgRow.appendChild(texts);
        return msgRow;
    }

    function updateElonPreview(text, timeLabel) {
        if (elements.elonPreviewText) {
            const shortText = text.length > 35 ? `${text.slice(0, 35)}...` : text;
            elements.elonPreviewText.textContent = shortText;
        }

        if (elements.elonPreviewTime) {
            elements.elonPreviewTime.textContent = timeLabel;
        }
    }

    function appendChatMessage(text, createdAt, shouldPersist) {
        if (!elements.chatWrapper) {
            return;
        }

        const timeLabel = formatTime(new Date(createdAt));
        const node = createUserMessageNode(text, timeLabel);
        elements.chatWrapper.appendChild(node);
        updateElonPreview(text, timeLabel);

        if (elements.chatThread) {
            elements.chatThread.scrollTop = elements.chatThread.scrollHeight;
        }

        if (shouldPersist) {
            const messages = loadChatMessages();
            messages.push({ text, createdAt });
            persistChatMessages(messages);
        }
    }

    function sendMessage() {
        const text = (elements.messageInput?.value || "").trim();
        if (!text) {
            return;
        }

        appendChatMessage(text, new Date().toISOString(), true);
        elements.messageInput.value = "";
        elements.messageInput.focus();
    }

    if (elements.sendMessageBtn) {
        elements.sendMessageBtn.style.cursor = "pointer";
        elements.sendMessageBtn.addEventListener("click", sendMessage);
    }

    if (elements.messageInput) {
        elements.messageInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    loadChatMessages().forEach((message) => {
        appendChatMessage(message.text, message.createdAt, false);
    });

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
