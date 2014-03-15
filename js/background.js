/* This script runs in the background from when the app is loaded */

var Domain = "https://channeli.in";
var Host = "channeli.in";

var getDomainName = function (href) {
  var l = document.createElement("a");
  l.href = href;
  return l.hostname;
}

var checkSession = function() {
  var url = Domain + "/check-session/";
  $.post(url, function(res){
    if(res.msg == "YES") {
      chrome.browserAction.setIcon({path: "../images/icon_active.png"});	
    }
    else if(res.msg == "NO") {
      chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
    }
  });
}

// This is to handle the status updation when the app is "loaded" or "refreshed". 
checkSession(); 

/* Updates the status especially when the 'channeli.in' tabs are updated */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var tab_url = tab.url;
  var domain = getDomainName(tab_url);
  if (tab_url !== undefined && changeInfo.status == "complete") {
    if(domain == Host) {
      checkSession();
      /*
      chrome.tabs.query({}, function (tabs) {
          var _tabs = [];
          for (var i = 0; i < tabs.length; i++) {
            if(getDomainName(tabs[i].url) == Host)
            {
              if(tabs[i].id == tabId) continue; 
              else {
                _tabs.push(tabs[i].id);
              }
            }
          }
          for(var j = 0; j < _tabs.length; j++)
          {
            
            chrome.tabs.reload(_tabs[j]);
          }
      });
      */
    }
  }
}); 

var NetworkStatus = 0; /* 0 - offline, 1 - online */

  /* Checks Network Connection Status */
  var checkNetConnection = function() {
    $.get(Domain, {}, function(res){
      if(NetworkStatus == 0) {
        checkSession();
        NetworkStatus = 1;
      }
    })
    .fail( function(res) {
      NetworkStatus = 0;
      chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
    });
  }

/* Checks the network status per every 2 seconds */
setInterval(checkNetConnection, 3000);


