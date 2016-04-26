var addTableBody = function(){
	var response = $.getJSON("topspots.JSON");
	response.complete(addBodyCallback);
}

function initMap(){
	var myLatLng = {lat: 0, lng: 0};

	var map = new google.maps.Map(document.getElementById('map'),{
		zoom: 10,
		center: myLatLng
	});

	// create an empty string to hold instances of all marker objects.
	var marker = [];
	// all lat and lng values will be averaged.  the map center will be set to the average lat and lng.
	var getAverage = [];

	for (i in objs){
		// create a location object with the lat and lng equal to that of spot.
		var lat = objs[i].location[0];
		var lng = objs[i].location[1];
		myLatLng = {lat: lat, lng: lng};
		
		getAverage.push(myLatLng);

		// populate the marker array.
		marker[i] = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: objs[i].name
		});
	}

	// calculate the average location.
	var latSum = 0;
	var lngSum = 0;
	for (i in getAverage){
		latSum += getAverage[i].lat;
		lngSum += getAverage[i].lng;
	}
	var latAvg = latSum / (getAverage.length);
	var lngAvg = lngSum / (getAverage.length);
	map.setCenter(new google.maps.LatLng(latAvg, lngAvg));
}


var objs = {};

var addBodyCallback = function(response){

	objs = response.responseJSON;
	var $tbody = $("<tbody></tbody>");

	// iterate over every row object and create an html row with the contents
	$.each(objs, function(i){
		var obj = objs[i];
		var $tr = $("<tr></tr>");

		// the toObj will contain the conten of each item in the row.
		var tdObj = {};
		tdObj.name = obj.name;
		tdObj.description = obj.description;

		// add the link the location on google maps.
		var $a = $('<a class="btn btn-info mrs">Open in Google Maps</a>');
		var googleMapsURL = "https://www.google.com/maps?q=";
		$a.attr("target", "_blank");
		googleMapsURL += obj.location[0] + "," + obj.location[1];
		// add the link to the anchor tag.
		$a.attr("href", googleMapsURL);
		// add anchor to toObj
		tdObj.location = $a; 

		// add the content to the row.
		$.each(tdObj, function(content){
			var $td = $("<td></td>");
			$td.append(tdObj[content]);
			$td.appendTo($tr);
		});

		$tbody.append($tr);
	});

	$("thead").after($tbody);

	$('head').append('<script async defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGlrqrO_evftmLh-qieGpY9gKCKCYPBV0&callback=initMap"></script>');
}

$(addTableBody);