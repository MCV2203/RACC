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
// UN SOLO TELÉFONO A LA DERECHA
// ===============================
function crearTelefonoDerecha() {
  // Evita que aparezcan varios
  if (document.querySelector(".telefono-racc")) return;

  const telefono = document.createElement("div");
  telefono.classList.add("telefono-racc");

  // Posición fija a la derecha dentro del coche
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
    const contraseña = input.value;

    if (contraseña === "RACC") {
      pantalla1.style.display = "none";
      pantalla2.style.display = "flex";
    } else {
      mensaje.innerText = "❌ Contraseña incorrecta";
    }
  });

  btnQuitar.addEventListener("click", () => {
    telefono.remove();
  });

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

  if (elegido === "movil") crearTelefonoDerecha();

  const duracion = elegido === "sueno" ? 2000 : 5000;

  setTimeout(() => {
    efectos[elegido] = false;
    setTimeout(activarEfectoAleatorioCadena, 1000);
  }, duracion);
}

// iniciar efectos
activarEfectoAleatorioCadena();