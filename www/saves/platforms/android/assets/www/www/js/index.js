
$(document).ready(function(){
  $("ons-progress-bar").hide();
  
  $("#push-button").click(function(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    $.post("fetch.php",
          {
            username:   email,
            password: password 
          },
          function(data){
            
            $("#push-button").fadeOut();
            $("ons-progress-bar").show();
            
            if (data == "success"){
              
              $("ons-progress-bar").hide();

              $("#push-button").show();
              document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
              ons.notification.alert('Congratulations!');
            }else{
            
              $("#push-button").fadeIn(1000);
              $("ons-progress-bar").hide();
              
              ons.notification.alert('Incorrect username or password.');
            }
            
          },
          'text'
  
        );
  })
});


window.fn = {};

window.fn.open = function() {
var menu = document.getElementById('menu');
menu.open();
};

window.fn.load = function(page) {
var content = document.getElementById('content');
var menu = document.getElementById('menu');
content.load(page)
  .then(menu.close.bind(menu));
};

