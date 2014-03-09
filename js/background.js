$(document).ready(function(){	

		var Domain = "https://channeli.in";
		var Host = "channeli.in";

		var getDomainName = function (href) {
		var l = document.createElement("a");
		l.href = href;
		return l.hostname;
		}

		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
			var tab_url = tab.url;
			var domain = getDomainName(tab_url);
			if (tab_url !== undefined && changeInfo.status == "complete") {
			if(domain == Host) {
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
			}
			}); 

});
