
$("#login_form").submit(function(e){
  e.preventDefault();
  var url = "";
  var data = $("#login_form").serialize();
  $.post(url, data, function(res){
    if(res == "OK")
    {
      $("#login").hide();
      $("#loggedin").show();
      $("#main").show();
    }
    else if(res == "FAILURE")
    {
      var msg = "Invalid Username or Password!";
      $("#message").html("<p>"+msg+"</p>");
    }
  });
});


$(document).ready(function(){
  $.post(url, function(res){
   if(res == "OK")
    {
      $("#login").hide();
      $("#loggedin").show();
      $("#main").show();
    }
    else if(res == "FAILURE")
    {
      var msg = "Invalid Username or Password!";
      $("#message").html("<p>"+msg+"</p>");
      $("#login").show();
    }
  });
});
