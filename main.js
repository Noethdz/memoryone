var dificultad = parseInt(prompt("BIENVENIDO!! \n ¿Que dificultad deseas?\n \n 1.- Facil\n \n 2.- Dificil"));

if (dificultad == 1) {
    var easy = "FACIL";
    alert("Has seleccionado: " + dificultad + " --> " + easy + "\n Solo tienes 10 intentos");
}
if (dificultad == 2) {
    var hard = "DIFICIL";
    alert("Has seleccionado: " + dificultad + " --> " + hard + "\n Solo tienes 7 intentos");
}
if (dificultad !== 1 && dificultad !== 2) {
    alert("Valor por defecto es nivel facil: " + " --> " + easy + "\n Solo tienes 10 intentos");
}

const totalCards = 12;
const availableCards = ['A', 'R', 'M', 'J'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;
let score = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {

        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);


            if (++currentMove == 2) {

                function stopGame() {
                    location.reload();
                }

                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                if (dificultad == 2 && currentAttempts == 7) {
                    alert("HAS PERDIDO");
                    stopGame()
                }
                if (dificultad == 1 && currentAttempts == 10 || currentAttempts == 10) {
                    alert("HAS PERDIDO");
                    stopGame()
                }

                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectedCards = [];
                    score += 1;
                    console.log("Tu record es: " + score);
                    currentMove = 0;

                    if (score == 6) {
                        alert("FELICIDADES HAS GANADO EL NIVEL FACIL!!");
                        stopGame();
                    }
                    if (score == 6 && dificultad == 2) {
                        alert("FELICIDADES HAS GANADO EL NIVEL DIFICIL!!");
                        stopGame();
                    }

                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}