function initMap() {
        
        var geocoder = new google.maps.Geocoder();

        document.getElementById('SearchBtn').addEventListener('click', function() {
          geocodeAddress(geocoder);
        });
      }

function geocodeAddress(geocoder) {
    var address = document.getElementById('SearchField').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        document.getElementById('position').innerHTML = results[0].geometry.location.lat() + " - " +  results[0].geometry.location.lng();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}

initMap();
