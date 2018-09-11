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
		// redirect to landing
		alert("account created!");
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
	}).catch(function(error) {
	  // An error happened.
	});
}