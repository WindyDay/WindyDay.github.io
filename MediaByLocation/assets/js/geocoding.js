
var insta_token;

function initMap() 
{
    var url = window.location.href;
    var geocoder;
    //var insta_token;
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
    window.location.href = "https://www.instagram.com/oauth/authorize/?client_id=5ad0aa418c074e1d86fa698b83bd919e&redirect_uri=https://windyday.github.io/MediaByLocation&response_type=token&scope=public_content";
    
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

function generateNearbyList(lat, lng, token)
{
    var html = '';
    html += '<ul>';
    var url = "https://api.instagram.com/v1/locations/search?lat="+ lat +"&lng="+ lng +"&access_token=" + token;
    //html += '<li>' + url + '</li>';
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (data) 
        {

            data.data.forEach(function (item, index) {
                 html += '<li onclick="showNearbyMedia(this)" data-lat=' + item.latitude+ ' data-lng=' + item.longitude + '><a href="javascript:void(0)">' + item.name + '</a></li>';
           });

            html += '</ul>';
            document.getElementById('listLocationNearBy').innerHTML = html;

        },
        error: function() { alert('Failed!'); }
    });
    
}

function showNearbyMedia(element)
{
	var latitude = element.getAttribute("data-lat");
	var longitude = element.getAttribute("data-lng");
	//alert(latitude + " | " + longitude);
	var url = 'https://api.instagram.com/v1/media/search?lat='+ latitude +'&lng=' + longitude +'&access_token=' + insta_token;
	var html = '';
	html += '<div class="col-md-12">'
	html +=     '<div class="panel panel-default">'
	html +=         '<div class="panel-heading">'
	html +=             '<h3 class="panel-title">Nearby medias:</h3></div>'
	html +=         '<div class="panel-body">'
	html +=             '<div class="row">'


	 $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function (data) 
        {
			//console.log(item.images.low_resolution.url)
            data.data.forEach(function (item, index) 
            {
                try
                {
                    item.carousel_media.forEach(function (item2, index2) 
                    {
                        console.log(item2);
                        //console.log(item2.videos.standard_resolution.url);
                        //begin
                        html +=                '<div class="col-md-12">'
                        html +=                     '<div class="thumbnail">'
                        html +=                         '<div style="text-align:center;">'
                        

                        try
                        {
                            var tempHTML = '';
                            tempHTML += '<a><video controls>'
                            tempHTML +=   '<source src=' + item2.videos.standard_resolution.url + ' type="video/mp4">'
                            tempHTML +=   'Your browser does not support the video tag.'
                            tempHTML += '</video></a>'
                            html += tempHTML;
                        }
                        catch(err)
                        {
                            try
                            {
                                html +=                      '<a><img src='+item2.images.standard_resolution.url+' /></a>'
                            }
                            catch(err)
                            {

                            }
                        }

                        html +=                         '</div>'
                        html +=                         '<div class="caption">'
                        html +=                             '<p></p>'
                        html +=                         '</div>'
                        html +=                     '</div>'
                        html +=                 '</div>'
                    });
                }
                catch(err)
                {
                    item.forEach(function (item2, index2) 
                    {
                        console.log(item2);
                        //console.log(item2.videos.standard_resolution.url);
                        //begin
                        html +=                '<div class="col-md-12">'
                        html +=                     '<div class="thumbnail">'
                        html +=                         '<div style="text-align:center;">'
                        

                        try
                        {
                            var tempHTML = '';
                            tempHTML += '<a><video controls>'
                            tempHTML +=   '<source src=' + item2.videos.standard_resolution.url + ' type="video/mp4">'
                            tempHTML +=   'Your browser does not support the video tag.'
                            tempHTML += '</video></a>'
                            html += tempHTML;
                        }
                        catch(err)
                        {
                            try
                            {
                                html +=                      '<a><img src='+item2.images.standard_resolution.url+' /></a>'
                            }
                            catch(err)
                            {

                            }
                        }

                        html +=                         '</div>'
                        html +=                         '<div class="caption">'
                        html +=                             '<p></p>'
                        html +=                         '</div>'
                        html +=                     '</div>'
                        html +=                 '</div>'
                    });
                }
            	
            	


				//end
            });
		

    		document.getElementById('listMediaNearby').innerHTML = html;

		    $('html, body').animate({
		        scrollTop: $("#listMediaNearby").offset().top
		    }, 2000);

        },
        error: function() { alert('Failed!'); }
    });



// //begin
// 	html +=                '<div class="col-md-4">'
// 	html +=                     '<div class="thumbnail">'
// 	html +=                         '<div>'
// 	html +=                             '<a href="productDetail.html"><img src="1.jpg" /></a>'
// 	html +=                         '</div>'
// 	html +=                         '<div class="caption"><a href="productDetail.html"><h2 class="text-center">Nhẫn bạc</h2></a>'
// 	html +=                             '<p>Bạc nguyên chất 900%. Không pha tạp chất</p>'
// 	html +=                             '<h4 class="text-center text-danger">50.000 VND</h4>'
// 	html +=                             '<h4 class="text-center text-info">Còn lại: 7h30p</h4>'
// 	html +=                             '<div class="text-center">'
// 	html +=                                 '<div class="form-group">'
// 	html +=                                     '<input type="number" min="1" />'
// 	html +=                                 '</div>'
// 	html +=                                 '<button class="btn btn-success" type="submit">Đặt giá</button>'
// 	html +=                             '</div>'
// 	html +=                         '</div>'
// 	html +=                     '</div>'
// 	html +=                 '</div>'
// //end
// 	html +=             '</div>'
// 	html +=         '</div>'
// 	html +=     '</div>'
// 	html += '</div>'


}

initMap();
