"use strict";
$(document).ready(function(){
	$("#top-artist-search").on('submit', function(event){
        
		event.preventDefault();
		var username = $("#search-user").val();
        var APIkey = "a5ccaac44e419797359236f7632f2950";
        var limit = $("#set-limit").val();
		if (limit ==""){limit = 50};
		userSearch(username,APIkey,limit);
	});
});

function addNewDiv(nameOfClass){
    var newDiv = document.createElement("div");
      newDiv.className = nameOfClass;
        newDiv.innerHTML = "";
    var beforeDiv = document.getElementById("row");
    document.body.insertBefore(newDiv, beforeDiv);
}

function userSearch(username, APIkey, limit){
        $(".json-info").remove();
        $(".error").remove();
        $(".user-not-found").remove();
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+username+'&api_key='+APIkey+'&limit='+limit+'&format=json', true); 
		xhr.onload = function(){
			if(this.status == 200){
				var responseData = JSON.parse(xhr.responseText);
				if((responseData.error==6)||(responseData.topartists.artist.length==0)){
                    addNewDiv("user-not-found");
                    let source = $("#not-found-template").html();
				    let template = Handlebars.compile(source);
                    $('.user-not-found').append(template);
                };
				console.log(responseData);
                
				for(var i = 0; i < limit; ++i){
					responseData.topartists.artist[i].image = Object.keys(responseData.topartists.artist[i].image[2]).map(function(key){return responseData.topartists.artist[i].image[2][key]});
				}
                addNewDiv("json-info");
				let source = $("#lastfm-template").html();
				let template = Handlebars.compile(source);
				$('.json-info').append(template({objects:responseData.topartists.artist}));
			}
            else {
                
            }
		}
        xhr.onerror = function(){
            addNewDiv("error");
                let source = $("#error-template").html();
				let template = Handlebars.compile(source);
                $('.error').append(template);
                setTimeout(userSearch, 10000, username, APIkey, limit);
        }
		xhr.send();
        
};