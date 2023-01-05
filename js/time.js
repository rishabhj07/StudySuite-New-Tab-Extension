function updateClock () {
	let date = new Date();
	// time
	if (date.getHours() >= 13 || date.getHours() == 12) {
		document.getElementById("hour").innerHTML = date.getHours() - 12;
		document.getElementById("meridiem").innerHTML = "PM"
	}
	else if (date.getHours() == 0) {
		document.getElementById("hour").innerHTML = 12;
		document.getElementById("meridiem").innerHTML = "AM"
	}
	else {
		document.getElementById("hour").innerHTML = date.getHours();
		document.getElementById("meridiem").innerHTML = "AM"
	}
	
	if (String(date.getMinutes()).length == 1) {
		document.getElementById("minutes").innerHTML = "0" + date.getMinutes();
	}
	
	else {
		document.getElementById("minutes").innerHTML = date.getMinutes();
	}

	// date
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	document.getElementById("weekday").innerHTML = weekdays[date.getDay()];
	document.getElementById("month").innerHTML = months[date.getMonth()];
    
	// Gets the ordinal suffix of the number
    if (date.getDate() % 10 == 1 && date.getDate() % 100 != 11) {
        var ordinal_suffix = "st"
    }
    else if (date.getDate() % 10 == 2 && date.getDate() % 100 != 12) {
        var ordinal_suffix = "nd"
    }
    else if (date.getDate() % 10 == 3 && date.getDate() % 100 != 13) {
        var ordinal_suffix = "rd"
    }
	else {
		var ordinal_suffix = "th"
	}

	document.getElementById("day").innerHTML = date.getDate() + ordinal_suffix;
	document.getElementById("year").innerHTML = date.getFullYear();
}

setInterval(updateClock, 1);