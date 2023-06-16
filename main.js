
//recuperando el array de usuarios guardado en el localstorage
let users = JSON.parse(localStorage.getItem('users'));
//Recuperando el usuario
const emailGuardado = localStorage.getItem('email');
// Obtener el objeto del usuario guardado en localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser'));


window.onload = function() {
    document.querySelector('.navegacion').classList.add('active');
    if (document.querySelector('.logo').getBoundingClientRect().bottom < 0) {
      document.querySelector('.navegacion').classList.remove('active');
    }
  }
  
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos) {
      document.querySelector('.navegacion').classList.remove('active');
      document.querySelector('.navegacion').style.top = '0';
    } else {
      document.querySelector('.navegacion').classList.add('active');
      if (document.querySelector('.logo').getBoundingClientRect().bottom < 0) {
        document.querySelector('.navegacion').style.top = '0';
      } else {
        document.querySelector('.navegacion').style.top = '120px';
      }
    }
    prevScrollpos = currentScrollPos;
  }


  const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');

imageInput.addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    previewImage.src = e.target.result;
  }

  reader.readAsDataURL(file);
}); 

const publicar = document.querySelector(".publi");
const nav = document.querySelector(".barra");
const headerL = document.querySelector(".spacer");
const main = document.querySelector("main");
const editar = document.querySelector(".editar");



const salir = document.querySelector(".icon");
salir.addEventListener("click", () => {
  window.location.replace("index.html");
});

publicar.addEventListener("click", hacerPublicar);

function hacerPublicar(){
    nav.classList.add("inactive");
    headerL.classList.add("inactive");
    main.classList.add("inactive");
    editar.classList.remove("inactive");
}

const atras = document.querySelector(".atras");

atras.addEventListener("click", () => {
    nav.classList.remove("inactive");
    headerL.classList.remove("inactive");
   main.classList.remove("inactive");
    editar.classList.add("inactive");
}); 

let fotoUsuario = document.querySelectorAll(".fotoUsuario");
fotoUsuario.forEach(elemento => {
    elemento.setAttribute("src", currentUser.foto);
  });

  let nombreUsuario = document.querySelectorAll(".nombreUsuario");
nombreUsuario.forEach(elemento => {
    elemento.textContent = currentUser.fullName;
  });
console.log(users);
console.log(emailGuardado);
console.log(currentUser);



//array de publicaiones
let publicaciones = [];

// Obtener las publicaciones existentes del LocalStorage
publicaciones = JSON.parse(localStorage.getItem('publicaciones')) || [];


// Asignar la función al botón "Publicar"
document.querySelector('.post').addEventListener('click', crearPublicacion);

// Función para crear una nueva publicación
function crearPublicacion(e) {
    e.preventDefault();
    const texto = document.querySelector('.letra').value;
    const textoConSaltosDeLinea = texto.replace(/\n/g, '<br>');
    const foto = document.querySelector('#previewImage').src;
    const id = publicaciones.length + 1;
    const correo = emailGuardado;
    const autor = currentUser.fullName; // En tu caso, debes obtener el usuario actual
    const comentarios = [];
    const likes = [];
    const fecha = new Date();
    publicaciones.push({ id, autor, correo, textoConSaltosDeLinea, foto, fecha, comentarios, likes });
    // Guardar el array de publicaciones actualizado en el LocalStorage
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

// Agregar la publicación al array de publicaciones del usuario actual
users.forEach(user => {
    if (user.email === emailGuardado) {
      user.publicaciones.push({ id, autor, correo, textoConSaltosDeLinea, foto, fecha, comentarios, likes });
        // Guardar el array de usuarios actualizado en el LocalStorage
  localStorage.setItem('users', JSON.stringify(users));
    }
  });
  

  

// Guardar el array de usuarios actualizado en el LocalStorage
localStorage.setItem('users', JSON.stringify(users));




    mostrarPublicaciones();
    // Dejar en blanco los campos de texto e imagen
    document.querySelector('.letra').value = "";
    document.querySelector('#previewImage').src = "";


    nav.classList.remove("inactive");
    headerL.classList.remove("inactive");
   main.classList.remove("inactive");
    editar.classList.add("inactive");
  }

  // Función para mostrar todas las publicaciones
/* function mostrarPublicaciones() {
    console.log(publicaciones);
} */

