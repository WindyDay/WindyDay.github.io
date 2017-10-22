function initMap() {
        var url = window.location.href;
        var access_token;
        try
            {
                access_token = new URL(url).hash.split('&').filter(function(el) { if(el.match('access_token') !== null) return true; })[0].split('=')[1];

            }
        catch(err)
            {
                redirectToInstagAPI();
            }
        
        alert(access_token);

        var geocoder = new google.maps.Geocoder();

        document.getElementById('SearchBtn').addEventListener('click', function() {
          geocodeAddress(geocoder);
        });
      }

function redirectToInstagAPI()
{
    window.location.href = "https://www.instagram.com/oauth/authorize/?client_id=5ad0aa418c074e1d86fa698b83bd919e&redirect_uri=https://windyday.github.io/&response_type=token";
    
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
