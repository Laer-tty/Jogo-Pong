//variaveis da bola
let xBola = 300;
let yBola = 200;
let diametro = 20;
let raio = diametro/2;

//velocidade da bola
let velocidadexBola = 6;
let velocidadeyBola = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let baseRaquete = 10;
let alturaRaquete = 80;

//variaveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;


let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//variaveis sons do jogo
let raquetada;
let ponto;

function preload() {
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
}


function draw() {
  background(0);
  
  criaBola();
  criaRaquete(xRaquete,yRaquete);
  criaRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaBola();
  movimentaRaquete();
  movimentaRaqueteOponente();
  verificaBordaBola();
  colisaoRaquete(xRaquete, yRaquete)
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente)
  incluirPlacar();
  marcarPonto();
  bolaErro();
}

function criaBola() {
  circle(xBola,yBola,diametro);
}

function criaRaquete(x,y) {
  rect(x,y,baseRaquete,alturaRaquete);
}


function movimentaBola() {
  xBola += velocidadexBola;
  yBola += velocidadeyBola;
}

function movimentaRaquete() {
  
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 4;
  }
  
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 4;
  }
   yRaquete = constrain(yRaquete, 0, 310);
}
  
function movimentaRaqueteOponente() {
  if (keyIsDown(83)) {
    yRaqueteOponente += 4;
  }
  
  if (keyIsDown(87)) {
    yRaqueteOponente -= 4;
  }
  
  yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}


function verificaBordaBola() {
  if (xBola + raio > width || xBola - raio < 0) {
    velocidadexBola *= -1;
  }
  
  if (yBola + raio > height || yBola - raio < 0) {
    velocidadeyBola *= -1;
  }
}

function colisaoRaquete(x,y) {
  colidiu = collideRectCircle(x, y, baseRaquete, alturaRaquete, xBola, yBola, raio);
  if (colidiu) {
    velocidadexBola *= -1
    raquetada.play();
  }
}

function incluirPlacar() {
  stroke(color(128,0,128))
  textSize(16);
  textAlign(CENTER)

  fill(color(139,0,139))
  rect(150, 10, 40, 20)
  fill(255);
  text(meusPontos, 170, 26);

  fill(color(139,0,139))
  rect(450, 10, 40, 20)
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcarPonto() {
  if (xBola > 590) {
    meusPontos++;
    ponto.play();
  }
  
  if (xBola < 10) {
    pontosOponente++;
    ponto.play();
  }
}

function bolaErro(){
    if (xBola - raio < 0){
    xBola = 30
    }
    if (xBola + raio > 600){
      xBola = 570
    }
}