//Funcion para darle likes a las paginas

// Función para manejar el evento de clic del botón de "Me gusta"
function darLike(publicacion) {
    // Encontrar al usuario actual
    const usuarioActual = users.find(user => user.email === emailGuardado);
    console.log(usuarioActual);
  
    // Verificar si el usuario ya dio like a esta publicación
    const index = publicacion.likes.indexOf(usuarioActual.fullName);
  
    if (index !== -1) {
      // Si ya dio like, remover su nombre del array
      publicacion.likes.splice(index, 1);
    } else {
      // Si no ha dado like, agregar su nombre al array
      publicacion.likes.push(usuarioActual.fullName);
    }
  
    actualizarDatos();
    mostrarPublicaciones();
  }

// Función para manejar el evento de clic del botón de "Me gusta"
function agregarComentario(id, texto) {
  // Encontrar al usuario actual
  const usuarioActual = users.find(user => user.email === emailGuardado);
  const PublicacionActual = publicaciones.find(publicacion => publicacion.id === id);

  const comentario = {
    autor: usuarioActual.fullName,
    foto: usuarioActual.foto,
    fecha: new Date(),
    comentario: texto,
  }
  
  if(!texto){
    console.log("No se guardo");
  } else {
     // Agregar el nombre de usuario al array de "Me gusta" de la publicación
  PublicacionActual.comentarios.push(comentario);
  }
 

  console.log(PublicacionActual.comentarios);

  actualizarDatos();
  mostrarPublicaciones();
}

  

//Funcion para actualizar los array en el local storage
function actualizarDatos(){
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}

//Funcion para obtener los datos actualizados 
function obtenerDatosActualizados() {
  // Obtener los datos del local storage
 users = JSON.parse(localStorage.getItem('users'));
 publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
} 


//Funcion para mostrar las publicaiones

