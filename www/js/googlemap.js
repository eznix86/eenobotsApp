


//adding a method to jquery library like:
//some kind of let's call it: distance.js
$(selector).distance(km, {lat,lon}, {lat1, lon2}); //where lat and lon means longitude and lat means latitude
//this will return: 1 km Away
//and if the value is decimal let's say: 0.5 for km, it will return 500m Away instead.
$(selector).distance(mi, {lat,lon}, {lat1, lon2});
//this will return: 1 mile Away
