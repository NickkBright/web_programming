'use strict';


$(document).ready(function(){
        var username = $("#search-user").val();
        var APIkey = "a5ccaac44e419797359236f7632f2950";
        var limit = $("#set-limit").val();
        if (limit ==""){limit = 50};
        response(username, APIkey, limit);
        
});
        

function addNewDiv(){
    let newDiv = document.createElement("div");
      newDiv.className = "container json-info";
        newDiv.innerHTML = "";

    let beforeDiv = document.getElementById("row");
    document.body.insertBefore(newDiv, beforeDiv);
}

function errorDiv(number){
    let newDiv = document.createElement("div");
    newDiv.className = "container error-message";
    newDiv.innerHTML = "";
    let beforeDiv = document.getElementById("row");
    document.body.insertBefore(newDiv, beforeDiv);
}
var response = function (username, APIkey, limit) {
    var lastfmData = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+username+'&api_key='+APIkey+'&limit='+limit+'&format=json', true); 
        xhr.onload = function(){
            var status = xhr.status;
            if (status == 200) { resolve(result);}
            else {reject(error);}
        }
        .then (
        result => {
                var responseData = JSON.parse(xhr.responseText);
				if(responseData.topartists.artist.length==0){alert("User Not Found! Try again")};
				console.log(responseData.topartists.artist);
				for(var i = 0; i < limit; ++i){
					responseData.topartists.artist[i].image = Object.keys(responseData.topartists.artist[i].image[2]).map(function(key){return responseData.topartists.artist[i].image[2][key]});
				}

				let source = $("#lastfm-template").html();
				let template = Handlebars.compile(source);
				$('.json-info').append(template({objects:responseData.topartists.artist}));
                $("#top-artist-search").on('submit', function(event){
		        event.preventDefault();
		        $(".json-info").remove();
    	        addNewDiv();
	            });
                },
        error => {
			    if(this.status == 404){
				alert ("404 not found");
			     }
                }
            );
          return (lastfmData);
        xhr.send();
});



  
}
