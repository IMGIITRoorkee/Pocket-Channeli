$(document).ready(function(){	

  var Domain = "https://channeli.in";
  var Host = "channeli.in"

  /* Extracts Domain name from the url */
  var getDomainName = function (href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
  }
  
  //var NetworkStatus = 0; /* 0 - offline, 1 - online */
  var UserStatus = 0; /* 0 - not logged in, 1 - logged in */


  /**** Checks Network Connection Status ****/
  /*
  var checkNetConnection = function() {
    $.get(Domain, {}, function(res){
      if(NetworkStatus == 0) {
        checkSession();
        NetworkStatus = 1;
      }
    })
    .fail( function(res) {
      NetworkStatus = 0;
      $("#loader").hide();
      
      if(UserStatus == 1) {  // If user is loggedin and connection error has occured.
        $("#user_box").show();
      }
      else
        $("#login").show();
      
      // NOTE: No need to load apps_content into main b'coz it's already 
      //  loaded at .failure of GET'/chrome-ext/check-cache/'
      $("#message").show();
      var msg = "Network connection error!";
      $("#message").html("<p>" + msg + "</p>");
      $("#main").show();
      chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
    });
  }
  */

  var checkSession = function() {
  var url = Domain + "/check-session/"; 
  $.post(url, function(res){
    $("#loader").hide();
    if(res.msg == "YES")
    {
      UserStatus = 1;
      $("#login").hide();
      $("#message").hide();
      $("#user_box").show();
      $("#main").show();
      $("#profile_box").html("<div id='profile_pic_box'><img src='"+ Domain + res.photo + "' alt='pic' class='profile_pic'/></div>"+ 
        "<div id='user_name_box'><p id='user_name'>" + res._name + "</p> <p id='user_info'>" + res.info + "</p>");
      chrome.browserAction.setIcon({path: "../images/icon_active.png"});
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
  })
  .fail( function(res) {
    console.log("Error occured while fetching data-1-3!");
    $("#loader").hide();
    /* NOTE: No need to load apps_content into main b'coz it's already 
       loaded at .failure of GET'/chrome-ext/check-cache/' */
    var msg = "Network connection error!";
    $("#message").html("<p>" + msg + "</p>");
    $("#login").show();
    $("#main").show();
    chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
  });
}

  if(typeof localStorage['cache_key'] == 'undefined') {
    $.get(Domain + '/chrome-ext/check-cache/', {}, function(res){
      if(!(res == 'FAILURE')) {
        $('#main').html(res);
        var new_key = $('input[name="cache_key"]').val();
        if(!(new_key == 'undefined')) {
          localStorage['cache_key'] = new_key;
          localStorage['apps_content'] = res;
        }
      }
      else {
        /* Fetch data from localstorage */
        console.log("Error occured while fetching data!");
        var html_content = localStorage['apps_content'];
        $('#main').html(html_content);
      }
    })
    .fail( function(res) {
      /* Fetch data from localstorage */
      console.log("Error occured while fetching data!");
      var html_content = localStorage['apps_content'];
      $('#main').html(html_content);
    });
  }
  else {
    $.get( Domain + '/chrome-ext/check-cache/', {'cache_key': localStorage['cache_key']}, function(res){
      console.log("success!!");
      if(!(res == 'FAILURE')) {
        if(typeof res.cache_key == 'undefined') {
          $('#main').html(res);
          var new_key = $('input[name="cache_key"]').val();
          if(!(typeof new_key == 'undefined')) {
            localStorage['cache_key'] = new_key;
            localStorage['apps_content'] = res;
          }
        }
        else {
          /* Fetch data from localstorage */
          console.log("Already have updated version!");
          var html_content = localStorage['apps_content'];
          $('#main').html(html_content);
        }
      }
      else {
        /* Fetch data from localstorage */
        console.log("Error occured while fetching data!");
        var html_content = localStorage['apps_content'];
        $('#main').html(html_content);
      }
    })
    .fail( function(res) {
      /* Fetch data from localstorage */
      console.log("Error occured while fetching data!");
      var html_content = localStorage['apps_content'];
      $('#main').html(html_content);
    });
  }

  /* Checks the user's loggedin status */
  checkSession();

  $("#logout_btn").on("click", function(){
    var url = Domain + "/logout-user/";
    $.post(url, function(res){
      if(res.msg == "OK")
      {
        UserStatus = 0;
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
        chrome.browserAction.setIcon({path: "../images/icon_inactive.png"});
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
        UserStatus = 1
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
        chrome.browserAction.setIcon({path: "../images/icon_active.png"});
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

//setInterval(checkNetConnection, 4000);
});


