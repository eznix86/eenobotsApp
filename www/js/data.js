

ons.ready(function() {
  var carousel = document.addEventListener('postchange', function(event) {
    console.log('Changed to ' + event.activeIndex)


  });

  previous_data = [];


  setInterval(()=>{
    $.ajax({
     type: 'POST',
     url: 'http://localhost/Projects/php/data.php',
     success: function(data){
       monitor(data);
       check_changes(previous_data, data);
       previous_data = data


     },
     dataType: 'json'

   });

  }, 5000);

  let monitor = function(data){
    $('#temperature-info').html(data[0].temperature+"&deg;C");
    $('#moisture-info').html(data[0].moisture+"%");
    $('#humidity-info').html(data[0].humidity+"%");
    $('#water-info').html(data[0].water+"%");
    $('#solution-info').html(data[0].solution+"%");
    $('#light-info').html(data[0].light+" lux");
  }

  let check_changes = function(previous, next){
    const data_state =['img/arrow_up.png','img/arrow_constant.png','img/arrow_down.png'];
    const state = ['temperature', 'moisture', 'humidity', 'water', 'solution', 'light'];

    if (previous.length){
      console.log(previous);
      state.forEach(value=>{
        let i = 1
        if (previous[0][value] < next[0][value] )
          i = 0
        else if(previous[0][value] > next[0][value]) {
          i = 2
        }

        $("#"+value+"-state").attr("src", data_state[i]);
      });
    }
  }



});
