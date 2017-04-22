var DOMAIN = "https://channeli.in";

function addClass(element, classToAdd) {
    element.classList.add(classToAdd);
}

function removeClass(element, classToRemove) {
    element.classList.remove(classToRemove);
}

function createTables() {
    loadApps();
    loadGames();
    loadImgTools();
}

function activateTabs() {
    var tabs = document.querySelectorAll(".ui.top.attached.tabular.menu .item");

    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs[i];
        tab.addEventListener("click", function () {
            var activeTab = document.querySelector(".ui.top.attached.tabular.menu .active.item");
            var activeContent = document.querySelector(".ui.bottom.attached.active.tab.segment");

            removeClass(activeTab, "active");
            addClass(this, "active");

            removeClass(activeContent, "active");
            var contentToActivate = document.querySelectorAll("[data-tab='" + this.dataset.tab + "']")[1];
            addClass(contentToActivate, "active");
        });
    }
}

function setupAnchors() {
    var anchors = document.getElementsByTagName("a");

    for (var j = 0; j < anchors.length; j++) {
        const anchor = anchors[j];
        anchor.onclick = function () {
            chrome.tabs.create({url: anchor.href})
        };
    }
}

function setupLogInOutButton() {
    var logInOutButton = document.getElementById("log-in-out-button");
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        if (backgroundPage.userIsLoggedIn) {
            logInOutButton.innerText = "Log out";
            addClass(logInOutButton, "negative");
            logInOutButton.href = DOMAIN + "/logout/";
        } else {
            logInOutButton.innerText = "Log in";
            addClass(logInOutButton, "primary");
            logInOutButton.href = DOMAIN + "/login/";
        }
        setupAnchors();
    });
}

function firstThingsFirst() {
    createTables();
    activateTabs();
    setupLogInOutButton();
}

document.addEventListener("DOMContentLoaded", function () {
    loadItems(firstThingsFirst);
});
