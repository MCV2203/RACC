// ===============================
// ELEMENTOS
// ===============================
const imgs = document.querySelectorAll(".carretera img");
const carretera = document.querySelector(".carretera");
const contenedor = document.querySelector(".carretera-container");

const indicadorAlcohol = document.getElementById("cuadro1");
const indicadorFumar = document.getElementById("cuadro2");
const indicadorSueno = document.getElementById("cuadro3");
const indicadorMovil = document.getElementById("cuadro4");

// ===============================
// VARIABLES
// ===============================
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
  movil: false,
};

// ===============================
// SLIDESHOW
// ===============================
function mostrarSiguiente() {
  imgs.forEach((img) => img.classList.remove("active"));
  imgs[index].classList.add("active");
  index = (index + 1) % imgs.length;
}
setInterval(mostrarSiguiente, 130);

// ===============================
// TECLADO
// ===============================
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft = true;
  if (e.key === "ArrowRight") moveRight = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") moveLeft = false;
  if (e.key === "ArrowRight") moveRight = false;
});

// ===============================
// EFECTOS BOTONES
// ===============================
document.getElementById("cuadro1").addEventListener("click", () =>
efectos.alcohol = !efectos.alcohol);
document.getElementById("cuadro2").addEventListener("click", () =>
efectos.fumar = !efectos.fumar);
document.getElementById("cuadro3").addEventListener("click", () =>
efectos.sueno = !efectos.sueno);
document.getElementById("cuadro4").addEventListener("click", () =>
crearTelefonoDerecha());

// ===============================
// HUMO
// ===============================
function crearHumo() {
  if (!efectos.fumar) return;

  const nube = document.createElement("div");
  nube.classList.add("humo-nube");
  nube.style.left = Math.random() * 1100 + "px";
  nube.style.bottom = "0px";
  contenedor.appendChild(nube);

  let y = 0;
  const anim = setInterval(() => {
    y += 2;
    nube.style.bottom = y + "px";
    if (y > 700) {
      clearInterval(anim);
      nube.remove();
    }
  }, 30);
}

// ===============================
// TELÉFONO
// ===============================
function crearTelefonoDerecha() {
  if (document.querySelector(".telefono-racc")) return;

  const telefono = document.createElement("div");
  telefono.classList.add("telefono-racc");
  telefono.style.left = "850px";
  telefono.style.top = "100px";

  telefono.innerHTML = `
    <div class="pantalla1-racc">
      <p><strong>Introduce Contraseña - RACC</strong></p>
      <div class="entrada">
        <input type="password" class="clave-racc" placeholder="Contraseña" />
        <button class="btn-comprobar">↵</button>
      </div>
      <p class="error mensaje-racc"></p>
    </div>
    <div class="pantalla2-racc">
      <h2>🔓 Desbloqueado</h2>
      <p>Bienvenido</p>
      <button class="btn-quitar">❌ Quitar Teléfono</button>
    </div>
  `;

  const pantalla1 = telefono.querySelector(".pantalla1-racc");
  const pantalla2 = telefono.querySelector(".pantalla2-racc");
  const input = telefono.querySelector(".clave-racc");
  const mensaje = telefono.querySelector(".mensaje-racc");
  const btnComprobar = telefono.querySelector(".btn-comprobar");
  const btnQuitar = telefono.querySelector(".btn-quitar");

  btnComprobar.addEventListener("click", () => {
    if (input.value === "RACC") {
      pantalla1.style.display = "none";
      pantalla2.style.display = "flex";
    } else {
      mensaje.innerText = "❌ Contraseña incorrecta";
    }
  });

  btnQuitar.addEventListener("click", () => telefono.remove());

  contenedor.appendChild(telefono);
}

// ===============================
// INDICADORES
// ===============================
function actualizarIndicadores() {
  indicadorAlcohol.style.borderColor = efectos.alcohol ? "green" : "red";
  indicadorFumar.style.borderColor = efectos.fumar ? "green" : "red";
  indicadorSueno.style.borderColor = efectos.sueno ? "green" : "red";
  indicadorMovil.style.borderColor = efectos.movil ? "green" : "red";
}

// ===============================
// ABUELA (OBSTÁCULO) + HITBOX COCHE
// ===============================
const cocheHitbox = document.createElement('div');
cocheHitbox.id = 'coche-hitbox';
contenedor.appendChild(cocheHitbox);

const cocheWidth = 250;
const cocheHeight = 150;
cocheHitbox.style.width = cocheWidth + 'px';
cocheHitbox.style.height = cocheHeight + 'px';
cocheHitbox.style.position = 'absolute';
cocheHitbox.style.top = contenedor.offsetHeight - cocheHeight - 30 + 'px';
cocheHitbox.style.left = contenedor.offsetWidth/2 - cocheWidth/2 + 'px';
cocheHitbox.style.zIndex = 12;
cocheHitbox.style.pointerEvents = 'none';

const obstaculo = document.createElement('div');
obstaculo.classList.add('obstaculo');
contenedor.appendChild(obstaculo);

let obstaculoY = contenedor.offsetHeight * 0.33;
let obstaculoX = Math.random() * (contenedor.offsetWidth - 80);

