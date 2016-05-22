function GeoJson(coordinates) {
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: coordinates
      }
    }]
  };
}


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'));

  var latlngList = [];
  $.get('https://finding-api.herokuapp.com', function(response) {

    var geoPoints = response.distinctLocs.map(function(geo) {
      var loc = geo.loc;
      latlngList.push(new google.maps.LatLng(loc[1], loc[0]));
      return loc;
    });

    map.data.addGeoJson(new GeoJson(geoPoints));

    var bounds = new google.maps.LatLngBounds();

    latlngList.forEach(function(n){
      bounds.extend(n);
    });

    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
  });
}
