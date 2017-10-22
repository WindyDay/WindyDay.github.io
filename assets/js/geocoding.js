function initMap() 
{
    var url = window.location.href;
    var insta_token;
    var geocoder;
    try
        {
            insta_token = new URL(url).hash.split('&').filter(function(el) { if(el.match('access_token') !== null) return true; })[0].split('=')[1];

            geocoder = new google.maps.Geocoder();
        }
    catch(err)
        {
            redirectToInstagAPI();
        }

    document.getElementById('SearchBtn').addEventListener('click', function() {
      geocodeAddress(geocoder, insta_token);
    });
}

function redirectToInstagAPI()
{
    window.location.href = "https://www.instagram.com/oauth/authorize/?client_id=5ad0aa418c074e1d86fa698b83bd919e&redirect_uri=https://windyday.github.io/&response_type=token&scope=public_content";
    
}

function geocodeAddress(geocoder, insta_token) 
{
    var address = document.getElementById('SearchField').value;
    geocoder.geocode({'address': address}, function(results, status) 
    {
      if (status === 'OK') 
      {
          
        document.getElementById('position').innerHTML = "Location info recieve from google: " + results[0].geometry.location.lat() + " | " +  results[0].geometry.location.lng();
      
        document.getElementById('listLocationNearByTitle').innerHTML = "Nearby locations from instagram:<br>";
          
        generateNearbyList(results[0].geometry.location.lat(), results[0].geometry.location.lng(), insta_token);
      } 
        else 
      {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}

function generateNearbyList(lat, lng, tokken)
{
     $.ajax({
                    url : "https://api.instagram.com/v1/locations/search?lat="+ lat +"&lng="+ lng +"&access_token=" + tokken,
                    type : 'get',
                    dataType : 'json',
                    success : function (result){
                        alert(JSON.stringify(result));
                              
                        var html = '';
                        html += '<ul class="list-inline">';
    
                        html += '<li>' + data.data[0].name + '</li>';
                        

                        document.getElementById('listLocationNearBy').innerHTML = html;

                        html += '</ul>';
                    }
                });
}


initMap();