function mostrarPublicaciones(){

actualizarDatos();
//obtenerDatosActualizados();


    main.innerHTML = "";
    const newArray = [...publicaciones].reverse();

    newArray.forEach(publicacion => {
    
         // Crear elementos y asignarles atributos
const article = document.createElement('article');

const sectionUsuarios = document.createElement('section');
sectionUsuarios.classList.add('usuarios');

const divFoto = document.createElement('div');
const imgFoto = document.createElement('img');
imgFoto.classList.add('foto');
const publicaionUsuario = users.find(usuario => usuario.email === publicacion.correo);
imgFoto.setAttribute('src', publicaionUsuario.foto);
imgFoto.addEventListener("click", () => {
  localStorage.setItem('correoPersona', JSON.stringify(publicacion.correo));
  window.location.replace("perfil.html");
});
divFoto.appendChild(imgFoto);

const divInfo = document.createElement('div');
divInfo.classList.add('info');

const h2 = document.createElement('h2');
h2.textContent = publicacion.autor;
const p = document.createElement('p');


// Crear una función que calcule el tiempo transcurrido y actualice el valor del elemento p
function actualizarTiempo() {
    const tiempoActual = new Date();
    const tiempoTranscurrido = tiempoActual - new Date(publicacion.fecha) ; // Calcular tiempo en milisegundos

  
    const segundos = Math.floor(tiempoTranscurrido / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const anos = Math.floor(dias / 365);
  
    let tiempoTexto;
  
    if (anos > 0) {
      tiempoTexto = anos === 1 ? "1 año" : `${anos} años`;
    } else if (dias > 0) {
      tiempoTexto = dias === 1 ? "1 día" : `${dias} días`;
    } else if (horas > 0) {
      tiempoTexto = horas === 1 ? "1 hora" : `${horas} horas`;
    } else if(minutos > 0){
      tiempoTexto = minutos === 1 ? "1 minuto" : `${minutos} minutos`;
    }  else {
        tiempoTexto = segundos === 1 ? "1 segundo" : `${segundos} segundos`;
      }
  
    p.textContent = tiempoTexto;
  }
  

// Llamar a la función para actualizar el valor inicial del elemento p
actualizarTiempo();

// Actualizar el valor del elemento p cada 1 minuto
setInterval(actualizarTiempo, 5000);

divInfo.appendChild(h2);
divInfo.appendChild(p);

sectionUsuarios.appendChild(divFoto);
sectionUsuarios.appendChild(divInfo);

const sectionEscritura = document.createElement('section');
sectionEscritura.classList.add('escritura');

const pEscritura = document.createElement('p');
pEscritura.innerHTML = publicacion.textoConSaltosDeLinea;

sectionEscritura.appendChild(pEscritura);

const sectionImagenT = document.createElement('section');
sectionImagenT.classList.add('imagenT');


if (!publicacion.foto) {
    console.log("No hay imagen");
} else {
    const imgImagenT = document.createElement('img');
    imgImagenT.onload = function() {
        sectionImagenT.appendChild(imgImagenT);
    };
    imgImagenT.onerror = function() {
        console.log("La imagen no existe");
    };
    imgImagenT.setAttribute('src', publicacion.foto);
}

    


const sectionInter = document.createElement('section');
sectionInter.classList.add('inter');

const divUno = document.createElement('div');
divUno.classList.add('uno');

const divGustar = document.createElement('div');
divGustar.classList.add('gustar');

const imgGustar1 = document.createElement('img');
imgGustar1.setAttribute('src', './icon/free_icon_1 (14).svg');
/* const imgGustar2 = document.createElement('img');
imgGustar2.setAttribute('src', './icon/free_icon_1 (15).svg'); */
const pGustar = document.createElement('p');
pGustar.classList.add("likes");
pGustar.setAttribute('id', publicacion.id);
pGustar.textContent = publicacion.likes.length;

divGustar.appendChild(imgGustar1);
//divGustar.appendChild(imgGustar2);
divGustar.appendChild(pGustar);

const divContador = document.createElement('div');
divContador.classList.add('contador');


//Seccion de comentarios para poder cerrarla y abrila con el texto de comentarios
  // Crear sección principal
  const seccionComentarios = document.createElement('section');
  seccionComentarios.classList.add('inactive');

const pComentarios = document.createElement('p');
pComentarios.textContent = publicacion.comentarios.length + ' comentarios ';
pComentarios.addEventListener("click", () => {
    console.log(publicacion.comentarios);
    if (seccionComentarios.classList.contains('inactive')) {
      seccionComentarios.classList.remove('inactive');
    } else {
      seccionComentarios.classList.add('inactive'); // Mostrar el elemento al hacer clic en el icono de comentario
    }
});
const pSeparador = document.createElement('p');
pSeparador.textContent = '|';
const pCompartido = document.createElement('p');
pCompartido.textContent = '1 compartido';

divContador.appendChild(pComentarios);
divContador.appendChild(pSeparador);
divContador.appendChild(pCompartido);

divUno.appendChild(divGustar);
divUno.appendChild(divContador);



//Seccion para ver los comentarios.

publicacion.comentarios.slice(-3).reverse().forEach(comentario => {

seccionComentarios.classList.add('seccionComentarios');

// Crear sección de usuarios
const usuarios = document.createElement('section');
usuarios.classList.add('usuarios');

// Crear contenedor de imagen de usuario
const imagenUsuario = document.createElement('div');
const imagen = document.createElement('img');
imagen.classList.add('foto');
imagen.src = comentario.foto;
imagen.alt = '';
imagenUsuario.appendChild(imagen);

// Crear contenedor de información del usuario
const infoUsuario = document.createElement('div');
infoUsuario.classList.add('info');

// Crear título de usuario
const tituloUsuario = document.createElement('h2');
tituloUsuario.textContent = comentario.autor;

// Crear tiempo de publicación
const tiempoPublicacion = document.createElement('p');

// Crear una función que calcule el tiempo transcurrido y actualice el valor del elemento p
function actualizarTiempoComentarios() {
  const tiempoActual = new Date();
  const tiempoTranscurrido = tiempoActual - new Date(comentario.fecha) ; // Calcular tiempo en milisegundos


  const segundos = Math.floor(tiempoTranscurrido / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const anos = Math.floor(dias / 365);

  let tiempoTexto;

  if (anos > 0) {
    tiempoTexto = anos === 1 ? "1 año" : `${anos} años`;
  } else if (dias > 0) {
    tiempoTexto = dias === 1 ? "1 día" : `${dias} días`;
  } else if (horas > 0) {
    tiempoTexto = horas === 1 ? "1 hora" : `${horas} horas`;
  } else if(minutos > 0){
    tiempoTexto = minutos === 1 ? "1 minuto" : `${minutos} minutos`;
  }  else {
      tiempoTexto = segundos === 1 ? "1 segundo" : `${segundos} segundos`;
    }

  tiempoPublicacion.textContent = tiempoTexto;
}


// Llamar a la función para actualizar el valor inicial del elemento p
actualizarTiempoComentarios();

// Actualizar el valor del elemento p cada 1 minuto
setInterval(actualizarTiempoComentarios, 5000);


// Agregar título y tiempo de publicación al contenedor de información del usuario
infoUsuario.appendChild(tituloUsuario);
infoUsuario.appendChild(tiempoPublicacion);

// Agregar contenedor de imagen y contenedor de información del usuario a la sección de usuarios
usuarios.appendChild(imagenUsuario);
usuarios.appendChild(infoUsuario);

// Crear sección de escritura
const escritura = document.createElement('section');
escritura.classList.add('escritura');

// Crear párrafo de la publicación
const parrafoPublicacion = document.createElement('p');
parrafoPublicacion.textContent = comentario.comentario;

// Agregar párrafo de la publicación a la sección de escritura
escritura.appendChild(parrafoPublicacion);

// Crear contenedor de opciones de usuario
const opcionesUsuario = document.createElement('div');
opcionesUsuario.classList.add('usu');

// Crear opción de "like"
const like = document.createElement('div');
like.classList.add('like');
const iconoLike = document.createElement('img');
iconoLike.src = './icon/free_icon_1 (14).svg';
iconoLike.alt = '';
like.appendChild(iconoLike);

// Crear opción de "postularte"
const postularte = document.createElement('div');
postularte.classList.add('postularte');
const iconoPostularte = document.createElement('img');
iconoPostularte.src = './icon/free_icon_1 (2).svg';
iconoPostularte.alt = '';
postularte.appendChild(iconoPostularte);

// Agregar opciones de usuario al contenedor de opciones de usuario
opcionesUsuario.appendChild(like);
opcionesUsuario.appendChild(postularte);

// Agregar sección de usuarios, sección de escritura y contenedor de opciones de usuario a la sección principal
seccionComentarios.appendChild(usuarios);
seccionComentarios.appendChild(escritura);
seccionComentarios.appendChild(opcionesUsuario);

});






//Seccion de los iconos de me gusta, comentar, compartir y postularte


const divUsu = document.createElement('div');
divUsu.classList.add('usu');

// Crear los elementos dentro de la sección de iconos de usuario
const likeDivEl = document.createElement('div');
likeDivEl.classList.add('like');
const likeImgEl = document.createElement('img');
likeImgEl.src = './icon/free_icon_1 (14).svg';
likeImgEl.alt = '';
likeImgEl.addEventListener("click", () => {
    darLike(publicacion);
    console.log("Se le ha dado click a " + publicacion.id);
    actualizarDatos();
})

likeDivEl.appendChild(likeImgEl);

const comentDivEl = document.createElement('div');
comentDivEl.classList.add('coment');
const comentImgEl = document.createElement('img');
comentImgEl.src = './icon/free_icon_1 (16).svg';
comentImgEl.alt = '';
comentImgEl.addEventListener("click", () => {
  comentarioInput1.value = '';
  if (comentarioDiv.style.display === 'flex') {
    comentarioDiv.style.display = 'none';
  } else {
    comentarioDiv.style.display = 'flex'; // Mostrar el elemento al hacer clic en el icono de comentario
    comentarioDiv.style.flexDirection = 'column';
    comentarioDiv.style.justifyContent = 'center';
    comentarioDiv.style.width = '100%';
    comentarioDiv.style.height = 'auto';
    comentarioDiv.style.resize = 'none';
    comentarioDiv.style.border = 'none';
    comentarioDiv.style.fontSize = '2rem';
    comentarioDiv.style.lineHeight = '1.5';
    comentarioDiv.style.marginBottom = '16px';
    comentarioDiv.style.padding = '1rem 5% 1rem 5%';
  }
})
comentDivEl.appendChild(comentImgEl);

const comparDivEl = document.createElement('div');
comparDivEl.classList.add('compar');
const comparImgEl = document.createElement('img');
comparImgEl.src = './icon/free_icon_1 (17).svg';
comparImgEl.alt = '';
comparDivEl.appendChild(comparImgEl);

const postularteDivEl = document.createElement('div');
postularteDivEl.classList.add('postularte');
const postularteImgEl = document.createElement('img');
postularteImgEl.src = './icon/free_icon_1 (2).svg';
postularteImgEl.alt = '';
postularteDivEl.appendChild(postularteImgEl);

// Crear el elemento de comentario
const comentarioElement = document.createElement('div');
comentarioElement.classList.add('comentario');
comentarioElement.setAttribute("id", `${publicacion.id}c`)


// Crear el área de texto para el comentario
const comentarioInput = document.createElement('textarea');
comentarioInput.classList.add('comentario-input');
comentarioInput.getAttribute("id", `${publicacion.id}gc`)
comentarioInput.setAttribute('placeholder', 'Escribe un comentario...');
comentarioInput.style.height = '7rem';
comentarioInput.style.padding = '1rem 5% 1rem 5%';
comentarioInput.style.fontSize = '2rem';
comentarioInput.style.lineHeight = '1.5';
comentarioInput.style.resize = 'none';

//creando un div para guardar los botones
const divComentarioBtn = document.createElement('div');
divComentarioBtn.classList.add('div-comentario-btn');
divComentarioBtn.style.display = 'flex'; // Mostrar el elemento al hacer clic en el icono de comentario
divComentarioBtn.style.justifyContent = 'space-between';
divComentarioBtn.style.padding = '1rem';

// Crear el botón para enviar el comentario
const comentarioBtnCancelar = document.createElement('button');
comentarioBtnCancelar.classList.add('comentario-btn-cancelar');
comentarioBtnCancelar.textContent = 'Cancelar';
comentarioBtnCancelar.style.width = '6rem';
comentarioBtnCancelar.style.height = 'auto';
comentarioBtnCancelar.style.padding = '1rem';

// Crear el botón para enviar el comentario
const comentarioBtn = document.createElement('button');
comentarioBtn.classList.add('comentario-btn');
comentarioBtn.setAttribute("id", `${publicacion.id}cc`)
comentarioBtn.textContent = 'Comentar';
comentarioBtn.style.width = '6rem';
comentarioBtn.style.height = 'auto';
comentarioBtn.style.padding = '1rem';

divComentarioBtn.appendChild(comentarioBtnCancelar);
divComentarioBtn.appendChild(comentarioBtn);


// Agregar el área de texto y el botón al elemento de comentario
comentarioElement.appendChild(comentarioInput);
comentarioElement.appendChild(divComentarioBtn);



divUsu.appendChild(likeDivEl);
divUsu.appendChild(comentDivEl);
divUsu.appendChild(comparDivEl);
divUsu.appendChild(postularteDivEl);

sectionInter.appendChild(divUno);
sectionInter.appendChild(seccionComentarios);
sectionInter.appendChild(divUsu);
// Agregar el elemento de comentario al contenedor de comentarios
sectionInter.appendChild(comentarioElement);
article.appendChild(sectionUsuarios);
article.appendChild(sectionEscritura);
article.appendChild(sectionImagenT);
article.appendChild(sectionInter);

main.appendChild(article);


const comentarioIcono = document.querySelector('.coment');
const comentarioDiv = document.getElementById(`${publicacion.id}c`);
comentarioDiv.style.display = 'none';
const comentarioInput1 = document.querySelector('.comentario-input');
let comentarioBtn1 = document.getElementById(`${publicacion.id}cc`);

//let textoComentario = document.getElementById(`${publicacion.id}gc`).value;


comentarioBtn1.addEventListener('click', () => {
     // Obtener el texto del comentario desde el textarea correspondiente
    agregarComentario(publicacion.id , comentarioInput.value)
    console.log(comentarioInput.value);
  
  // Aquí puedes agregar código para enviar el comentario a tu servidor o agregarlo a una lista de comentarios
  comentarioInput1.value = ''; // Limpiar el área de texto después de enviar el comentario
  comentarioDiv.style.display = 'none'; // Ocultar el elemento después de enviar el comentario
});
comentarioBtnCancelar.addEventListener('click', () => {
    comentarioInput1.value = ''; // Limpiar el área de texto después de enviar el comentario
    comentarioDiv.style.display = 'none'; // Ocultar el elemento después de enviar el comentario
  });

    });
   
}

mostrarPublicaciones();

console.log(publicaciones);


