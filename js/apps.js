function loadApps() {
    var length = apps.length;
    var app, item, items = [];
    for (var i = 0; i < length; i++) {
        app = apps[i];
        if (!app[1].url.includes("://")) {
            app[1].url = DOMAIN + app[1].url;
        }
        item = {
            "icon": DOMAIN + ":8080/static/images/nucleus/app-icons/" + app[0] + ".png",
            "name": app[1].name,
            "href": app[1].url
        };
        items.push(item);
    }
    populateTable('apps-tbody', items);
}