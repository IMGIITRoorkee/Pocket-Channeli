$(document).ready(function(){	

  var Domain = "https://channeli.in";
  var Host = "channeli.in"
  
  var getDomainName = function (href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
  }
  
  var url = Domain + "/check-session/";
  
  $.post(url, function(res){
    $("#loader").hide();
    if(res.msg == "YES")
    {
      $("#login").hide();
      $("#message").hide();
      $("#user_box").show();
      $("#main").show();
      $("#profile_box").html("<div id='profile_pic_box'><img src='"+ Domain + res.photo + "' alt='pic' class='profile_pic'/></div>"+ 
        "<div id='user_name_box'><p id='user_name'>" + res._name + "</p> <p id='user_info'>" + res.info + "</p>");
      chrome.browserAction.setIcon({path: "../images/vle.png"});
    }
    else if(res.msg == "NO")
    {
      $("#message").hide();
      $("#user_box").hide();
      $("#login").show();
      $("#main").show();
    }
    else if(res.msg == "FAILURE")
    {
      $("#user_box").hide();
      $("#message").show();
      var msg = "Invalid request!";
      $("#message").html("<p>" + msg + "</p>");
      $("#login").show();
      $("#main").show();
    }
    else{
      $("#login").hide();
      $("#user_box").hide();
      $("#message").show();
      var msg = "Error occured!";
      $("#message").html("<p>" + msg + "</p>");
      $("#main").show();
    }
  });
  
$("#logout_btn").on("click", function(){
  var url = Domain + "/logout-user/";
  $.post(url, function(res){
    if(res.msg == "OK")
    {
      $("#message").hide();
      $("#user_box").hide();
      $("#login").show();
      $("#main").show();
      $("#username_field").val('');
      $("#password_field").val('');

      chrome.tabs.query({}, function (tabs) {
        var _tabs = [];
        for (var i = 0; i < tabs.length; i++) {
          if(getDomainName(tabs[i].url) == Host)
          {
            _tabs.push(tabs[i].id);
          }
        }
        for(var j = 0; j < _tabs.length; j++)
        {
          chrome.tabs.reload(_tabs[j]);
        }
      });
      chrome.browserAction.setIcon({path: "../images/icon48.png"});
    }
    else if(res.msg == "FAILURE")
    {
      $("#message").hide();
      $("#user_box").hide();
      $("#login").show();
      $("#main").show();
    }
    else{
      $("#login").hide();
      $("#user_box").hide();
      $("#message").show();
      var msg = "Error occured!";
      $("#message").html("<p>" + msg + "</p>");
      $("#main").show();
    }
  });
});

$("#login_form").submit(function(e){
  e.preventDefault();
  var url = Domain + "/check-login/";
  var data = $("#login_form").serialize();
  $.post(url, data, function(res){
    if(res.msg == "YES")
    {
      $("#login").hide();
      $("#message").hide();
    	$("#user_box").show();
    	$("#profile_box").html("<div id='profile_pic_box'><img src='"+ Domain + res.photo + "' alt='pic' class='profile_pic'/></div>"+ 
          "<div id='user_name_box'><p id='user_name'>" + res._name + "</p> <p id='user_info'>" + res.info + "</p>");
      $("#main").show();
     
      chrome.tabs.query({}, function (tabs) {
        var _tabs = [];
        for (var i = 0; i < tabs.length; i++) {
          if(getDomainName(tabs[i].url) == Host)
          {
            _tabs.push(tabs[i].id);
          }
        }
        for(var j = 0; j < _tabs.length; j++)
        {
          chrome.tabs.reload(_tabs[j]);
        }
      });
      chrome.browserAction.setIcon({path: "../images/vle.png"});
    }
    else if(res.msg == "NO")
    {
      $("#user_box").hide();
      var msg = "Invalid Username or Password!";
      $("#message").show();
      $("#message").html("<p>" + msg + "</p>");
      $("#login").show();
      $("#main").show();
    }
    else if(res.msg == "FAILURE")
    {
      $("#user_box").hide();
      var msg = "Invalid request!";
      $("#message").show();
      $("#message").html("<p>" + msg + "</p>");
      $("#login").show();
      $("#main").show();
    }
  });
});

});

