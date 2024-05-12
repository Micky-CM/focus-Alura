//Constantes para elementos del DOM
const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonLargo = document.querySelector('.app__card-button--largo')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const botonIniciarPausar = document.querySelector('#start-pause')
const iconoIniciarPausar = document.querySelector('.app__card-primary-button-icon')
const textoIniciarPausar = document.querySelector('#start-pause span')
const tiempoEnPantalla = document.querySelector('#timer')

//Instancias para sonidos
const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const audioPlay = new Audio('./sonidos/play.wav')
const audioPause = new Audio('./sonidos/pause.mp3')
const audioEnd = new Audio('./sonidos/beep.mp3')

//Variables
let tiempoEnSegundos = 1500
let idIntervalo = null

//Funciones de cuenta regresiva
const cuentaRegresiva = ()=> {
  if(tiempoEnSegundos <= 0) {
    audioEnd.play()
    alert('tiempo terminado')
    reiniciar()
    return
  }
  iconoIniciarPausar.setAttribute('src', './imagenes/pause.png')
  textoIniciarPausar.textContent = "Pausar"
  tiempoEnSegundos -= 1
  mostrarTiempo()
}
botonIniciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar() {
  if(idIntervalo) {
    audioPause.play()
    reiniciar()
    return
  }
  audioPlay.play()
  idIntervalo = setInterval(cuentaRegresiva, 1000)
}
function reiniciar() {
  clearInterval(idIntervalo)
  idIntervalo = null
  iconoIniciarPausar.setAttribute('src', './imagenes/play_arrow.png')
  textoIniciarPausar.textContent = "Comenzar"
}

//Funciones para cronometro
function mostrarTiempo() {
  const tiempo = new Date(tiempoEnSegundos * 1000)
  const tiempoFormateado = tiempo.toLocaleTimeString('es-bo', {minute: '2-digit', second: '2-digit'})
  tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

//Función para la música
musica.loop = true
inputEnfoqueMusica.addEventListener('change', ()=> {
  if(musica.paused) {
    musica.play()
  } else{
    musica.pause()
  }
})

//Funciones para cambiar contextos
botonCorto.addEventListener('click', ()=> {
  tiempoEnSegundos = 300
  cambiarContexto('descanso-corto')
  botonCorto.classList.add('active')
})
botonEnfoque.addEventListener('click', ()=> {
  tiempoEnSegundos = 1500
  cambiarContexto('enfoque')
  botonEnfoque.classList.add('active')
})
botonLargo.addEventListener('click', ()=> {
  tiempoEnSegundos = 900
  cambiarContexto('descanso-largo')
  botonLargo.classList.add('active')
})

function cambiarContexto(contexto) {
  mostrarTiempo()
  botones.forEach(function(contexto) {
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `./imagenes/${contexto}.png`)

  switch (contexto) {
    case 'enfoque':
      titulo.innerHTML = `
      Optimiza tu productividad,<br>
      <strong class="app__title-strong">sumérgete en lo que importa.</strong>
      `;
      break;
    case 'descanso-corto':
      titulo.innerHTML = `
      ¿Qué tal tomar un respiro?<br>
      <strong class="app__title-strong">¡Haz una pausa corta!</strong>
      `;
      break;
    case 'descanso-largo':
      titulo.innerHTML = `
      Hora de volver a la superficie<br>
      <strong class="app__title-strong">Haz una pausa larga.</strong>
      `;
      break;
    default:
      break;
  }
}

mostrarTiempo()