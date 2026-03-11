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
// MÓVILES CON BOTÓN (solo desaparecen manualmente)
// ===============================
function crearMovilesAleatorios() {
  const cantidad = 4 + Math.floor(Math.random() * 2); // 4 o 5
  for (let i = 0; i < cantidad; i++) {
    const movil = document.createElement("div");
    movil.classList.add("movil-nube");
    movil.style.left = Math.random() * 1100 + "px";
    movil.style.top = Math.random() * 500 + "px";
    movil.textContent = "📱";

    const boton = document.createElement("button");
    boton.addEventListener("click", () => movil.remove());
    movil.appendChild(boton);

    contenedor.appendChild(movil);

    // ❌ Eliminamos la eliminación automática
    // setTimeout(()=> movil.remove(), 4000);
  }
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
// GAME LOOP
// ===============================
function gameLoop() {
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

  actualizarIndicadores();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// ===============================
// EFECTOS ALEATORIOS EN CADENA
// ===============================
function activarEfectoAleatorioCadena() {
  const lista = ["alcohol", "fumar", "sueno", "movil"];
  const elegido = lista[Math.floor(Math.random() * lista.length)];
  efectos[elegido] = true;

  if (elegido === "movil") crearMovilesAleatorios();

  const duracion = elegido === "sueno" ? 2000 : 5000;

  setTimeout(() => {
    efectos[elegido] = false;
    setTimeout(activarEfectoAleatorioCadena, 1000); // respiro 1s
  }, duracion);
}

// iniciar efectos
activarEfectoAleatorioCadena();