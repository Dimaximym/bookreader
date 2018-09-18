//XMLHttpRequest

var book;
var nowPos = 0;
getPos();
var n = 10;//кол-во строк в странице
var _length;



function getProgressBook() {
	divProgress.innerHTML = "";
	divProgress.innerHTML = Math.floor(nowPos /(_length / 100));
	divProgress.innerHTML += "%";
}

function writeTextInterval(a, b) {
	var to = (b <= _length) ? b : _length;
	divMain.innerHTML = "";
	for(var i = a; i < to; i++) {
			divMain.innerHTML += "<p \/>" + book.getElementsByTagName("p")[i].textContent + "<p \/>";
	}
	getProgressBook();
}

function writeText() {
	if (nowPos >= _length) return;
	writeTextInterval(nowPos, nowPos + n);
	savePos();
	nowPos += n;
}

function writeTextFromStr(fr) {
	if (fr >= _length) return;
	writeTextInterval(fr, +fr + n);
	nowPos = +fr + n;
	savePos();
}

function pageDown() {
	if (nowPos - n <= 0) return;
	nowPos -= n;
	writeTextInterval(nowPos - n, nowPos);
	getProgressBook();
}

function savePos() {
	localStorage.setItem("pos", nowPos);
}

function getPos() {
	if (localStorage.getItem("pos") == null)
		nowPos = 0;
	else
		nowPos = parseInt(localStorage.getItem("pos"), 10);
}

//*******************************************************
//JQuery
		
//animate({ opacity: "hide" }, "slow");


//*******************************************************
//Connecting and getting a book
var xhr = new XMLHttpRequest();
xhr.open("GET", 'http://books/2-mech-prednaznacheniya.fb2', true);
xhr.send();
//dimaximym8.000webhostapp.com

xhr.onreadystatechange = function() {
	if(xhr.readyState != 4) return;
	
	if(xhr.status != 200) {
		alert(xhr.status + ": " + xhr.statusText);
	}else {
		parser = new DOMParser();
		book = parser.parseFromString(xhr.responseText, "text/xml");
		_length = book.getElementsByTagName("p").length;
		//console.log(book.getElementsByTagName("body")[0].textContent);
		//console.log(book.getElementsByTagName("p").length);
		//console.log(document.body.innerHTML);
		divMain.innerHTML += "<p \/>" + book.getElementsByTagName("book-title")[0].textContent + "<p \/>";
	}
}