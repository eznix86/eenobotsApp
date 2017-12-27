
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
              document.querySelector('#myNavigator').pushPage('vendeur.html', {data: {title: 'Espace Client'}});
              ons.notification.alert('Congratulations!');
            }else{

              $("#push-button").fadeIn(1000);
              $("ons-progress-bar").hide();

              ons.notification.alert('Incorrect username or password.');
            }

          },
          'text'

        );
  });

});


function confirmation(){
  document.querySelector('#myNavigator').pushPage('confirmation.html', {data: {title: 'Espace Client'}});

}

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

//###############################

var showDialog = function (id) {
  document
    .getElementById(id)
    .show();
};

var hideDialog = function (id) {
  document
    .getElementById(id)
    .hide();
};

var fromTemplate = function () {
  var dialog = document.getElementById('dialog-3');

  if (dialog) {
    dialog.show();
  }
  else {
    ons.createDialog('dialog.html')
      .then(function (dialog) {
        dialog.show();
      });
  }
};
