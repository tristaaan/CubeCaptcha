//Cube Captcha.js

var model = new CubeModel();

function getRandomAlg(len){
	var slices = [["U", "D"], ["F", "B"], ["R", "L"]];
	var mods   = ["", "'", "2"];
	var moves  = [];

	var lastAxis = -1;
	var i = 0;
	while (i<len){
		var axis = Math.floor(Math.random()*3);
		if (axis == lastAxis)
			continue;
		else
			lastAxis = axis;

		var move = Math.floor(Math.random()*2);
		var mod  = Math.floor(Math.random()*3);

		moves.push(slices[axis][move] + mods[mod]);
		i++;
	}
	return moves;
}

function inverseMoves(moves){
	var ret = [];
	for(var i=0; i<moves.length; i++){
		if (moves[i].length < 2)		//a single move
			ret.push(moves[i]+"'");
		else if (moves[i][1] == "'")	//is prime move
			ret.push(moves[i][0]);
		else							//is 2 move
			ret.push(moves[i]);
	}
	return ret.reverse();
}

function getCaptchaImage(){
	var length = 2;
	var moves = getRandomAlg(length);
	var cubeAddr = "http://thesixsides.com/rubikscube/visualcube/visualcube.php" +
					"?size=150" +
					"&fmt=png" +
					"&pzl=3" +
					"&alg=" + moves.join("");

	$("#cube").attr("src",cubeAddr);
	model.doMoves(moves);
	createOptions(inverseMoves(moves).join(" "), length);
}

function createOptions(answer, len){
	var choices = 3;
	var form = "";
	var whichButton = Math.floor(Math.random()*choices);

	for (var i=0; i<choices; i++){
		var moves = "";
		if (i==whichButton)
			moves = answer;
		else{
			moves = getRandomAlg(len).reverse().join(" ");
			while (moves == answer)
				moves = getRandomAlg(len).reverse().join(" ");
		}
		var element = "#op"+(i+1);
		$(element).attr("value",moves);
		$(element).after(moves);
	}
}

function submitForm(formValues){
	var turnChoice = "";

	for(var i=0; i < formValues.turn.length; i++){
		if (formValues.turn[i].checked)
			turnChoice = formValues.turn[i].value;
	}

	var testModel = new CubeModel();
	testModel.model = model.model.slice(0);
	testModel.doMoves(turnChoice.split(" "));

	if (testModel.isSolved()){
		alert("correct");
		//or do whatever
	}
	else{
		alert("false");
		//reject
	}
}