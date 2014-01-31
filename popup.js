$(document).ready(function(){	

	function getCookies(domain, name) {
		chrome.cookies.get({url: domain, name: name}, function(cookie){  
		  if(cookie){
		    return cookie.value;
		  }
		  else{
		    return "NOCOOKIE";
		  }  
	 });
	}

	/*
	var sid = ""
	var X_token = ""
	chrome.cookies.get({url:"http://localhost:8000", name: "sessionid"}, function(cookie){  
		  if(cookie){
		    sid = cookie.value
		  }
		  
	});
	
	chrome.cookies.get({url:"http://localhost:8000", name: "csrftoken"}, function(cookie){  
		  if(cookie){
		    X_token = cookie.value
		  }
		  else{
		    X_token = "NOCOOKIE"
		  }  
	});
	*/
	
	//var sid = getCookies("http://localhost:8000", "sessionid");
	//var X_token = getCookies("http://localhost:8000", "csrftoken");
	
	//console.log(sid);
	//console.log(X_token);
	chrome.cookies.get({url: "http://localhost:8000", name: "sessionid"}, function(cookie){  
	  if(cookie){
	    var sid = cookie.value;
	    
	    var url = "http://localhost:8000/ajax/check-session/";
			var data = {sid: sid}
	    $("#login").hide();
			$("#loggedin").hide();
			$("#main").hide();
	
			$.post(url, data, function(res){
			console.log(res);
			if(res.msg == "YES")
			{
				$("#user_box").show();
				$("#user_box").html("<p><i>"+res.username+"</i></p>");
			  $("#login").hide();
			  $("#loggedin").show();
			  $("#main").show();
			}
			else if(res.msg == "NO")
			{
			  $("#login").show();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
			else if(res.msg == "FAILURE")
			{
			  var msg = "Invalid request!";
			  $("#message").html("<p>"+msg+"</p>");
			  $("#login").show();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
			else{
				var msg = "Error occured!";
			  $("#message").html("<p>"+msg+"</p>");
			  $("#login").hide();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
  });
  //////
		  }
		  else{
		    console.log("NOCOOKIE");
		  }  
	});

  
  
  
  
$("#logout_btn").on("click", function(){
 // var sid = "22snpvkaagfxmmh2vfruwvwisytfnz52"; 	//getCookies("http://localhost:8000", "sessionid");
	// var X_token = "sgUj4rTiuteYS7h14VAKR8v4JTvbRSZZ"; 	//getCookies("http://localhost:8000", "csrftoken");
	
	//console.log(sid);
	//console.log(X_token);

	
	
	/*
  var url = "http://localhost:8000/ajax/logout-user/";
  var data = {sid: sid, X_token: X_token}
  
  $.post(url, data, function(res){
  	console.log(res);
    if(res.msg == "OK")
    {
      $("#login").show();
      $("#loggedin").hide();
      $("#main").hide();
    }
    else if(res.msg == "FAILURE")
    {
      $("#login").show();
      $("#loggedin").hide();
      $("#main").hide();
    }
    else{
    	var msg = "Error occured!";
      $("#message").html("<p>"+msg+"</p>");
      $("#login").hide();
      $("#loggedin").hide();
      $("#main").hide();
    }
  });*/
  
  chrome.cookies.get({url: "http://localhost:8000", name: "sessionid"}, function(cookie){  
	  if(cookie){
	    var sid = cookie.value;
	    
	    var url = "http://localhost:8000/ajax/logout-user/";
			var data = {sid: sid}
	    $("#login").hide();
			$("#loggedin").hide();
			$("#main").hide();
	
			$.post(url, data, function(res){
			console.log(res);
			if(res.msg == "OK")
			{
				$("#login").show();
				$("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
			else if(res.msg == "FAILURE")
			{
			  $("#login").show();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
			else{
				var msg = "Error occured!";
			  $("#message").html("<p>"+msg+"</p>");
			  $("#login").hide();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
  });
  //////
		  }
		  else{
		    console.log("NOCOOKIE");
		  }  
	});
  
});

/*
chrome.cookies.getAll({}, function(cks) {
    console.log("cookies length: " + cks.length);
});
*/


$("#login_form").submit(function(e){
  e.preventDefault();
  
  var url = "http://localhost:8000/ajax/check-signin/";
  var data = $("#login_form").serialize();
  $.post(url, data, function(res){
  	console.log(res);
    if(res.msg == "OK")
    {
    	$("#user_box").show();
    	$("#user_box").html("<p><i>"+res.username+"</i></p>");
      $("#login").hide();
      $("#loggedin").show();
      $("#main").show();
    }
    else if(res.msg == "FAILURE")
    {
      var msg = "Invalid Username or Password!";
      $("#message").html("<p>"+msg+"</p>");
      $("#login").show();
      $("#user_box").hide();
      $("#loggedin").hide();
      $("#main").hide();
    }
  });
});



/*
	function getCookies(domain, name) {
		chrome.cookies.get({ url: domain, name: name}, function(cookie){  
		  if(cookie){
		    return cookie.value
		  }
		  else{
		    return "NOCOOKIE"
		  }  
	 });
	}


	var sid = getCookies("http://localhost:8000", "sessionid");
	var X_token = getCookies("http://localhost:8000", "csrftoken");
	console.log(sid);
	console.log(X_token);

  var url = "http://localhost:8000/ajax/check-session/";
  var data = {sid: sid, X_token: X_token}
  
  $.post(url, data, function(res){
  	console.log(res);
    if(res.msg == "OK")
    {
      $("#login").hide();
      $("#loggedin").show();
      $("#main").show();
    }
    else if(res.msg == "FAILURE")
    {
      var msg = "Invalid Username or Password!";
      $("#message").html("<p>"+msg+"</p>");
      $("#login").show();
    }
  });
*/

  
  /*
  $.post(url, function(res){
   
  });
  */
});

