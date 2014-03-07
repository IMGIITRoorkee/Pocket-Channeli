$(document).ready(function(){	

var Domain = "http://192.168.121.147";

	
  var url = Domain + "/check-session/";
  $.post(url, function(res){
    console.log(res);
    if(res.msg == "YES")
    {
      $("#user_box").show();
      $("#user_box").html("<p><i>"+res._name+"</i></p>");
      $("#login").hide();
      $("#message").hide();
      $("#loggedin").show();
    }
    else if(res.msg == "NO")
    {
      $("#login").show();
      $("#message").hide();
      $("#user_box").hide();
      $("#loggedin").hide();
    }
    else if(res.msg == "FAILURE")
    {
      $("#message").show();
      var msg = "Invalid request!";
      $("#message").html("<p>"+msg+"</p>");
      $("#login").show();
      $("#user_box").hide();
      $("#loggedin").hide();
    }
    else{
      $("#message").show();
      var msg = "Error occured!";
      $("#message").html("<p>"+msg+"</p>");
      $("#login").hide();
      $("#user_box").hide();
      $("#loggedin").hide();
    }
  });

$("#logout_btn").on("click", function(){
  var url = Domain + "/logout-user/";
  $.post(url, function(res){
    console.log(res);
    if(res.msg == "OK")
    {
      $("#login").show();
      $("#message").hide();
      $("#user_box").hide();
      $("#loggedin").hide();
    }
    else if(res.msg == "FAILURE")
    {
      $("#login").show();
      $("#message").hide();
      $("#user_box").hide();
      $("#loggedin").hide();
    }
    else{
      $("#message").show();
      var msg = "Error occured!";
      $("#message").html("<p>"+msg+"</p>");
      $("#login").hide();
      $("#user_box").hide();
      $("#loggedin").hide();
    }
  });
});

$("#login_form").submit(function(e){
  e.preventDefault();
  
  var url = Domain + "/check-login/";
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
    }
    else if(res.msg == "NO")
    {
      var msg = "Invalid Username or Password!";
      $("#message").show();
      $("#message").html("<p>"+msg+"</p>");
      $("#login").show();
      $("#user_box").hide();
      $("#loggedin").hide();
    }
    else if(res.msg == "FAILURE")
    {
      var msg = "Invalid request!";
      $("#message").show();
      $("#message").html("<p>"+msg+"</p>");
      $("#login").show();
      $("#user_box").hide();
      $("#loggedin").hide();
    }
  });
});

});

