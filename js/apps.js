function App(name, logo, href) {
    this.title = name;
    this.logo = logo;
    this.href = href;
}

var DOMAIN = "https://channeli.in/";

buysell = new App("Buy & Sell", "buysell", "buyandsell");
downloadsoftware = new App("Download Software", "downloadsoftware", "softwares");
//examsonline = new App("Exams Online", "examsonline", "");
//grades = new App("Grades", "grades", "");
kriti = new App("Kriti", "kriti", "kriti");
lectut = new App("LecTut", "lectut", "lectut");
lostfound = new App("Lost & Found", "lostfound", "lostfound");
messmenu = new App("Mess Menu", "messmenu", "messmenu");
noticeboard = new App("Notice Board", "noticeboard", "notices");
placement = new App("Placement Online", "placement", "placement");
pplsearch = new App("People Search", "pplsearch", "peoplesearch");
//questionairre = new App("Questionairre", "questionairre", "");
//regol = new App("Regol", "regol", "");
research = new App("Research Assistant", "research", "research_assistant");
shp = new App("Student Home Page", "shp", "SHP");
thinktank = new App("Thinktank", "thinktank", "thinktank");
//vle = new App("VLE", "vle", "");

var apps = [
    buysell,
    downloadsoftware,
    //examsonline,
    //grades,
    kriti,
    lectut,
    lostfound,
    messmenu,
    noticeboard,
    placement,
    pplsearch,
    //questionairre,
    //regol,
    research,
    shp,
    thinktank
    //vle
];

$(document).ready(function () {
    var items = apps.length;
    var rows = (items % 2 == 0) ? items / 2 : (items + 1) / 2;
    var $linksTableBody = $("#links-table-body");
    for (var i = 0; i < rows; i++) {
        var content = '<tr>'
            + '<td class="selectable">'
            + '<a href="' + DOMAIN + apps[2 * i].href + '">'
            + '<img src="images/' + apps[2 * i].logo + '.png" alt="App logo" class="ui left floated app-icon image">'
            + '<span class="app_name">' + apps[2 * i].title + '</span>'
            + '</a>'
            + '</td>';
        if (2 * i + 1 !== apps.length) {
            content = content
                + '<td class="selectable">'
                + '<a href="' + DOMAIN + apps[2 * i + 1].href + '">'
                + '<img src="images/' + apps[2 * i + 1].logo + '.png" alt="App logo" class="ui left floated app-icon image">'
                + '<span class="app_name">' + apps[2 * i + 1].title + '</span>'
                + '</a>'
                + '</td>'
        } else {
            content = content
                + '<td></td>';
        }
        content = content + '</tr>';
        $linksTableBody.html($linksTableBody.html() + content);
    }
    $("body").on("click", "a", function () {
        chrome.tabs.create({url: $(this).attr("href")});
        return false;
    });
});