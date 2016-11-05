/* popup.js - Script to handle the popup */

var DOMAIN = "https://channeli.in";
var HOST = "channeli.in";

var loader = document.getElementById("loader");
var login = document.getElementById("login");
var main = document.getElementById("main");

/**
 * Set the CSS divsplay property to 'none' to make the div invisible
 * @param div - the div to be made invisible
 */
function setDisplayNone(div) {
    div.style.display = 'none';
}

/**
 * Set the CSS display property to 'block' to make the div visisble
 * @param div - the div to be made visible
 */
function setDisplayBlock(div) {
    div.style.display = 'block';
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
            if (userType == 0) {
                // Logged in
                chrome.browserAction.setIcon({path: "../images/icon_active.png"});
                // Update the popup view
                var userUsername = response.user.username;
                var userName = response.user.name;
                var userPhoto = response.user.photo;
                setDisplayNone(login);
                setDisplayBlock(main);

                var userPhotoImg = document.getElementById("user-photo");
                document.getElementById("user-name").innerText = userName;
                document.getElementById("user-username").innerText = userUsername;
                userPhotoImg.src = DOMAIN + userPhoto;
                userPhotoImg.alt = userName;
            } else {
                // Not logged in
                chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
                // Update the popup view
                setDisplayBlock(login);
                setDisplayNone(main);
            }
        } else {
            // Failure
            chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
            // Update the popup view
            setDisplayBlock(login);
            setDisplayNone(main);
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
    /*
     $.get(url, function (data) {
     loader.hide();
     var userType = data.userType;
     if (userType == 0) {
     // Logged in
     chrome.browserAction.setIcon({path: "../images/icon_active.png"});
     // Update the popup view
     var userUsername = data.user.username;
     var userName = data.user.name;
     var userPhoto = data.user.photo;
     login.hide();
     main.show();

     var $userPhoto = $("#user-photo");
     $("#user-name").html(userName);
     $("#user-username").html(userUsername);
     $userPhoto.attr("src", DOMAIN + userPhoto);
     $userPhoto.attr("alt", userName);
     } else {
     // Not logged in
     chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
     // Update the popup view
     login.show();
     main.hide();
     }
     }).fail(function () {
     // Failure
     chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
     // Update the popup view
     login.show();
     main.hide();
     });
     */
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
            chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
            // Update the popup view
            setDisplayNone(loader);
            setDisplayBlock(login);
            setDisplayNone(main);
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

document.addEventListener("DOMContentLoaded", function () {
    setDisplayNone(login);
    setDisplayNone(main);

    checkSessionAndLoad();

    // Load the login page
    var loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", loginListener);

    // Log the user out
    var logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", logoutListener);
});

