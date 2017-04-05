/* This script runs in the background from when the app is loaded */

var DOMAIN = "https://channeli.in";
var HOST = "channeli.in";

var isUserLoggedIn = undefined;

/**
 * Check session if the changed tab was one of Channel-i
 * @param ignore - the ID of the tab that is changing or has changed
 * @param changeInfo - whether the tab is changing or has changed
 * @param tab - the tab that is changing or has changed
 */
function updateListener(ignore, changeInfo, tab) {
    var url = tab.url;
    if (url !== undefined && changeInfo.status === "complete") {
        var host = getHostName(url);
        if (host === HOST) {
            checkSession();
        }
    }
}

/**
 * Get the host name from a given URL
 * @param href - the URL taken from the address bar
 * @returns {string} hostname - the host name extracted from the URL
 */
function getHostName(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
}

/** Check if the user is logged in by performing a request on the LecTut API */
function checkSession() {
    var oldUserStatus = isUserLoggedIn;
    var url = DOMAIN + "/lectut_api/";
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var response = JSON.parse(httpRequest.responseText);
                var userType = response.userType;
                if (userType === "0") {
                    // Logged in
                    isUserLoggedIn = true;
                    chrome.browserAction.setIcon({path: "../images/icon_active.png"});
                } else {
                    // Not logged in
                    isUserLoggedIn = false;
                    chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
                }
            } else {
                // Not logged in
                isUserLoggedIn = false;
                chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
            }
            if (oldUserStatus !== isUserLoggedIn) {
                syncItems();
                chrome.tabs.query({}, function (tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        if (chrome.extension.getBackgroundPage().getHostName(tabs[i].url) === HOST) {
                            chrome.tabs.reload(tabs[i].id, {bypassCache: true});
                        }
                    }
                });
            }
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

// Add the listener for tab updates
chrome.tabs.onUpdated.addListener(updateListener);

// Check session once when the browser is launched and then after every minute
chrome.alarms.create("checkSessionAlarm", {when: Date.now(), periodInMinutes: 1});
chrome.alarms.onAlarm.addListener(function () {
    checkSession();
});


