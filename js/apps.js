var DOMAIN = "https://channeli.in/";

var img_tools, apps, games;

function syncItems(callback) {
    var url = DOMAIN + "/get_links/";
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                setDisplayNone(loader);
                var response = JSON.parse(httpRequest.responseText);
                img_tools = response.img_tools;
                games = response.games;
                apps = response.apps;
                chrome.storage.local.set({
                    "img_tools": img_tools,
                    "apps": apps,
                    "games": games
                }, function () {
                    if (chrome.runtime.lastError === undefined) {
                        callback();
                    } else {
                        // Failure
                        console.log("Local storage set failed");
                    }
                })
            } else {
                // Failure
                console.log("Request to sync items failed");
            }
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function loadItems(callback) {
    chrome.storage.local.get(["img_tools", "apps", "games"], function (items) {
        if (chrome.runtime.lastError === undefined && Object.keys(items).length !== 0) {
            img_tools = items["img_tools"];
            apps = items["apps"];
            games = items["games"];
            callback();
        } else {
            console.log("Local storage get failed");
            syncItems(callback);
        }
    });
}

function domContentLoaded() {
    var linksTableBody = document.getElementById("links-table-body");
    var length = apps.length;
    var content = "";
    for (var count = 0; count < length; count++) {
        app = apps[count];
        var app_icon = app[0];
        var app_name = app[1].name;
        var app_url = app[1].url;
        if (!app_url.includes('://')) {
            // Relative URL must be converted to absolute URL
            app_url = DOMAIN + app_url;
        }
        if (count % 2 === 0) {
            content = content +
                '<tr>' +
                '<td class="selectable">' +
                '<a href="' + app_url + '">' +
                '<img src="https://channeli.in:8080/static/images/nucleus/app-icons/' + app_icon + '.png" alt="App logo" class="ui app-icon image">' +
                '<span class="app-name">' + app_name + '</span>' +
                '</a>' +
                '</td>';
            if (count === length - 1) {
                content = content +
                    '<td></td>' +
                    '</tr>';
                linksTableBody.innerHTML += content;
                content = "";
            }
        } else {
            content = content +
                '<td class="selectable">' +
                '<a href="' + app_url + '">' +
                '<img src="https://channeli.in:8080/static/images/nucleus/app-icons/' + app_icon + '.png" alt="App logo" class="ui app-icon image">' +
                '<span class="app-name">' + app_name + '</span>' +
                '</a>' +
                '</td>' +
                '</tr>';
            linksTableBody.innerHTML += content;
            content = "";
        }
    }
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        anchor.addEventListener("click", function () {
            chrome.tabs.create({url: anchor.href})
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadItems(domContentLoaded);
});