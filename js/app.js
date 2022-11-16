// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "Empieza por A:", " Cosa o persona que constituye un riesgo.", "Amenaza"),
	new Word(1, "B", "Empieza por B:", " Técnica creativa grupal cuyo objetivo es la generación de nuevas ideas sobre un tema o problema concreto en un ambiente relajado", "Brainstorming"),
	new Word(2, "C", "Contiene la C:", " El conjunto de factores que existen en la economía, considerada ésta como un todo.", "Macroentorno"),
	new Word(3, "D", "Empieza por D:", " La determinación para actuar ante una situación que presenta varias alternativas.", "Decision"),
	new Word(4, "E", "Empieza por E:", " La intención de comprender los sentimientos y emociones, intentando experimentar de forma objetiva y racional lo que siente otro individuo.", "Empatia"),
	new Word(5, "F", "Empieza por F:", " Aquellos elementos que le permiten a una empresa destacar en un mercado, a veces por encima de sus competidores, y que sin duda alguna la potencian.", "Fortaleza"),
	new Word(6, "G", "Contiene la G:", " Conjunto de técnicas y estudios que tienen como objeto mejorar la comercialización de un producto.", "Marketing"),
	new Word(7, "H", "Contiene la H:", " Logro de un beneficio por desarrollar una tarea, llevar a cabo un negocio y que reporta una ventaja.", "Aprovechar"),
	new Word(8, "I", "Empieza por I:", " Cuando una organización introduce nuevos procesos, servicios o productos para lograr un cambio positivo en su negocio e impulsar los resultados.", "Innovar"),
	new Word(9, "J", "Contiene la J:", " Los estados o situaciones que la empresa pretende conseguir en el futuro utilizando sus recursos disponibles presentes y los previsibles.", "Objetivos"),
	new Word(10, "L", "Contiene la L:", " Una empresa que tiene un impacto positivo en el medioambiente o en la sociedad y, a la vez, resulta rentable como negocio.", "Social"),
	new Word(11, "M", "Empieza por M:", " La razón principal por la cual existe una empresa. ", "Mision"),
	new Word(12, "N", "Contiene la N:", " Personas u organizaciones con las cuales la empresa trabaja en forma conjunta para facilitar la venta o distribución de bienes y servicios.", "Microentorno"),
	new Word(13, "Ñ", "Falta la Ñ:", "", ""),
	new Word(14, "O", "Empieza por O:", " Beneficio externo para una empresa", "Oportunidad"),
	new Word(15, "P", "Contiene la P:", " Entidad en la que intervienen el capital y el trabajo como factores de producción de actividades industriales o mercantiles o para la prestación de servicios.", "Empresa"),
	new Word(16, "Q", "Falta la Q:", "", ""),
	new Word(17, "R", "Empieza por R:", " Es la integración voluntaria por parte de una empresa responsable de un estilo de gestión empresarial diferente.", "RSE"),
	new Word(18, "S", "Contiene la S:", " El objetivo que espera lograr en un futuro.", "Vision"),
	new Word(19, "T", "Contiene la T:", " El conjunto de factores que influyen en la actividad de una compañía.", "Entorno"),
	new Word(20, "U", "Contiene la U:", " Una empresa de nueva creación que comercializa productos y/o servicios a través del uso intensivo de las tecnologías de la información y la comunicación", "Startup"),
	new Word(21, "V", "Empieza por V:", " Los principios que rigen su misión, visión y el compromiso con sus clientes.", "Valores"),
	new Word(22, "X", "Contiene la X:", " Una empresa lo es cuando logra aumentar de manera importante su producción, expandirse a nuevos mercados, resistir a períodos de crisis económica o lograr adaptarse eficientemente a los cambios en el consumo y la tecnología.", "Exitosa"),
	new Word(23, "Y", "Contiene la Y:", " Una iniciativa que busca dar solución a un problema de negocios que no ha sido completamente resuelto por la oferta existente.", "Proyecto"),
	new Word(24, "Z", "Contiene la Z:", " Donde la empresa se ubica geográficamente.", "Localizacion")
];

// Functions
// -----------------------------------------------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == words[pos].word.toLowerCase()) {
		words[pos].correct = true;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--success");

	} else {
		words[pos].correct = false;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
	}
	remainingWords--;
	$("js--score").html(remainingWords);

	return count++;
}

function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying() {
	if (count != 25) {
		$("#js--user-answer").val("");
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}


// Main Program
// ----------------------------------------------------------------------------- */

// New game
var count = 0; // Counter for answered words
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});

// Send the answer
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});

// Key bindings for send the answer
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});

// Skip the word
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});

// Key bindings for skip the word
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "32") {
		pasapalabra(count);
		continuePlaying();
	}
});

// Play again
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
