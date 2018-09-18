const DB = firebase.database();
const AUTH = firebase.auth();
const classArea = document.getElementById("homBod");

DB.ref('/' + AUTH.currentUser.uid).once('value').then(function(snapshot) {
	var classes = snapshot.val().classes;

	for(var className in classes){
		var h2 = document.createElement("h2");
		var div = document.createElement("div");   
		h2.innerHTML = className;
		div.appendChild(h2);
		classArea.appendChild(div);
	}
});