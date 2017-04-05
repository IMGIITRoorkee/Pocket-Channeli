function loadGames() {
    var length = games.length;
    var game, item, items = [];
    for (var i = 0; i < length; i++) {
        game = games[i];
        item = {
            "icon": DOMAIN + ":8080/static/images/games/icons/" + game[0] + ".png",
            "name": game[1].name,
            "href": DOMAIN + "/games/" + game[1].url
        };
        items.push(item);
    }
    populateTable('games-tbody', items);
}