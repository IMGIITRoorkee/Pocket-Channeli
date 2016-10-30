/* popup.js - Script to handle the popup */

$(document).ready(function () {
    var DOMAIN = "https://channeli.in";
    var HOST = "channeli.in";

    /**
     * Get the host name from a given URL
     * @param href the URL taken from the address bar
     * @returns {string} hostname - the host name extracted from the URL
     */
    var getHostName = function (href) {
        var l = document.createElement("a");
        l.href = href;
        return l.hostname;
    };

    /** 0 implies 'not logged in' and 1 implies 'logged in' */
    var userStatus = 0;

    /** Check if the user is logged in by performing a request on the LecTut API */
    var checkSession = function () {
        var url = DOMAIN + "/lectut_api/";
        $.get(url, function (data) {
            $("#loader").hide();
            var userType = data.userType;
            if (userType === 0) {
                // Logged in
                var user__username = data.user.username;
                var user__name = data.user.name;
                var user__photo = data.user.photo;
                // Update the popup view
            } else {
                // Not logged in
                // Update the popup view
            }
        }).fail(function () {
            // Failure
            // Update the popup view
        });
    };
    checkSession();

    // Log the user out
    $("#logout_button").on("click", function () {
        var url = DOMAIN + "/logout/";
        $.get(url, function () {
            userStatus = 0;
            chrome.tabs.query({}, function (tabs) {
                var tabsToReload = [];
                for (var i = 0; i < tabs.length; i++) {
                    if (getHostName(tabs[i].url) == HOST) {
                        tabsToReload.push(tabs[i].id);
                    }
                }
                for (var j = 0; j < tabsToReload.length; j++) {
                    chrome.tabs.reload(tabsToReload[j]);
                }
            });
            chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
            // Update the popup view
        });
    });

    // Load the login page
    $("#login_button").on("click", function () {
        chrome.tabs.create({url: DOMAIN + "/login/"});
        return false;
    });
});

