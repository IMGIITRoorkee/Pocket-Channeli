/* popup.js - Script to handle the popup */

var DOMAIN = "https://channeli.in";
var HOST = "channeli.in";

var $loader = $("#loader");
var $login = $("#login");
var $main = $("#main");

/** Check if the user is logged in by performing a request on the LecTut API */
function checkSessionAndLoad() {
    var url = DOMAIN + "/lectut_api/";
    $.get(url, function (data) {
        $loader.hide();
        var userType = data.userType;
        if (userType == 0) {
            // Logged in
            chrome.browserAction.setIcon({path: "../images/icon_active.png"});
            // Update the popup view
            var userUsername = data.user.username;
            var userName = data.user.name;
            var userPhoto = data.user.photo;
            $login.hide();
            $main.show();

            var $userPhoto = $("#user-photo");
            $("#user-name").html(userName);
            $("#user-username").html(userUsername);
            $userPhoto.attr("src", DOMAIN + userPhoto);
            $userPhoto.attr("alt", userName);
        } else {
            // Not logged in
            chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
            // Update the popup view
            $login.show();
            $main.hide();
        }
    }).fail(function () {
        // Failure
        chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
        // Update the popup view
        $login.show();
        $main.hide();
    });
}

$(document).ready(function () {
    $login.hide();
    $main.hide();

    checkSessionAndLoad();

    // Log the user out
    $("#logout-button").on("click", function () {
        var url = DOMAIN + "/logout/";
        $.get(url, function () {
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
            $loader.hide();
            $login.show();
            $main.hide();
        });
    });

    // Load the login page
    $("#login-button").on("click", function () {
        chrome.tabs.create({url: DOMAIN + "/login/"});
        return false;
    });
});

