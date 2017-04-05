var DOMAIN = "https://channeli.in";

function addClass(element, classToAdd) {
    element.classList.add(classToAdd);
}

function removeClass(element, classToRemove) {
    element.classList.remove(classToRemove);
}

function createTables() {
    loadApps();
    loadGames();
    loadImgTools();
}

function activateTabs() {
    var tabs = document.querySelectorAll(".ui.top.attached.tabular.menu .item");

    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs[i];
        tab.addEventListener("click", function () {
            var activeTab = document.querySelector(".ui.top.attached.tabular.menu .active.item");
            var activeContent = document.querySelector(".ui.bottom.attached.active.tab.segment");

            removeClass(activeTab, "active");
            addClass(this, "active");

            removeClass(activeContent, "active");
            var contentToActivate = document.querySelectorAll("[data-tab='" + this.dataset.tab + "']")[1];
            addClass(contentToActivate, "active");
        });
    }
}

function firstThingsFirst() {
    loadItems(createTables);
    activateTabs();
}

document.addEventListener("DOMContentLoaded", function () {
    firstThingsFirst();
});
