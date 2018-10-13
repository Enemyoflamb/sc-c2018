const className = localStorage.getItem('selected');
var PATH;
document.title = "SmartChart - " + className;

function Person(x, y, label){
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this._x = 0;
    this._y = 0;
    this.f = 100;
    this.name = label;
};

let students = [];
var ppl = [];

AUTH.onAuthStateChanged(loadStudents);
function loadStudents(){
	PATH = '/' + AUTH.currentUser.uid + '/classes/' + className;
	DB.ref(PATH).once('value').then(function(snapshot){
		students = snapshot.val().students;
    ppl = [];
		for(var i = 0; i < students.length; i ++){
			ppl.push(new Person(100 + 45 * (i % 8), 100 + 45 * ~~(i / 8), students[i]));
		}
	});
}

function addStudent(){
	let name = prompt("What is the name of the student you would like to add?");
  students.push(name);
  ppl.push(new Person(500, 500, name))
  DB.ref(PATH).set({'students': students}).then(loadStudents);
}
function back(){
	localStorage.removeItem('selected');
	window.location.href = "home.html";
}
