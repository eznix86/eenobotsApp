                    
                            function initMap() {
                              var positionSrc = {lat:  -20.242849 , lng: 57.45803};
                              var positionDes = {lat: -20.164642, lng: 57.507248};
                              var map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 16,
                                center: positionSrc
                              });
                      
                              var source = new google.maps.Marker({
                                position: positionSrc,
                                map: map,
                                title: 'Command'
                              });

                              var destination = new google.maps.Marker({
                                position: positionDes,
                                map: map,
                                title: 'Command'
                              });
                              
                              var flightPlanCoordinates = [positionDes, positionSrc];
                            var flightPath = new google.maps.Polyline({
                              path: flightPlanCoordinates,
                              geodesic: true,
                              strokeColor: '#FF0000',
                              strokeOpacity: 1.0,
                              strokeWeight: 2
                            });

                            flightPath.setMap(map);
                          

                            }