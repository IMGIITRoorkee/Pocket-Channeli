/* popup.js - Script to handle the popup */

var DOMAIN = "https://channeli.in";
var HOST = "channeli.in";

var loader = document.getElementById("loader");
var main = document.getElementById("main");

/**
 * Set the CSS display property to 'none' to make the item invisible
 * @param item - the item to be made invisible
 */
function setDisplayNone(item) {
    item.style.display = "none";
}

/**
 * Set the CSS display property to 'block' to make the item visisble
 * @param item - the item to be made visible
 */
function setDisplayBlock(item) {
    item.style.display = "block";
}

function loadCard(userName, userUsername, userPhoto) {
    var userPhotoImg = document.getElementById("user-photo");
    var logButton = document.getElementById("log-button");
    document.getElementById("user-name").innerText = userName;
    document.getElementById("user-username").innerText = userUsername;
    if (userPhoto === "~") {
        setDisplayNone(userPhotoImg);
        logButton.innerHTML = '<i class="sign in icon"></i>Log in';
        logButton.className += " blue";
        logButton.addEventListener("click", loginListener);
    } else {
        logButton.innerHTML = '<i class="sign out icon"></i>Log out';
        logButton.className += " negative";
        logButton.addEventListener("click", logoutListener);
        userPhotoImg.src = userPhoto;
        userPhotoImg.alt = userName;
    }
}

/** Check if the user is logged in by performing a request on the LecTut API */
function checkSessionAndLoad() {
    var url = DOMAIN + "/lectut_api/";
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            setDisplayNone(loader);
            var response = JSON.parse(httpRequest.responseText);
            console.log(response);
            var userType = response.userType;
            console.log(userType);
            var userUsername, userName, userPhoto;
            if (userType == 0) {
                // Logged in
                chrome.browserAction.setIcon({path: "../images/icon_active.png"});
                // Update the popup view
                userUsername = response.user.username;
                userName = response.user.name;
                userPhoto = DOMAIN + response.user.photo;
                setDisplayBlock(main);
                loadCard(userName, userUsername, userPhoto);
            } else {
                // Not logged in
                chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
                // Update the popup view
                userUsername = "IMG, IIT Roorkee";
                userName = "Channel i";
                userPhoto = "~";
                setDisplayBlock(main);
                loadCard(userName, userUsername, userPhoto);
            }
        } else {
            // Failure
            chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
            // Update the popup view
            setDisplayBlock(loader);
            setDisplayNone(main);
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/** Take the user to the Channel-i login when the login button is clicked */
function loginListener() {
    chrome.tabs.create({url: DOMAIN + "/login/"});
}

/** Send a GET request to the logout endpoint which invalidates the session */
function logoutListener() {
    var url = DOMAIN + "/logout/";
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            chrome.tabs.query({}, function (tabs) {
                var tabsToReload = [];
                for (var i = 0; i < tabs.length; i++) {
                    if (chrome.extension.getBackgroundPage().getHostName(tabs[i].url) == HOST) {
                        tabsToReload.push(tabs[i].id);
                    }
                }
                for (var j = 0; j < tabsToReload.length; j++) {
                    chrome.tabs.reload(tabsToReload[j]);
                }
            });
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
    window.location.reload(true);
}

document.addEventListener("DOMContentLoaded", function () {
    checkSessionAndLoad();
});

