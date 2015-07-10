if (Meteor.isClient) {

function keyPress (elem) {
	console.log(elem);
	$("." + elem).keypress( function (e) {
		var key = e.which;
		if (key == 13) {
			var search = $("." + elem).val();
    		var options = {
      			search: search
    		}
    		console.log(search);
    		ListingSearch.search(search);
    		$(".navsearchbtn").click();
		}
	});
}

	Template.addlisting.onRendered(function () {
		$("#colorpicker").spectrum({
			color: "#000",
			showInput: true,
			className: "full-spectrum",
			showInitial: true,
			showPalette: true,
			showSelectionPalette: true,
			maxSelectionSize: 10,
			preferredFormat: "hex",
			move: function (color) {

			},
			show: function () {

			},
			beforeShow: function () {

			},
			hide: function () {

			},
			change: function() {

			},
			palette: [
			["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
			"rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
			["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
			"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
			["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
			"rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
			"rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
			"rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
			"rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
			"rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
			"rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
			"rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
			"rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
			"rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
			]
		});
})

// Render the image carousel
Template.item.onRendered( function () {
	GoogleMaps.load();
	$("#carousel").flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 210,
		itemMargin: 5,
		asNavFor: "#slider"
	});
	$("#slider").flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		sync: "#carousel"
	});
	var input = $("#pac-input")[0];
	var searchBox = new google.maps.places.SearchBox((input));
	var autocomplete = google.maps.places.Autocomplete(input);

	google.maps.event.addListener(autocomplete, 'place_changed', function () {
		var places = searchBox.getPlaces();
		if (places.length == 0) {
			return;
		} 
		for ( var i = 0, marker; marker = markers[i]; i++ ) {
			marker.setMap(null);
		} 
	});
});

// Works
Template.searchpage.onRendered( function () {

	// Focus in on the search field
	$(".search").focus();

	$("#search").keypress( function (e) {
		var key = e.which;
		if (key == 13) {
			var search = $("#search").val();
    		var options = {
      			search: search
    		}
    		console.log(search);
    		ListingSearch.search(search);
		}
	});
});

Template.headerpre.onRendered( function () {
	keyPress("navsearchf");
});

Template.headerpost.onRendered( function () {
	$(".navsearchf").keypress( function (e) {
		var key = e.which;
		if (key == 13) {
			var search = $(".navsearchf").val();
    		var options = {
      			search: search
    		}
    		console.log(search);
    		ListingSearch.search(search);
		}
	});
});

Template.homeheaderpost.onRendered( function () {
	$(".search").keypress( function (e) {
		var key = e.which;
		if (key == 13) {
			var search = $(".search").val();
    		var options = {
      			search: search
    		}
    		console.log(search);
    		ListingSearch.search(search);
    		$(".homesearchbtn").click();
		}
	});
});


Template.headersearchpre.onRendered( function () {
	keyPress("navsearchf");
});

Template.homeheaderpre.onRendered( function () {
	keyPress("navsearchf");
});

Template.homeheaderpost.onRendered( function () {
	keyPress("navsearchf");
});

Template.headersearchpost.onRendered( function () {
	$(".search2").keypress( function (e) {
		var key = e.which;
		if (key == 13) {
			var search = $(".search2").val();
    		var options = {
      			search: search
    		}
    		console.log(search);
    		ListingSearch.search(search);
		}
	});
});

Template.meetuprequest.onRendered( function () {
	$("#carousel").flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 210,
		itemMargin: 5,
		asNavFor: "#slider"
	});

	GoogleMaps.load({v: '3', key: 'AIzaSyAi0bRmwNIWv24KjjeiG0DlcU-jFLPJ9FQ', libraries: 'geometry,places'});
		var picker = new Pikaday({ field: $('#datepicker')[0] });

	$("#slider").flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		sync: "#carousel"
	});
	// var input = $("#pac-input")[0];
	// var searchBox = new google.maps.places.SearchBox((input));
	// var autocomplete = google.maps.places.Autocomplete(input);

	// google.maps.event.addListener(autocomplete, 'place_changed', function () {
	// 	var places = searchBox.getPlaces();
	// 	console.log("I don't answer to these busters");
	// 	if (places.length == 0) {
	// 		return;
	// 	} 
	// 	for ( var i = 0, marker; marker = markers[i]; i++ ) {
	// 		marker.setMap(null);
	// 	} 
	// });
});
}