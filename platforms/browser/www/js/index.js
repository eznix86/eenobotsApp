function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if (email === 'bob' && password === 'secret') {
    $(".next").html("<ons-progress-bar indeterminate></ons-progress-bar>");
    
    ons.notification.alert('Congratulations!');
    return true;
  }
  else { 
    ons.notification.alert('Incorrect username or password.');
    return false;
}};

document.addEventListener('init', function(event) {
var page = event.target;

if (page.id === 'page1') {
  
  page.querySelector('#push-button').onclick = function() {
    if (login() === true){
      document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
     }};
} else if (page.id === 'page2') {
  page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
}


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