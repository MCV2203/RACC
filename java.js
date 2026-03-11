// ELEMENTOS
const imgs = document.querySelectorAll('.carretera img');
const carretera = document.querySelector('.carretera');
const contenedor = document.querySelector('.carretera-container');

const boton1 = document.getElementById('cuadro1'); // alcohol
const boton2 = document.getElementById('cuadro2'); // fumar
const boton3 = document.getElementById('cuadro3'); // sueño
const boton4 = document.getElementById('cuadro4'); // móvil

// OVERLAYS
const overlaySueno = document.createElement('div');
overlaySueno.classList.add('sueno-overlay');
contenedor.appendChild(overlaySueno);

const overlayHumo = document.createElement('div');
overlayHumo.classList.add('humo-overlay');
contenedor.appendChild(overlayHumo);

// VARIABLES
let index = 0;
let offsetX = 0;
let speed = 5;
let moveLeft = false;
let moveRight = false;
let controlesInvertidos = false;

const efectos = {
  alcohol: false,
  fumar: false,
  sueno: false,
  movil: false
};

// SLIDESHOW
function mostrarSiguiente() {
  imgs.forEach(img => img.classList.remove('active'));
  imgs[index].classList.add('active');
  index = (index + 1) % imgs.length;
}
setInterval(mostrarSiguiente, 130);

// TECLADO
document.addEventListener('keydown', e => {
  if(e.key==='ArrowLeft') moveLeft=true;
  if(e.key==='ArrowRight') moveRight=true;
});
document.addEventListener('keyup', e => {
  if(e.key==='ArrowLeft') moveLeft=false;
  if(e.key==='ArrowRight') moveRight=false;
});

// BOTONES
boton1.addEventListener('click', () => efectos.alcohol = !efectos.alcohol);
boton2.addEventListener('click', () => efectos.fumar = !efectos.fumar);
boton3.addEventListener('click', () => {
  efectos.sueno = !efectos.sueno;
  if(efectos.sueno){
    overlaySueno.style.animation = 'parpadeo-lento 3s ease-in-out infinite';
  } else {
    overlaySueno.style.animation = 'none';
    overlaySueno.style.opacity = 0;
  }
});
boton4.addEventListener('click', () => {
  efectos.movil = !efectos.movil;
  if(efectos.movil) crearMovilesAleatorios();
});

// FUNCIONES EFECTOS
function crearHumo() {
  if(!efectos.fumar) {
    overlayHumo.style.opacity = 0;
    return;
  }
  overlayHumo.style.opacity = 1;

  const nube = document.createElement('div');
  nube.classList.add('humo-nube');
  nube.style.left = Math.random()*1100+'px';
  contenedor.appendChild(nube);

  setTimeout(()=>{
    nube.remove();
    if(!document.querySelector('.humo-nube')) overlayHumo.style.opacity = 0;
  },5000);
}

function crearMovilesAleatorios() {
  const cantidad = 4 + Math.floor(Math.random()*2);
  for(let i=0;i<cantidad;i++){
    const movil = document.createElement('div');
    movil.classList.add('movil-nube');
    movil.style.left = Math.random()*1100+'px';
    movil.style.top = Math.random()*500+'px';
    movil.textContent='📱';
    const boton = document.createElement('button');
    boton.textContent='X';
    boton.addEventListener('click',()=>movil.remove());
    movil.appendChild(boton);
    contenedor.appendChild(movil);
  }
}

// GAME LOOP
function gameLoop(){
  controlesInvertidos = efectos.alcohol;

  if(moveLeft){
    offsetX = controlesInvertidos 
      ? Math.max(offsetX-speed,-600)
      : Math.min(offsetX+speed,0);
  }
  if(moveRight){
    offsetX = controlesInvertidos
      ? Math.min(offsetX+speed,0)
      : Math.max(offsetX-speed,-600);
  }

  carretera.style.transform = `translateX(${offsetX}px)`;
  carretera.classList.toggle('blur', efectos.alcohol);

  if(efectos.fumar) crearHumo();

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);