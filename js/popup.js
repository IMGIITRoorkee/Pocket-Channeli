$(document).ready(function(){	

  var Domain = "http://192.168.121.147";
	
  /*
  var format_name = function(name){
    //return name
    var parts = name.replace(' ', '<br>');
    return parts;
  }  
  */
  
  //$(body).show();
  var url = Domain + "/check-session/";
  $.post(url, function(res){
    console.log(res);
    if(res.msg == "YES")
    {
      $("#login").hide();
      $("#message").hide();
      $("#user_box").show();
      $("#main").show();
      $("#profile_box").html("<div id='profile_pic_box'><img src='"+ Domain + res.photo + "' alt='pic' class='profile_pic'/></div>"+ 
        "<div id='user_name_box'><p id='user_name'>" + res._name + "</p> <p id='user_info'>" + res.info + "</p>");
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
    console.log(res);
    if(res.msg == "OK")
    {
      $("#message").hide();
      $("#user_box").hide();
      $("#login").show();
      $("#main").show();
      $("#username_field").val('');
      $("#password_field").val('');
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
  	console.log(res);
    if(res.msg == "YES")
    {
      $("#login").hide();
      $("#message").hide();
    	$("#user_box").show();
    	$("#profile_box").html("<div id='profile_pic_box'><img src='"+ Domain + res.photo + "' alt='pic' class='profile_pic'/></div>"+ 
          "<div id='user_name_box'><p id='user_name'>" + res._name + "</p> <p id='user_info'>" + res.info + "</p>");
      $("#main").show();
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

