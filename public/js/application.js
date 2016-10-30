"use strict";
$(document).ready(function(){
	var timer;
	$("#user-search-action").on('submit', function(event){
		event.preventDefault();
		$(".json-info").remove();

		var username = $("#search-user").val();
        var APIkey = "a5ccaac44e419797359236f7632f2950";
        var limit = $("#set-limit").val();
		userSearch(username,APIkey,limit);
	});
});
function userSearch(username, APIkey, limit){
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+username+'&api_key='+APIkey+'&limit='+limit+'&format=json', true); 
		xhr.onload = function(){
			$(".loading").hide();
			if(this.status == 422){
				alert("422 Unprocessable Entity");
			}
			if(this.status == 404){
				alert("404 not found");
			}
			if(this.status == 200){
				var responseData = JSON.parse(xhr.responseText);
				console.log(responseData);

				var source = $("#lastfm-template").html();
				var template = Handlebars.compile(source);
				$('.json-info').append(template({objects:responseData.topartists.artists}));
			}
		}
		xhr.onerror = function(){
			console.log("BAD: " + this.status);
		}
		xhr.send();
};