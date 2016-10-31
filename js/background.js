/* This script runs in the background from when the app is loaded */

var NET_CHECK_DOMAIN = "http://info.cern.ch/";
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

/** Check if the user is logged in by performing a request on the LecTut API */
var checkSession = function () {
    var url = DOMAIN + "/lectut_api/";
    $.get(url, function (data) {
        var userType = data.userType;
        if (userType == 0) {
            // Logged in
            chrome.browserAction.setIcon({path: "../images/icon_active.png"});
        } else {
            // Not logged in
            chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
        }
    });
};
checkSession();

/** Updates the status especially when the 'channeli.in' tabs are updated */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var tab_url = tab.url;
    var domain = getHostName(tab_url);
    console.log(domain);
    if (tab_url !== undefined && changeInfo.status == "complete") {
        if (domain == HOST) {
            checkSession();
        }
    }
});

/** 0 implies 'not connected' and 1 implies 'connected' */
var networkStatus = 0;
var checkNetConnection = function () {
    $.get(NET_CHECK_DOMAIN, {}, function () {
        if (networkStatus == 0) {
            checkSession();
            networkStatus = 1;
        }
    }).fail(function (res) {
        networkStatus = 0;
        chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
    });
};

/** Checks the network status per every 3 seconds */
setInterval(checkNetConnection, 3000);


