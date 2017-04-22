function loadImgTools() {
    if (imgTools === undefined) {
        document.getElementById("img-tools-tab").style.display = "none";
        document.getElementById("img-tools-content").style.display = "none";
        return;
    }
    var length = imgTools.length;
    var imgTool, item, items = [];
    for (var i = 0; i < length; i++) {
        imgTool = imgTools[i];
        item = {
            "icon": DOMAIN + ":8080/static/images/nucleus/imgtools/" + imgTool.icon,
            "name": imgTool.name,
            "href": imgTool.url
        };
        items.push(item);
    }
    populateTable('img-tools-tbody', items);
}