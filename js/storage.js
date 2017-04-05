var imgTools, apps, games;

function syncItems(callback) {
    var url = DOMAIN + "/get_links/";
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var response = JSON.parse(httpRequest.responseText);
                imgTools = response.img_tools;
                games = response.games;
                apps = response.apps;
                chrome.storage.local.clear();
                chrome.storage.local.set({
                    "imgTools": imgTools,
                    "apps": apps,
                    "games": games
                }, function () {
                    if (chrome.runtime.lastError === undefined) {
                        if (callback !== undefined) {
                            loadItems(callback);
                        }
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
    chrome.storage.local.get(["imgTools", "apps", "games"], function (items) {
        if (chrome.runtime.lastError === undefined && Object.keys(items).length !== 0) {
            imgTools = items["imgTools"];
            apps = items["apps"];
            games = items["games"];
            if (callback !== undefined) {
                callback();
            }
        } else {
            console.log("Local storage get failed");
            syncItems(callback);
        }
    });
}