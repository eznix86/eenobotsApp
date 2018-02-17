

ons.ready(function() {

  previous_data = [];
  var carousel = document.addEventListener('postchange', function(event) {
    console.log('Changed to ' + event.activeIndex)

    let refreshInterval = setInterval(()=>{
      $.ajax({
       type: 'POST',
       url: 'http://localhost/Projects/php/data.php',
       dataType: 'json'})
       .then(
         function(data){
           let createLine = function(display, previous, next, value){

             const data_state =['img/arrow_up.png','img/arrow_constant.png','img/arrow_down.png'];
             let i = 1
             if (previous[0][value] < next[0][value] )
               i = 0
             else if(previous[0][value] > next[0][value])
               i = 2

             let wrapper = document.createElement('div');
             wrapper.setAttribute('class', 'd-flex justify-content-between');

             let arrow_wrapper = document.createElement('div');
             arrow_wrapper.setAttribute('style',"margin-left: 10px;");
             let arrow = document.createElement('img');
             arrow.setAttribute('src', data_state[i]);
             arrow_wrapper.appendChild(arrow);

             let wrapper_data = document.createElement('div');
             let data = document.createTextNode(next[0][value]);
             wrapper_data.appendChild(data);

             let wrapper_time = document.createElement('div');
             wrapper_time.setAttribute('class', 'col-4');
             let time = document.createTextNode(moment(next[0]['date']).fromNow());
             wrapper_time.appendChild(time);

             wrapper.appendChild(arrow_wrapper);
             wrapper.appendChild(wrapper_data);
             wrapper.appendChild(wrapper_time);
             display.append(wrapper);
           }
           let maintain = function(display,  previous, next, value){
             display.children().first().remove();
             createLine(display, data);
           }
           console.log("here: "+event.activeIndex)
           switch (event.activeIndex) {
             case 1:
              $.getJSON('http://api.wunderground.com/api/36051e280c8d8ec2/hourly/q/-20.3147,57.5203.json')
                .then(function(weather){
                  console.log(weather);
                  console.log(weather.hourly_forecast[0].FCTTIME.civil);

                  console.log(weather.hourly_forecast[0].icon);
                  console.log(weather.hourly_forecast[0].condition)
                  $('#weather-description').html(weather.hourly_forecast[0].condition);
                  $('#current-weather').attr("src", "img/icons/"+weather.hourly_forecast[0].icon+".svg");
                  console.log(weather.hourly_forecast[0].temp.metric);
                  $('#today-time-one').html(weather.hourly_forecast[0].FCTTIME.civil);
                  $('#today-weather-one').attr("src", "img/icons/"+weather.hourly_forecast[0].icon+".svg");
                  $('#today-time-two').html(weather.hourly_forecast[1].FCTTIME.civil);
                  $('#today-weather-two').attr("src", "img/icons/"+weather.hourly_forecast[1].icon+".svg");
                  $('#today-time-three').html(weather.hourly_forecast[2].FCTTIME.civil);
                  $('#today-weather-three').attr("src", "img/icons/"+weather.hourly_forecast[2].icon+".svg");
                  $('#today-time-four').html(weather.hourly_forecast[3].FCTTIME.civil);
                  $('#today-weather-four').attr("src", "img/icons/"+weather.hourly_forecast[3].icon+".svg");
                  $('#today-time-five').html(weather.hourly_forecast[4].FCTTIME.civil);
                  $('#today-weather-five').attr("src", "img/icons/"+weather.hourly_forecast[4].icon+".svg");
                });
              $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng=-20.3147,57.5203&sensor=true/false')
                .then(function(position){
                  console.log(position.results[0].address_components[1].long_name);
                  console.log(data[0].temperature);
                  $('#position-name').html(position.results[0].address_components[1].long_name);
                  $('#current-temperature').html(data[0].temperature+"&deg;");


                });

             break;
             case 2:

               if ($('#humidity-data').children().length < 3 ){
                createLine($('#humidity-data'), previous_data, data, 'humidity');
              }else
                maintain($('#humidity-data'),previous_data, data, 'humidity');


              if ($('#moisture-data').children().length < 3 ){
               createLine($('#moisture-data'),previous_data, data, 'moisture');
              }else
               maintain($('#moisture-data'),previous_data, data, 'moisture');
             break;
             case 3:

               if ($('#ph-data').children().length < 3 ){
                createLine($('#ph-data'),previous_data, data, 'ph');
               }else
                maintain($('#ph-data'),previous_data, data, 'ph');
                $('#solution-value').html(data[0].solution+"%");
                $('#ph-value').html(data[0].ph+"%");


             break;


           }
           clearInterval(refreshInterval);

         }

       )
    }, 5000);


  });


  let loaded = false;


  let refreshInterval =  setInterval(()=>{

      if (!loaded)
        loaded = true;
    $.ajax({
     type: 'POST',
     url: 'http://localhost/Projects/php/data.php',
     success: function(data){

       if (loaded){
         $('.loading-icon').hide("slow");

       }

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


  $('#settings-init').click(

  );

});
