//var name=prompt("What is your name");

var globalhs = [];
var isGameOver = false;

var score = 0;
var check = true;
var highscore = 0;
var highscorelist = [];
window.onload = function () {
    highscore = localStorage.getItem('highscr');
    document.getElementById('highscr').innerText = highscore;
    highscorelist = localStorage.getItem('highscorelist');
    if (highscorelist == null) {
        highscorelist = []
    }
    highscorelist = highscorelist.split(',').map(function (item) {
        return parseInt(item, 10);
    });
    if (highscorelist.length >= 6) {
        highscorelist.pop();
        localStorage.setItem('highscorelist', highscorelist);
    }
    console.log("highscorelist array = " + highscorelist);
}
document.onkeydown = function (a) {
    if (a.keyCode == 32)
        isGameOver = false;

    if (isGameOver) {
        return;
    }

    if (a.keyCode == 38) {

        let dino = document.querySelector('.dino');
        dino.classList.add('animatedinoup');
        setTimeout(() => {
            dino.classList.remove('animatedinoup');
        }, 600);
    }
    else if (a.keyCode == 39) {
        let dino = document.querySelector('.dino');
        let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox + 112 + "px";
    }
    else if (a.keyCode == 37) {
        let dino = document.querySelector('.dino');
        let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox - 112 + "px"
    }
}

setInterval(() => {
    check = true;
}, 1000);
setInterval(() => {
    if (isGameOver) {
        return;
    }
    let dino = document.querySelector('.dino');
    let dragon = document.querySelector('.dragon');
    let gameover = document.querySelector('.gameover');

    let dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dinoy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    let dragonx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    let dragony = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('bottom'));
    let distancex = Math.abs(dinox - dragonx);
    let distancey = Math.abs(dinoy - dragony);

    if (distancex <= 140 && distancey <= 70) {
        gameover.style.visibility = 'visible';
        isGameOver = true;
        dragon.classList.remove('dragon');
        highscorelist.push(score);
        highscorelist.sort().reverse();
        localStorage.setItem('highscorelist', highscorelist);
    }
    else if (distancex < 100 && check) {
        score += 1;
        check = false;
    }
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscr', highscore);
        document.getElementById('highscr').innerText = highscore;
    }
    counter = document.getElementById('counter');
    counter.innerText = score;
}, 10);
