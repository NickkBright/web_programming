"use strict";
$(document).ready(function(){
	var timer;
	$("#top-artist-search").on('submit', function(event){
		event.preventDefault();
		$(".json-info").remove();
    	addNewDiv();

		var username = $("#search-user").val();
        var APIkey = "a5ccaac44e419797359236f7632f2950";
        var limit = $("#set-limit").val();
		userSearch(username,APIkey,limit);
	});
});

function addNewDiv(){
    var newDiv = document.createElement("div");
      newDiv.className = "container json-info";
        newDiv.innerHTML = "";

    var beforeDiv = document.getElementById("row");
    document.body.insertBefore(newDiv, beforeDiv);
}

function userSearch(username, APIkey, limit){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+username+'&api_key='+APIkey+'&limit='+limit+'&format=json', true); 
		xhr.onload = function(){
			if(this.status == 422){
				alert("422 Unprocessable Entity");
			}
			if(this.status == 404){
				alert("404 not found");
			}
			if(this.status == 200){
				var responseData = JSON.parse(xhr.responseText);
				if(responseData.topartists.artist.length==0){alert("User Not Found! Try again")};
				console.log(responseData.topartists.artist);
				for(var i = 0; i < limit; ++i){
					responseData.topartists.artist[i].image = Object.keys(responseData.topartists.artist[i].image[2]).map(function(key){return responseData.topartists.artist[i].image[2][key]});
				}

				var source = $("#lastfm-template").html();
				var template = Handlebars.compile(source);
				$('.json-info').append(template({objects:responseData.topartists.artist}));
			}
		}
		xhr.onerror = function(){
			console.log("BAD: " + this.status);
		}
		xhr.send();
};