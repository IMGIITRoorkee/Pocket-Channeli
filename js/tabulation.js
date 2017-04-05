function populateTable(table_id, items) {
    console.log(table_id);
    var tableBody = document.getElementById(table_id);
    var length = items.length;
    var content = "";

    if (length % 2 === 1) {
        item = {
            "icon": "",
            "name": "",
            "href": ""
        };
        items.push(item);
    }

    for (var i = 0; i < length; i++) {
        var item = items[i];

        var icon = item["icon"];
        var name = item["name"];
        var href = item["href"];

        if (i % 2 === 0) {
            // Left side item
            content = "";
            content = content + "" +
                "<tr>\n    " +
                "<td class=\'selectable\'>\n        " +
                "<a href=\'" + href + "\'>\n            " +
                "<img src=\'" + icon + "\' class=\'ui image app-icon\'>\n            " +
                "<span class=\'app-name\'>" + name + "</span>\n        " +
                "</a>\n    " +
                "</td>\n";
        }
        else {
            // Right side item
            content = content + "" +
                "<td class=\'selectable\'>\n        " +
                "<a href=\'" + href + "\'>\n            " +
                "<img src=\'" + icon + "\' class=\'ui image app-icon\'>\n            " +
                "<span class=\'app-name\'>" + name + "</span>\n        " +
                "</a>\n    " +
                "</td>\n" +
                "</tr>";
            tableBody.innerHTML += content;
        }
    }

    var anchors = document.getElementsByTagName("a");

    for (var j = 0; j < anchors.length; j++) {
        const anchor = anchors[j];
        anchor.addEventListener("click", function () {
            chrome.tabs.create({url: anchor.href})
        });
    }
}