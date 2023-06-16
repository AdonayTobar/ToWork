const passwordField = document.getElementById('password');
		const showPasswordCheckbox = document.getElementById('show-password');
		
		showPasswordCheckbox.addEventListener('change', function() {
			if (this.checked) {
				passwordField.type = 'text';
			} else {
				passwordField.type = 'password';
			}
		});
const passwordField1 = document.getElementById('password1');
const passwordField2 = document.getElementById('password-confirm');
const showPasswordCheckbox1 = document.getElementById('show-password1');

showPasswordCheckbox1.addEventListener('change', function() {
    if (this.checked) {
        passwordField1.type = 'text';
        passwordField2.type = 'text';
    } else {
        passwordField1.type = 'password';
        passwordField2.type = 'password';
    }
});

const registrarse =document.querySelector(".register-link");
const login =document.querySelector(".login-link");
const principal =document.querySelector(".principal");
const registro =document.querySelector(".registro");
const form = document.querySelector('.log');
const form1 = document.querySelector('.re');


registrarse.addEventListener("click", () => {
    principal.classList.add("inactive");
    registro.classList.remove("inactive");
    errorMessage.textContent = '';
    errorMessage.style.border = 'none';
    form.reset();
    form1.reset();
});

login.addEventListener("click", () => {
    principal.classList.remove("inactive");
    registro.classList.add("inactive");
    errorMessage1.textContent = '';
    errorMessage1.style.border = 'none';
    form.reset();
    form1.reset();
});

// Recuperar el array de usuarios del localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

let usersOne = {
  fullName: 'adonay',
  email: 'tobaradonay@gmail.com',
  password: '123',
  birthdate: '2023-04-07',
  foto: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
  amigos: [],
  publicaciones: []
};

// Verificar si users es un array
if (!Array.isArray(users)) {
  users = [];
}

// Agregar el objeto usersOne al array
users.push(usersOne);

// Actualizar el valor en localStorage
localStorage.setItem('users', JSON.stringify(users));

// Imprimir el array actualizado
//console.log(users);



const regis = document.querySelector('.regis');
const errorMessage = document.querySelector('#error-message');
const errorMessage1 = document.querySelector('#error-message1');
const entrar = document.querySelector('.entrar');
const cuerpo = document.querySelector('.cuerpo');


regis.addEventListener('click', () => {
  errorMessage1.textContent = '';

  if (errorMessage != "") {
    errorMessage.style.fontSize = '1.5rem';
    errorMessage.style.fontWeight = 'bold';
    errorMessage.style.color = 'rgb(141, 38, 38)';
    errorMessage.style.padding = '1rem';
    errorMessage.style.borderRadius = '1rem';
    errorMessage.style.border = '1px solid red';
  }
  const fullName = document.querySelector('#full-name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password1').value;
  const password1 = document.querySelector('#password-confirm').value;
  const birthdate = document.querySelector('#birthdate').value;

  const inputs = [
    document.querySelector('#full-name'),
    document.querySelector('#email'),
    document.querySelector('#password1'),
    document.querySelector('#password-confirm'),
    document.querySelector('#birthdate')
  ];

  for (let i = 0; i < inputs.length; i++) {
  if (inputs[i].value === '') {
    inputs[i].style.border = '1px solid red';
  } else {
    inputs[i].style.border = 'none';
  }
}



    // Validar que el correo electrónico no esté repetido
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      errorMessage.textContent = 'El correo electrónico ya está registrado';
      inputs[1].style.border = '1px solid red';
      return;
    }
  }


  if(!fullName || !email || !password || !password1 || !birthdate) {
    errorMessage.textContent = 'Debes llenar todos los campos';
    return;
  } else if(password !== password1){
    inputs[3].style.border = '1px solid red';
    errorMessage.textContent = 'Las contraseñas deben de ser iguales';
    return;
  } else if (password.length < 8) {
    inputs[2].style.border = '1px solid red';
    errorMessage.textContent = 'La contraseña debe tener al menos 8 caracteres';
    return;
  }

  // Validar que la fecha de nacimiento indique que la persona es mayor de edad
  const currentDate = new Date();
  const birthdateDate = new Date(birthdate);
  const ageInMillis = currentDate.getTime() - birthdateDate.getTime();
  const ageInYears = ageInMillis / (1000 * 60 * 60 * 24 * 365.25);

  if (ageInYears < 18) {
    inputs[4].style.border = '1px solid red';
    errorMessage.textContent = 'Debes tener al menos 18 años para registrarte';
    return;
  }

 const newUser = { 
  fullName, 
  email, 
  password, 
  birthdate, 
  foto: 'https://images.pexels.com/photos/14610784/pexels-photo-14610784.jpeg?auto=compress&cs=tinysrgb&w=600',
 amigos: [],
 publicaciones: [], 
};
    users.push(newUser);
    console.log('Usuario agregado');
    //console.log(users);

    // Guardar el array de usuarios en localStorage
  localStorage.setItem('users', JSON.stringify(users));

    principal.classList.remove("inactive");
    registro.classList.add("inactive");
    form1.reset();
  
});

  // Recuperar el array de usuarios del localStorage
 users = JSON.parse(localStorage.getItem('users'));

//console.log(users);
entrar.addEventListener("click", () => {




//Esto es para darle estilos al mensaje de error
if (errorMessage1 != "") {
  errorMessage1.style.fontSize = '1.5rem';
  errorMessage1.style.fontWeight = 'bold';
  errorMessage1.style.color = 'rgb(141, 38, 38)';
  errorMessage1.style.padding = '1rem';
  errorMessage1.style.borderRadius = '1rem';
  errorMessage1.style.border = '1px solid red';
}

    const emailE = document.querySelector('.correo').value;
    const passwordE = document.querySelector('.contra').value;
    const inputEmail = document.querySelector('.correo');
    const inputPass = document.querySelector('.contra');
    inputEmail.style.border = 'none';
        inputPass.style.border = 'none';
    if(!emailE && !passwordE) {
        inputEmail.style.border = '1px solid red';
        inputPass.style.border = '1px solid red';
        errorMessage1.textContent = 'Llena todos los campos';
        return;
    }if(!emailE){
            inputEmail.style.border = '1px solid red';
            errorMessage1.textContent = 'Ingresa tu email';
            return;
        } else if(!passwordE){
            inputPass.style.border = '1px solid red';
            errorMessage1.textContent = 'Ingresa tu contraseña';
            return;
        }

    users.forEach(usuario => {
      console.log("Se le dio click");
        if(usuario.email === emailE && usuario.password === passwordE){
            console.log('Usuario encontrado');
            window.location.replace("app.html");
            // Guardar el usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(usuario));
        } else {
            console.log('No encontrado');
            errorMessage1.textContent = 'Cuenta no encontrada, registrate gratis';
        }        
    });
    localStorage.setItem('email', emailE);
    form1.reset();

});