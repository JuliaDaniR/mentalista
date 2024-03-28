//Globales
let numeroSecreto = parseInt(Math.random() * 1000 + 1);
var rango = 1000;
var intentosTotales = parseInt(calcularIntentos(rango));

//funciones globales o genericas

// Función para calcular el número máximo de intentos
function calcularIntentos(maximo) {
  return Math.log2(maximo) + 1;
}

//funcion para asignar elementos por id
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.getElementById(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

//funcion para asignar imagenes
function asignarImagen(elemento, url, alt) {
  let imagen = document.getElementById(elemento);
  imagen.src = url;
  imagen.alt = alt;
}

function mostrarJuego(id) {
  // Ocultar todos los contenedores
  let contenedores = document.querySelectorAll(
    ".un-jugador, .multi-jugador , .ingresaNombre"
  );
  contenedores.forEach((contenedor) => {
    contenedor.style.display = "none";
  });

  // Mostrar el contenedor correspondiente al botón presionado
  let modoJuego = document.getElementById(id);
  if (modoJuego) {
    modoJuego.style.display = "flex";
  }

  let saludoElement = document.getElementById("saludo");
  if (saludoElement) {
    saludoElement.innerHTML = "HOLA " + nombre;
    saludoElement.innerHTML += "<br>¡¡¡ COMENCEMOS EL JUEGO !!!";
    saludoElement.innerHTML +=
      "<br>Tiene " +
      intentosTotales +
      " intentos para descubrir el número escondido";
    saludoElement.innerHTML += "<br>Ingrese un número entre 1 y " + rango;
  }

  let saludoElementTemp = document.getElementById("saludoJugadores");
  if (saludoElementTemp) {
    saludoElementTemp.innerHTML = "HOLA JUGADORES";
    saludoElementTemp.innerHTML += "<br>¡¡¡ COMENCEMOS EL JUEGO !!!";
    saludoElementTemp.innerHTML +=
      "<br>Tiene " +
      intentosTotales +
      " intentos para descubrir el número escondido";
    saludoElementTemp.innerHTML += "<br>Ingrese un número entre 1 y " + rango;
  }

  for (let i = 0; i < ordenJuego.length; i++) {
    asignarTextoElemento("turno", `Es el turno de ${ordenJuego[i]}`);
  }
}

function limpiarCaja() {
  document.querySelector("#numero").value = "";
  document.querySelector("#numeroIngresado").value = "";
}

function limpiarNombre() {
  // Obtener referencia al elemento de entrada de nombre
  const nombreInput = document.getElementById("nombre");
  // Obtener referncia al elemento de mensaje del turno
  const turno = document.getElementById("turno");

  // Establecer el contenido del elemento a una cadena vacía
  nombreInput.value = "";
  turno.value = "";
}

function limpiarIngresoNumero() {
  // Obtener referencia al elemento de entrada de número
  const numeroInput = document.getElementById("numero");
  //limpia la caja cantidad jugadores
  document.querySelector("#cantidad").value = "";
  // Establecer el contenido del elemento a una cadena vacía
  numeroInput.value = "";
}

function condicionesIniciales() {
  // Ocultar todos los contenedores
  let contenedores = document.querySelectorAll(
    ".un-jugador, .multi-jugador , .ingresaNombre"
  );
  contenedores.forEach((contenedor) => {
    contenedor.style.display = "none";
  });

  // Limpiar nombre
  limpiarNombre();

  // Reiniciar modo un jugador
  intentos = 0;
  intentosRestantes = intentosTotales - 1;

  // Reiniciar modo multijugador
  jugadores = [];
  ordenJuego = [];
  indiceJugadorActual = 0;
  intentosMulti = 0;
}

//Un jugador
let intentos = 0;
let nombre = "";
let intentosRestantes = intentosTotales - 1;

//Funcion que inicia el juego de un jugador
function saludo(id) {
  if (id != "multi") {
    //guarda el nombre ingresado por el usuario
    nombre = document.getElementById("nombre").value;
    console.log(nombre);
    if (nombre == "") {
      nombre = "USUARIO";
    }

    //boton para guardar el nombre e ir al juego
    let irJuego = document.getElementById("irJuego");

    //muestra el contenedor para escribir el nombre del jugador
    let contenedores = document.querySelectorAll(".ingresaNombre");
    contenedores.forEach((contenedor) => {
      contenedor.style.display = "block";
    });

    //Evento al hacer click oculta el contenedor de ingreso de nombre y verifica si el usuario ingreso un nombre y lo guarda
    irJuego.addEventListener("click", () => {
      let contenedores = document.querySelectorAll(".ingresaNombre");
      contenedores.forEach((contenedor) => {
        contenedor.style.display = "none";
        if (id === "jugador") {
          nombre = document.getElementById("nombre").value;
          console.log(nombre);
          if (nombre == "") {
            nombre = "Usuario";
          }
        }
      });
      console.log(numeroSecreto)
      mostrarJuego(id);
    });
  } else {
    console.log(numeroSecreto)
    mostrarJuego(id);
  }
}

// Función para verificar el intento en el juego de un solo jugador
function verificarIntento() {
  let numeroIngresado = parseInt(document.getElementById("numero").value);
  let ultimoNumeroIngresado = numeroIngresado;

  while (intentosRestantes > -1) {
    if (numeroIngresado === numeroSecreto) {
      asignarTextoElemento(
        "intentos",
        `INTENTOS RESTANTES: ${intentosRestantes}`
      );
      asignarTextoElemento(
        "ultimoNumeroIngresado",
        `ULTIMO NÚMERO INGRESADO: ${ultimoNumeroIngresado}`
      );
      asignarTextoElemento(
        "resultado",
        `Acertaste el número luego de ${intentos} ${intentos === 1 ? "intento" : "intentos"}`
      );
      asignarImagen(
        "imagenResultado",
        "https://i0.wp.com/tirotactico.net/wp-content/uploads/2013/11/bien-hecho.gif?fit=259%2C184&ssl=1"
      );
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
      if (numeroIngresado > numeroSecreto) {
        asignarTextoElemento(
          "intentos",
          `INTENTOS RESTANTES: ${intentosRestantes}`
        );
        asignarTextoElemento(
          "ultimoNumeroIngresado",
          `ULTIMO NÚMERO INGRESADO: ${ultimoNumeroIngresado}`
        );
        asignarTextoElemento("resultado", "El número secreto es menor");
        asignarImagen("imagenResultado", "intentar.png");
        if (intentosRestantes == 1) {
          asignarTextoElemento(
            "resultado",
            "Ultimo intento. <br> El número secreto es menor"
          );
          asignarImagen("imagenResultado", "ultima.png");
        }
      } else {
        asignarTextoElemento(
          "intentos",
          `INTENTOS RESTANTES: ${intentosRestantes}`
        );
        asignarTextoElemento(
          "ultimoNumeroIngresado",
          `ULTIMO NÚMERO INGRESADO: ${ultimoNumeroIngresado}`
        );
        asignarTextoElemento("resultado", "El número secreto es mayor");
        asignarImagen("imagenResultado", "intentar.png");
        if (intentosRestantes == 1) {
          asignarTextoElemento(
            "resultado",
            "Último intento. <br> El número secreto es mayor"
          );
          asignarImagen("imagenResultado", "ultima.png");
        }
      }
      intentosRestantes--;
      intentos++;
      limpiarCaja();
    }
    if (intentos == intentosTotales) {
      asignarTextoElemento(
        "resultado",
        `Se acabaron tus intentos <br> El número secreto era ${numeroSecreto} <br> ¡¡¡ VUELVE A JUGAR !!!`
      );
      asignarImagen("imagenResultado", "gameOver.png");
      document.getElementById("reiniciar").removeAttribute("disabled");
    }
    return;
  }
}

function limpiarResultados() {
  // Obtener referencias a los elementos de resultados
  const intentosElement = document.getElementById("intentos");
  const ultimoNumeroElement = document.getElementById("ultimoNumeroIngresado");
  const resultadoElement = document.getElementById("resultado");
  const imagenResultadoElement = document.getElementById("imagenResultado");

  // Establecer el contenido de los elementos a una cadena vacía
  intentosElement.textContent = "";
  ultimoNumeroElement.textContent = "";
  resultadoElement.textContent = "";
  imagenResultadoElement.setAttribute("src", "");
  imagenResultadoElement.setAttribute("alt", "");
}

function reiniciarJuego() {
  // Limpiar la caja de texto
  limpiarCaja();
  // Restablecer los elementos de resultados
  limpiarResultados();
  // Restablecer el campo de ingreso de número
  limpiarIngresoNumero();
  // Restablecer las condiciones iniciales del juego
  condicionesIniciales();
  // Generar un nuevo número secreto
  numeroSecreto = parseInt(Math.random() * 1000 + 1);
  // Reiniciar el contador de intentos
  intentos = 0;
  // Restablecer los intentos restantes
  intentosRestantes = intentosTotales - 1;

  reiniciarModoMultiJugador();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

//Multijugadores
let intentosMulti = 0;
let jugadores = [];
let ordenJuego = [];
let indiceJugadorActual = 0;

function asignarJugadores() {
  const botonCantidad = document.querySelector(".btn-enviar");
  const formularioJugadores = document.getElementById("formularioJugadores");
  const error = document.querySelector(".error");
  const contenedorCantidad = document.querySelector(".contenedorCantidad");
  const tablaJugadores = document.getElementById("tablaJugadores"); // Obtener referencia a la tabla

  botonCantidad.addEventListener("click", manejarEnvioCantidad);
  formularioJugadores.addEventListener("submit", manejarEnvioNombres);

  function manejarEnvioCantidad() {
    const cantidadJugadores = parseInt(
      document.getElementById("cantidad").value
    );
    if (cantidadJugadores > 4) {
      mostrarError("No puede haber más de 4 jugadores por partida");
    } else {
      ocultarContenedor(contenedorCantidad);
      mostrarFormularioNombres(cantidadJugadores);
      const jugadores = obtenerNombresJugadores();
      ordenJuego = sorteoJugadores(jugadores);
      console.log("jugadores envio cantidad " + jugadores);
      console.log("orden juego envio cantidad " + ordenJuego);
      actualizarTabla(ordenJuego, ordenJuego[0]); // Aquí se llama a actualizarTabla con el arreglo de jugadores y el primer jugador en el orden de juego
      mostrarJuego("multi");
    }
  }

  function manejarEnvioNombres(event) {
    event.preventDefault();
    const jugadores = obtenerNombresJugadores();
    ocultarFormulario();
    ordenJuego = sorteoJugadores(jugadores);
    console.log("jugadores envio nombres " + jugadores);
    console.log("orden juego envio nombres " + ordenJuego);
    actualizarTabla(ordenJuego, ordenJuego[0]); // Pasar la tabla como argumento
  }

  function mostrarError(mensaje) {
    error.textContent = mensaje;
  }

  function ocultarContenedor(contenedor) {
    contenedor.style.display = "none";
  }

  function mostrarFormularioNombres(cantidad) {
    document.querySelector(".ingresaNombreJugadores").style.display = "block";
    generarCamposJugadores(cantidad);
  }

  function generarCamposJugadores(cantidad) {
    let camposJugadoresHTML = "";
    for (let i = 1; i <= cantidad; i++) {
      camposJugadoresHTML += `
        <label for="nombreJugador${i}">Ingresa el nombre del jugador ${i}</label><br />
        <input class="nombreJugador" id="nombreJugador${i}" type="text" name="nombre" /><br />
      `;
    }
    document.getElementById("camposJugadores").innerHTML = camposJugadoresHTML;
  }

  function obtenerNombresJugadores() {
    const camposJugadores = document.querySelectorAll(".nombreJugador");
    console.log("campos jugadores " + camposJugadores);
    return Array.from(camposJugadores).map((campo) => campo.value);
  }

  function ocultarFormulario() {
    document.querySelector(".ingresaNombreJugadores").style.display = "none";
    document.querySelector(".aJugar").style.display = "block";
  }

  function actualizarTabla(ordenJuego, turno) {
    // Obtener referencia a la tabla
    const tabla = document.getElementById("tablaJugadores");

    // Limpiar la tabla
    tabla.innerHTML = "";

    // Agregar títulos de la tabla
    const thead = tabla.createTHead();
    const tituloRow = thead.insertRow();
    const titulos = ["Posición", "Jugador", "Último número"];
    titulos.forEach((titulo) => {
      const th = document.createElement("th");
      th.textContent = titulo;
      tituloRow.appendChild(th);
    });

    // Crear filas y celdas para cada jugador
    ordenJuego.forEach((jugador, index) => {
      const fila = tabla.insertRow();
      const celdaPosicion = fila.insertCell(0);
      const celdaJugador = fila.insertCell(1);
      const celdaUltimoNumero = fila.insertCell(2);

      celdaPosicion.textContent = index + 1; // El índice + 1 para mostrar la posición
      celdaJugador.textContent = jugador; // Aquí solo se asigna el nombre del jugador
      celdaUltimoNumero.textContent = ""; // Aquí puedes asignar el último número si lo deseas
    });

    // Mostrar el turno
    const turnoElement = document.getElementById("turno");
    turnoElement.textContent = "Es el turno de " + turno;
  }
}

// Función para realizar el sorteo de los jugadores
function sorteoJugadores(jugadores) {
  let posiciones = [];
  let jugadoresNoSeleccionados = jugadores.slice(); // Copia de la matriz de jugadores

  // Mientras haya jugadores no seleccionados
  while (jugadoresNoSeleccionados.length > 0) {
    // Obtener un índice aleatorio dentro del rango de los jugadores no seleccionados
    let index = Math.floor(Math.random() * jugadoresNoSeleccionados.length);
    // Agregar el jugador en la posición aleatoria a las posiciones seleccionadas
    posiciones.push(jugadoresNoSeleccionados[index]);
    // Eliminar al jugador seleccionado de la lista de jugadores no seleccionados
    jugadoresNoSeleccionados.splice(index, 1);
  }

  return posiciones;
}

let jugadorActualIndex = 0; // Índice del jugador actual

function verificarIntentoMulti() {
  let numeroIngresado = parseInt(
    document.getElementById("numeroIngresado").value
  );
  let ultimoNumeroIngresado = numeroIngresado;
  let jugadorGanador = ""; // Variable para almacenar el nombre del jugador ganador

  // Obtener el nombre del jugador actual en base al turno
  let jugadorActual = ordenJuego[jugadorActualIndex];

  console.log(numeroSecreto);
  // Obtener el índice del próximo jugador
  jugadorActualIndex = (jugadorActualIndex + 1) % ordenJuego.length;

  // Mostrar el turno del próximo jugador
  asignarTextoElemento(
    "turno",
    `Es el turno de ${ordenJuego[jugadorActualIndex]}`
  );

  // Actualizar la tabla con el último número ingresado por el jugador
  const tabla = document.getElementById("tablaJugadores");
  const filaActual =
    tabla.rows[ordenJuego.indexOf(jugadorActual) + 1]; // +1 porque la primera fila es el encabezado
  const celdaUltimoNumero = filaActual.cells[2]; // Índice de la celda "Último número"
  celdaUltimoNumero.textContent = isNaN(numeroIngresado)
    ? ""
    : numeroIngresado;

  // Verificar si el número ingresado es correcto
  if (numeroIngresado === numeroSecreto) {
    jugadorGanador = jugadorActual; // Almacenar el nombre del jugador ganador
  }

  // Verificar si se agotaron los intentos
  if (intentosRestantes === 0) {
    asignarTextoElemento(
      "resultadoMulti",
      `Se acabaron tus intentos. El número secreto era ${numeroSecreto}. ¡VUELVE A JUGAR!`
    );
    asignarImagen("imagenResultadoMulti", "gameOver.png");
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    // Verificar si hay un ganador y mostrar el mensaje correspondiente
    if (jugadorGanador !== "") {
      asignarTextoElemento(
        "resultadoMulti",
        `¡Felicidades el número secreto era ${numeroSecreto} y ${jugadorGanador} ha acertado el número luego de ${intentosMulti} ${
          intentosMulti === 1 ? "intento" : "intentos"
        }!`
      );
      asignarImagen("imagenResultadoMulti", "logrado.png");
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
      // Mostrar el mensaje de intento incorrecto
      if (numeroIngresado > numeroSecreto) {
        asignarTextoElemento("resultadoMulti", "El número secreto es menor");
        asignarTextoElemento(
          "intentosMulti",
          `INTENTOS RESTANTES: ${intentosRestantes}`
        );
        asignarImagen("imagenResultadoMulti", "intentar.png");
        if (intentosRestantes == 1) {
          asignarTextoElemento(
            "resultadoMulti",
            `Ultimo intento. El número secreto es menor`
          );
          asignarImagen("imagenResultadoMulti", "ultima.png");
        }
      } else {
        asignarTextoElemento("resultadoMulti", "El número secreto es mayor");
        asignarTextoElemento(
          "intentosMulti",
          `INTENTOS RESTANTES: ${intentosRestantes}`
        );
        asignarImagen("imagenResultadoMulti", "intentar.png");
        if (intentosRestantes == 1) {
          asignarTextoElemento(
            "resultadoMulti",
            `Ultimo intento. El número secreto es mayor`
          );
          asignarImagen("imagenResultadoMulti", "ultima.png");
        }
      }
    }
    intentosRestantes--;
    intentosMulti++;
    limpiarCaja();
  }
}

function reiniciarModoMultiJugador() {
  // Limpiar la tabla de jugadores
  limpiarTablaJugadores();

  limpiarResultadosMulti();

  // Ocultar el formulario para ingresar la cantidad de jugadores y nombres
  document.querySelector(".contenedorCantidad").style.display = "block";
  document.querySelector(".ingresaNombreJugadores").style.display = "none";

  // Restablecer el turno al primer jugador (puedes omitir esto si prefieres que el turno no aparezca hasta que se ingresen los jugadores)
  jugadorActualIndex = 0;
  asignarTextoElemento("turno", ""); // Vaciar el contenido del elemento de turno
}

function limpiarTablaJugadores() {
  const tablaJugadores = document.getElementById("tablaJugadores");
  // Limpiar todas las filas excepto la primera (encabezado)
  while (tablaJugadores.rows.length > 1) {
    tablaJugadores.deleteRow(1);
  }
}

function limpiarResultadosMulti() {
  // Obtener referencias a los elementos de resultados
  const intentosElementMulti = document.getElementById("intentosMulti");
  const resultadoElementMulti = document.getElementById("resultadoMulti");
  const imagenResultadoElementMulti = document.getElementById(
    "imagenResultadoMulti"
  );

  // Establecer el contenido de los elementos a una cadena vacía
  intentosElementMulti.textContent = "";
  resultadoElementMulti.textContent = "";
  imagenResultadoElementMulti.setAttribute("src", "");
  imagenResultadoElementMulti.setAttribute("alt", "");
}
