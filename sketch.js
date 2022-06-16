// Configurações gerais do jogo
  let VelocidadeBolinha = 6  //Dificuldade do jogo
      dificuldadeOponente = 30
      chanceDeErrar = 0
      larguraraquete = 5     //Padrão = 5
      alturaraquete = 60     //Padrão = 60
      posicaoXraquetes = 5   //Padrão = 5
      posicaoYraquetes = 175 //Padrão = 175
      tamanhoBolinha = 15    //Padrão = 15
      tamanhoXdojogo = 600   //Padrão = 600
      tamanhoYdojogo = 400   //Padrão = 400


//Configurações especificas do jogo
  //Configrações da bolinha
    let xBolinha = 300
        yBolinha = 200
        diametro = tamanhoBolinha
        raio = diametro / 2

  //Velocidade da bolinha
    let velocidadeXbolinha = VelocidadeBolinha
        velocidadeYbolinha = VelocidadeBolinha

  //Configurações da minha raquete
    let xMinharaquete = posicaoXraquetes
        yMinharaquete = posicaoYraquetes
        wMinharaquete = larguraraquete
        hMinharaquete = alturaraquete
    let velocidadeYRaqueteOponente

  //Configurações da raquete oponente
    let xRaqueteoponente = tamanhoXdojogo-(posicaoXraquetes+posicaoXraquetes) 
        yRaqueteoponente = posicaoYraquetes
        wRaqueteoponente = larguraraquete
        hRaqueteoponente = alturaraquete

  //Placar
  let meusPontos = 0
      pontosDoOponente = 0

  //Sons do jogo
  let raquetada;
  let ponto;
  let trilha;

function preload (){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(tamanhoXdojogo, tamanhoYdojogo);
  trilha.loop()
}

function draw() {
  background(0);
  configuracaoBolinha();
  movimentaBolinha();
  reconheceBorda();
  configuracaoMinhaRaquete ();
  movimentaMinharaquete ();
  colisaoMinharaquete();
  configuracaoRaqueteOponente();
  movimentaRaqueteoponente();
  colisaoRaqueteOponente();
  mostraPlacar();
  marcaPonto();
}

function configuracaoBolinha(){
  circle(xBolinha, yBolinha, diametro)
  
}

function movimentaBolinha (){
  xBolinha += velocidadeXbolinha
  yBolinha += velocidadeYbolinha
  
}

function reconheceBorda (){
  if (xBolinha + raio > width || xBolinha - raio < 0 ){
      (velocidadeXbolinha *= -1)
      } 
   if (yBolinha + raio > height || yBolinha - raio < 0 ){
      (velocidadeYbolinha *= -1)
      } 
}

function configuracaoMinhaRaquete (){
  rect (xMinharaquete, yMinharaquete, wMinharaquete, hMinharaquete)
}

function movimentaMinharaquete (){
  if (keyIsDown (UP_ARROW)){
    yMinharaquete -= 10      
      }
  if (keyIsDown (DOWN_ARROW)){
    yMinharaquete += 10      
      }
}

function colisaoMinharaquete (){
      if (xBolinha - raio < xMinharaquete + wMinharaquete
        && yBolinha - raio < yMinharaquete + hMinharaquete
        && yBolinha + raio > yMinharaquete) {
        velocidadeXbolinha *= -1;raquetada.play()}
}

function configuracaoRaqueteOponente (){
  rect (xRaqueteoponente, yRaqueteoponente, wRaqueteoponente, hRaqueteoponente)
}

function movimentaRaqueteoponente (){
  velocidadeYRaqueteOponente = yBolinha - yRaqueteoponente - hRaqueteoponente / 2 -dificuldadeOponente;
  yRaqueteoponente += velocidadeYRaqueteOponente + chanceDeErrar
  calculaChanceDeErrar ();
}

function colisaoRaqueteOponente (){
      if (xBolinha + raio > xRaqueteoponente
         && yBolinha + raio < yRaqueteoponente + hRaqueteoponente
         && yBolinha + raio > yRaqueteoponente
         ) {
        velocidadeXbolinha *= -1; raquetada.play()}
}

function mostraPlacar (){
  stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(180, 10, 40, 20);
    fill(255);
    text(meusPontos, 200, 26);
    fill(color(255, 140, 0));
    rect(400, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 420, 26);
}

function marcaPonto (){
  if (xBolinha > 590){ 
    meusPontos += 1; ponto.play()      
      }
  if (xBolinha < 10) {
    pontosDoOponente += 1; ponto.play()
  }
}
function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = hRaqueteoponente + 11
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}