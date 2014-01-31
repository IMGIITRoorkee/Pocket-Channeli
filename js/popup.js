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
	
	
	//var sid = getCookies("http://localhost:8000", "sessionid");
	//var X_token = getCookies("http://localhost:8000", "csrftoken");
	
	//console.log(sid);
	//console.log(X_token);
	////////////////////////////////////////////////////////////////////
	*/
	
	chrome.cookies.get({url: "http://192.168.121.147:60000", name: "PHPSESSID"}, function(cookie){  
	  if(cookie){
	    var sid = cookie.value;
	    
	    var url = "http://192.168.121.147:60000/check-session/";
			var data = {sid: sid}
			
			$.post(url, data, function(res){
			console.log(res);
			if(res.msg == "YES")
			{
				$("#user_box").show();
				$("#user_box").html("<p><i>"+res._name+"</i></p>");
			  $("#login").hide();
			  $("#message").hide();
			  $("#loggedin").show();
			  $("#main").show();
			}
			else if(res.msg == "NO")
			{
			  $("#login").show();
			  $("#message").hide();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
			else if(res.msg == "FAILURE")
			{
				$("#message").show();
			  var msg = "Invalid request!";
			  $("#message").html("<p>"+msg+"</p>");
			  $("#login").show();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
			else{
				$("#message").show();
				var msg = "Error occured!";
			  $("#message").html("<p>"+msg+"</p>");
			  $("#login").hide();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
  	});
  }
  else{
		console.log("NOCOOKIE");
		$("#login").show();
		$("#message").hide();
		$("#user_box").hide();
		$("#loggedin").hide();
		$("#main").hide();
	}  
});

$("#logout_btn").on("click", function(){
  chrome.cookies.get({url: "http://192.168.121.147:60000", name: "PHPSESSID"}, function(cookie){  
	  if(cookie){
	    var sid = cookie.value;
	    
	    var url = "http://192.168.121.147:60000/logout-user/";
			var data = {sid: sid}
			
			$.post(url, data, function(res){
			console.log(res);
			if(res.msg == "OK")
			{
				$("#login").show();
				$("#message").hide();
				$("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
			else if(res.msg == "FAILURE")
			{
			  $("#login").show();
			  $("#message").hide();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
			else{
				$("#message").show();
				var msg = "Error occured!";
			  $("#message").html("<p>"+msg+"</p>");
			  $("#login").hide();
			  $("#user_box").hide();
			  $("#loggedin").hide();
			  $("#main").hide();
			}
  	});
	}
  else{
    console.log("NOCOOKIE");
    $("#login").show();
    $("#message").hide();
		$("#user_box").hide();
		$("#loggedin").hide();
		$("#main").hide();
  }  
	});
});

$("#login_form").submit(function(e){
  e.preventDefault();
  
  var url = "http://192.168.121.147:60000/check-login/";
  var data = $("#login_form").serialize();
  $.post(url, data, function(res){
  	console.log(res);
    if(res.msg == "YES")
    {
    	$("#user_box").show();
    	$("#user_box").html("<p><i>"+res._name+"</i></p>");
      $("#login").hide();
      $("#message").hide();
      $("#loggedin").show();
      $("#main").show();
    }
    else if(res.msg == "NO")
    {
      var msg = "Invalid Username or Password!";
      $("#message").show();
      $("#message").html("<p>"+msg+"</p>");
      $("#login").show();
      $("#user_box").hide();
      $("#loggedin").hide();
      $("#main").hide();
    }
    else if(res.msg == "FAILURE")
    {
      var msg = "Invalid request!";
      $("#message").show();
      $("#message").html("<p>"+msg+"</p>");
      $("#login").show();
      $("#user_box").hide();
      $("#loggedin").hide();
      $("#main").hide();
    }
  });
});

});

