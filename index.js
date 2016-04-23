var addTableBody = function(){
	var response = $.getJSON("topspots.JSON");
	response.complete(addBodyCallback);
}

var addBodyCallback = function(response){
	var objs = response.responseJSON;
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
}

$(addTableBody);