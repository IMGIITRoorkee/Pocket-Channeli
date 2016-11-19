function App(name, logo, href) {
    this.title = name;
    this.logo = logo;
    this.href = href;
}

var apps = {
    buysell: new App("Buy & Sell", "buysell", "buyandsell"),
    downloadsoftware: new App("Download Software", "downloadsoftware", "softwares"),
    kriti: new App("Kriti", "kriti", "kriti"),
    lectut: new App("LecTut", "lectut", "lectut"),
    lostfound: new App("Lost & Found", "lostfound", "lostfound"),
    messmenu: new App("Mess Menu", "messmenu", "messmenu"),
    noticeboard: new App("Notice Board", "noticeboard", "notices"),
    placement: new App("Placement Online", "placement", "placement"),
    pplsearch: new App("People Search", "pplsearch", "peoplesearch"),
    research: new App("Research Assistant", "research", "research_assistant"),
    shp: new App("Student Home Page", "shp", "SHP"),
    thinktank: new App("Thinktank", "thinktank", "thinktank")
};
//examsonline: new App("Exams Online", "examsonline", ""),
//grades: new App("Grades", "grades", ""),
//questionairre: new App("Questionairre", "questionairre", ""),
//regol: new App("Regol", "regol", ""),
//vle: new App("VLE", "vle", "")

document.addEventListener("DOMContentLoaded", function () {
    var DOMAIN = "https://channeli.in/";

    var linksTableBody = document.getElementById("links-table-body");
    var count = 0;
    var length = Object.keys(apps).length;
    var content = "";
    for (var key in apps) {
        var app = apps[key];
        count++;
        if (count % 2 === 1) {
            content = content +
                '<tr>' +
                '<td class="selectable">' +
                '<a href="' + DOMAIN + app.href + '">' +
                '<img src="images/' + app.logo + '.png" alt="App logo" class="ui app-icon image">' +
                '<span class="app-name">' + app.title + '</span>' +
                '</a>' +
                '</td>';
            if (count === length) {
                content = content +
                    '<td></td>' +
                    '</tr>';
                linksTableBody.innerHTML += content;
                content = "";
            }
        } else {
            content = content +
                '<td class="selectable">' +
                '<a href="' + DOMAIN + app.href + '">' +
                '<img src="images/' + app.logo + '.png" alt="App logo" class="ui app-icon image">' +
                '<span class="app-name">' + app.title + '</span>' +
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
});