const overlayGameOver = document.createElement('div');
overlayGameOver.classList.add('gameover-overlay');
overlayGameOver.style.position = 'absolute';
overlayGameOver.style.top = 0;
overlayGameOver.style.left = 0;
overlayGameOver.style.width = '100%';
overlayGameOver.style.height = '100%';
overlayGameOver.style.backgroundColor = 'rgba(0,0,0,0.8)';
overlayGameOver.style.display = 'flex';
overlayGameOver.style.flexDirection = 'column';
overlayGameOver.style.justifyContent = 'center';
overlayGameOver.style.alignItems = 'center';
overlayGameOver.style.color = '#000';
overlayGameOver.style.fontFamily = 'Arial, sans-serif';
overlayGameOver.style.fontSize = '60px';
overlayGameOver.style.zIndex = 100;
overlayGameOver.style.display = 'none';
contenedor.appendChild(overlayGameOver);

let gameOver = false;

function checkCollision(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return (
    r1.left < r2.right &&
    r1.right > r2.left &&
    r1.top < r2.bottom &&
    r1.bottom > r2.top
  );
}

function perder() {
  if(gameOver) return;
  gameOver = true;
  overlayGameOver.innerHTML = `
    <h1 style="color: #ffd829; background-color: #000000; padding:
20px 40px; margin-bottom: 0; border: 3px solid #ffd829; border-radius:
10px; font-family: Garamond, serif; text-align: center;">HAS
PERDIDO</h1>
    <p style="color: #ffd829; background-color: #000000; padding: 20px
40px; margin-bottom: 0; margin-top: 10px; margin-left: 30px;
margin-right: 30px; border: 3px solid #ffd829; border-radius: 10px;
font-family: Garamond, serif; text-align: center;">Cada distracción
tiene un precio… conduce con cuidado.</p>
    <button id="reiniciar-btn" style="margin-top:30px; padding:15px
30px; font-size:30px; font-family: Garamond, serif; background-color:
#ffd829; color: #000; border: 3px solid black; border-radius: 10px;
cursor: pointer;">VOLVER A EMPEZAR</button>
  `;
  overlayGameOver.style.display = 'flex';
  const btn = document.getElementById('reiniciar-btn');
  btn.addEventListener('mouseenter', ()=> btn.style.backgroundColor =
'#e6c520');
  btn.addEventListener('mouseleave', ()=> btn.style.backgroundColor =
'#ffd829');
  btn.addEventListener('click', ()=> location.reload());
}

// ===============================
// GAME LOOP
// ===============================
function gameLoop() {
  if(gameOver) return;

  controlesInvertidos = efectos.alcohol;

  if (moveLeft) {
    offsetX = controlesInvertidos
      ? Math.max(offsetX - speed, -600)
      : Math.min(offsetX + speed, 0);
  }

  if (moveRight) {
    offsetX = controlesInvertidos
      ? Math.min(offsetX + speed, 0)
      : Math.max(offsetX - speed, -600);
  }

  carretera.style.transform = `translateX(${offsetX}px)`;
  carretera.classList.toggle("blur", efectos.alcohol);
  carretera.classList.toggle("humo", efectos.fumar);
  carretera.classList.toggle("sueno", efectos.sueno);

  if (efectos.fumar) crearHumo();

  // ===============================
  // MOVER OBSTÁCULO ABUELA
  // ===============================
  obstaculoY += 4;
  if(obstaculoY > contenedor.offsetHeight){
    obstaculoY = contenedor.offsetHeight * 0.33;
    obstaculoX = Math.random() * (contenedor.offsetWidth - 80);
  }
  obstaculo.style.left = obstaculoX + offsetX + 'px';
  obstaculo.style.top = obstaculoY + 'px';

  let maxScale = 3;
  let minScale = 0.1;
  let progreso = (obstaculoY - contenedor.offsetHeight * 0.33) /
(contenedor.offsetHeight - contenedor.offsetHeight * 0.33);
  let scale = minScale + Math.pow(progreso, 0.5) * (maxScale - minScale);
  if(scale > maxScale) scale = maxScale;
  obstaculo.style.transform = `scale(${scale})`;

  if(checkCollision(cocheHitbox, obstaculo)) perder();

  actualizarIndicadores();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
// obstáculo
obstaculo.style.zIndex = 15;  // entre overlay y coche

// OVERLAY DE SUEÑO (ZZZ) GLOBAL
const overlaySueno = document.createElement('div');
overlaySueno.classList.add('sueno-overlay');
contenedor.appendChild(overlaySueno);

// ===============================
// EFECTOS ALEATORIOS EN CADENA
// ===============================
function activarEfectoAleatorioCadena() {
  const lista = ["alcohol", "fumar", "sueno", "movil"];
  const elegido = lista[Math.floor(Math.random() * lista.length)];
  efectos[elegido] = true;

  if (elegido === "movil") crearTelefonoDerecha();

  const duracion = elegido === "sueno" ? 2000 : 5000;

  setTimeout(() => {
    efectos[elegido] = false;
    setTimeout(activarEfectoAleatorioCadena, 1000);
  }, duracion);
}

activarEfectoAleatorioCadena();