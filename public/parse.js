function editMode(HTMLObj){
	HTMLObj.onclick = (event) => {};
	HTMLObj.innerHTML = "<textarea id='textarea' rows='1' cols='20' maxlength='18' style='resize: none'>" + HTMLObj.innerHTML + "</textarea> <span id='" + HTMLObj.innerHTML + "' onclick='save(this)'> &#10004 </span>";
}
function save(HTMLObj){
	let p = HTMLObj.parentElement;
	let PATH = '/' + AUTH.currentUser.uid + '/classes/' + HTMLObj.id;
	let NEWPATH = '/' + AUTH.currentUser.uid + '/classes/' + p.getElementsByTagName('textarea')[0].value;

	p.outerHTML = '<h2>' + p.getElementsByTagName('textarea')[0].value + '</h2>';

	DB.ref(PATH).once('value').then(function(snapshot) {
		let pstudents = snapshot.val().students;
		DB.ref(PATH).remove();
		DB.ref(NEWPATH).set({
				students: pstudents
		}).then(() => {
			console.log('Moved class [' + PATH + "] to [" + NEWPATH + "]");
			loadClasses();
		});
	});
}

AUTH.onAuthStateChanged(loadClasses);
function loadClasses(){
	if(AUTH.currentUser === null){
		window.location.href = "login.html";
		return;
	}
	DB.ref('/' + AUTH.currentUser.uid).once('value').then(function(snapshot) {
		let c = document.getElementById("homBod");
		while(c.firstChild.nodeName !== c.lastChild.nodeName)
			c.lastChild.remove();

		var classes = snapshot.val().classes;

		for(var className in classes){
			var h2 = document.createElement("h2");
			var div = document.createElement("div");
			h2.innerHTML = className;
			h2.onclick = (function(event){
				editMode(this);
			});
			div.appendChild(h2);
			c.appendChild(div);/*
			function changeClassName(){
				h2.innerHTML = document.getElementById("textarea").value;
			}
			document.getElementById("checkMark").addEventListener("click", function(){
				changeClassName()
			});*/

		}
	});
}
