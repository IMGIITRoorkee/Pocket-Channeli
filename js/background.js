/* This script runs in the background from when the app is loaded */

var NET_CHECK_DOMAIN = "http://info.cern.ch/";
var DOMAIN = "https://channeli.in";
var HOST = "channeli.in";

var isUserLoggedIn = undefined;
var isNetworkConnected = false;

/**
 * Check session if the changed tab was one of Channel-i
 * @param tabId - the ID of the tab that is changing or has changed
 * @param changeInfo - whether the tab is changing or has changed
 * @param tab - the tab that is changing or has changed
 */
function updateListener(tabId, changeInfo, tab) {
    var url = tab.url;
    if (url !== undefined && changeInfo.status === "complete") {
        var host = getHostName(url);
        if (host == HOST) {
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
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            var response = JSON.parse(httpRequest.responseText);
            var userType = response.userType;
            if (userType == 0) {
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
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
    /*
     $.get(url, function (data) {
     var userType = data.userType;
     if (userType == 0) {
     // Logged in
     isUserLoggedIn = true;
     chrome.browserAction.setIcon({path: "../images/icon_active.png"});
     } else {
     // Not logged in
     isUserLoggedIn = false;
     chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
     }
     });
     */
}

/** Check if the user is connected to the Internet by contacting the CERN webpage */
function checkNetConnection() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            if (!isNetworkConnected) {
                checkSession();
                isNetworkConnected = true;
            }
        } else {
            isNetworkConnected = false;
            chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
        }
    };
    httpRequest.open("GET", NET_CHECK_DOMAIN, true);
    httpRequest.send();
    /*
     $.get(NET_CHECK_DOMAIN, {}, function () {
     if (!isNetworkConnected) {
     checkSession();
     isNetworkConnected = true;
     }
     }).fail(function () {
     isNetworkConnected = false;
     chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
     });
     */
}

// Add the listener for tab updates
chrome.tabs.onUpdated.addListener(updateListener);

// Check session once when the browser is launched
checkSession();


