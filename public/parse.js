var cooldowns = {};

function sanitize(HTMLObj){
	HTMLObj.innerHTML = HTMLObj.innerHTML.replace(/[^\w| ]/ig, '');
}
function editMode(HTMLObj){
	HTMLObj.onclick = (event) => {};
	HTMLObj.parentElement.innerHTML = "<textarea id='textarea' rows='1' cols='34' maxlength='32' style='resize: none' onkeypress='sanitize(this)' onblur='sanitize(this)' onpaste='sanitize(this)'>" + HTMLObj.innerHTML + "</textarea> <span id='" + HTMLObj.innerHTML + "' onclick='save(this)'> &#10004 </span>";
}
function manageMe(HTMLObj){
	if(cooldowns[HTMLObj.id]){
		localStorage.setItem("selected", HTMLObj.id);
		window.location.href = "manage.html";
	}else{
		cooldowns[HTMLObj.id] = 1;
		setTimeout(() => {cooldowns[HTMLObj.id] = 0;}, 200);
	}
}
function save(HTMLObj){
	let p = HTMLObj.parentElement;
	let PATH = '/' + AUTH.currentUser.uid + '/classes/' + HTMLObj.id;
	let NEWPATH = '/' + AUTH.currentUser.uid + '/classes/' + p.getElementsByTagName('textarea')[0].value.replace(/[^\w| ]/ig, '');

	p.outerHTML = '<h2><span>' + p.getElementsByTagName('textarea')[0].value.replace(/[^\w| ]/ig, '').substr(0, 32) + '</span></h2>';

	if(!p.getElementsByTagName('textarea')[0].value.length){
		if(confirm(`Are you sure you want to delete the class: ${HTMLObj.id}?`)){
			DB.ref(PATH).remove().then(loadClasses);
			console.log(`Deleted class [${HTMLObj.id}]`)
		}
		return loadClasses();
	}

	DB.ref(PATH).once('value').then(function(snapshot) {
		let pstudents = snapshot.val().students;
		DB.ref(NEWPATH).once('value').then(function(snapshot) {
			if(snapshot.val() === null){
				DB.ref(PATH).remove();
				DB.ref(NEWPATH).set({
						students: pstudents
				}).then(() => {
					console.log(`Moved class [${PATH}] to [${NEWPATH}]`)
					loadClasses();
				});
			}else{
				if(PATH !== NEWPATH)
					alert("Error: Conflicting class names.")
				loadClasses();
			}
		});
	});
}

AUTH.onAuthStateChanged(loadClasses);
function newClass(){
	DB.ref('/' + AUTH.currentUser.uid).once('value').then(function(snapshot) {
		let classes = snapshot.val().classes;
		let n = 1;
		while(classes[("New Class No" + n)])
			n ++;
		DB.ref('/' + AUTH.currentUser.uid + '/classes/New Class No' + n).set({
			students: ["#0001", "#0002", "#0003"]
		}).then(() => {
			console.log(`Created new class [New Class No${n}]`);
			loadClasses();
		});
	});
}
function loadClasses(){
	if(AUTH.currentUser === null){
		window.location.href = "login.html";
		return;
	}
	DB.ref('/' + AUTH.currentUser.uid).once('value').then(function(snapshot) {
		let c = document.getElementById("homBod");
		while(c.firstChild.nodeName !== c.lastChild.nodeName)
			c.lastChild.remove();

		let classes = snapshot.val().classes;

		for(var className in classes){
			var span = document.createElement("span");
			var h2 = document.createElement("h2");
			var div = document.createElement("div");
			span.innerHTML = className;
			span.onclick = (function(event){
				editMode(this);
			});
			div.onclick = (function(event){
				manageMe(this);
			});
			h2.appendChild(span);
			div.appendChild(h2);
			div.id = className;
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
