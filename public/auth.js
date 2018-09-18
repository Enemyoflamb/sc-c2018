const DB = firebase.database();
const AUTH = firebase.auth();
var email = "";
var password = "";

function update(){
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
}

function register(){
	update();
	AUTH.createUserWithEmailAndPassword(email, password).then(function(){
		// redirect to login
		alert("account created!");
		AUTH.signInWithEmailAndPassword(email, password).then(function(){
			DB.ref('/' + AUTH.currentUser.uid).set({classes: {}}).then(() => {
				console.log('New user data initialized.');
				window.location.assign(window.location.protocol + '//' + window.location.hostname + "/home.html");
			}).catch((err) => {console.log(err);});
		}).catch((err) => {console.log(err);});
	}).catch(function(error){
		switch(error.code){
			case "auth/email-already-in-use":
			case "auth/invalid-email":
				// unhide "bad email" error
				document.getElementById('invalidEmail').className = "error";
				break;
			case "auth/weak-password":
				// unhide "weak password" error
				document.getElementById('invalidPassword').className = "error";
		}
	});
}

function login(){
	update();
	AUTH.signInWithEmailAndPassword(email, password).then(function(){
		// redirect to landing
		alert("login successful!");
		window.location.assign(window.location.protocol + '//' + window.location.hostname + "/home.html");
	}).catch(function(error){
		alert("login failed :(");
		document.getElementById('password').value = "";
	  // unhide error <p>
	  // set password.value to ""
	});
}
function exit(){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  window.location.assign(window.location.protocol + '//' + window.location.hostname);
	}).catch(function(error) {
	  // An error happened.
	});
}