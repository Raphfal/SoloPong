const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
let boutonGauche = document.getElementById('gauche');
let boutonDroite = document.getElementById('droite');
let score = document.getElementById('score');
let xBalle;
let yBalle;
let xBarre = canvas.width * 0.375;
let yBarre = canvas.height * 0.9;
let vitesse = 3;
let vitesseX;
let vitesseY;
let colorPrimary = "black";
let animationBalle;
let directionGauche1Droite2;
let tailleBalle = 10;
let deplaceDroite = false;
let deplaceGauche = false;
let start;
let estJeuActif = false;
// Si le resultat du random et 1 la balle sera tiré
//  vers la gauche dans une direction aléatoire
//  sinon elle partira a droite


function choixDirection() {
    directionGauche1Droite2 = Math.floor(Math.random() * 2) + 1;
    vitesseX = Math.floor(Math.random() * (vitesse - vitesse / 2 + 1) + vitesse);
    directionGauche1Droite2 == 1 ? vitesseX : vitesseX = -vitesseX;
}

function chrono() {
    if (estJeuActif == true) {
        temps = Date.now() - start;
        score.textContent = "scores : " + (Number(temps / 1000).toFixed(1)) + " s";
    }
}

function lancerJeu() {
    estJeuActif = true;
    start = Number(Date.now()).toFixed(2);
    choixDirection();
    vitesseY = Math.floor(Math.random() * (vitesse - vitesse / 2 + 1) + vitesse);
    // console.log(vitesseX);   
    // console.log(vitesseY);  
    ctx.strokeStyle = colorPrimary;
    ctx.fillStyle = colorPrimary;
    actif = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    xBalle = canvas.width * 0.5;
    yBalle = canvas.height * 0.85;
    xBarre = canvas.width * 0.375;
    ctx.arc(xBalle, yBalle, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    jeu();
}

function jeu() {
    cancelAnimationFrame(animationBalle);
    rafraichir();
}

function balle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    xBalle = xBalle - vitesseX;
    yBalle = yBalle - vitesseY;
    ctx.arc(xBalle, yBalle, tailleBalle, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

function barre() {
    ctx.beginPath();
    ctx.strokeStyle = colorPrimary;
    ctx.fillStyle = colorPrimary;
    if (estJeuActif) {
        if (deplaceDroite == true && (xBarre >= 0)) xBarre = xBarre + vitesse * 1.2;
        if (deplaceGauche == true) xBarre = xBarre - vitesse * 1.2;
        if (xBarre <= 0)
            xBarre = 0;
        if (xBarre >= canvas.width - 80) xBarre = canvas.width - 80;
    }
    ctx.fillRect(xBarre, yBarre, 80, 10);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.closePath();
}

function rafraichir() {
    chrono();
    balleTouche();
    balle();
    barre();
    animationBalle = requestAnimationFrame(rafraichir);
}

function balleTouche() {
    xBalle - tailleBalle <= 0 ? vitesseX = - vitesseX : null;
    xBalle + tailleBalle >= canvas.width ? vitesseX = - vitesseX : null;
    yBalle - tailleBalle <= 0 ? vitesseY = - vitesseY : null;
    if (yBalle + tailleBalle >= canvas.height) {
        finPartie();
    }
    if ((yBalle >= yBarre - 10 && yBalle <= yBarre + 10) && (xBalle >= xBarre && xBalle <= xBarre + 80)) {

        if (xBalle <= (xBarre + 80) / 2) {
            vitesseX = -vitesseX;
            vitesseY = -vitesseY;
        }
        else {
            vitesseY = -vitesseY;
        }
    }
}
function finPartie() {
    estJeuActif = false;
    vitesseX = 0;
    vitesseY = 0;
    cancelAnimationFrame(animationBalle);
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
}

boutonDroite.addEventListener("mousedown", () => { deplaceDroite = true });
boutonDroite.addEventListener("mouseup", () => { deplaceDroite = false });

boutonGauche.addEventListener("mousedown", () => { deplaceGauche = true });
boutonGauche.addEventListener("mouseup", () => { deplaceGauche = false });

