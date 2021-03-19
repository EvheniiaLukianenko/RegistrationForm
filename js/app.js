let registration = document.getElementById('registration');
let form = document.getElementById('form');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');

form.addEventListener('submit', function (e) {
	e.preventDefault();

	checkInputs();
	showSuccessMessage();
});

function checkInputs() {
	let usernameValue = username.value.trim();
	let emailValue = email.value.trim();
	let passwordValue = password.value.trim();
	let password2Value = password2.value.trim();

	if(usernameValue === '') {
		setError(username, 'Username cannot be blank');
	} else {
		setSuccess(username);
		localStorage.setItem('username', usernameValue);
	}

	if(emailValue === '') {
		setError(email, 'Email cannot be blank');
	} else if(!isEmail(emailValue)) {
		setError(email, 'Please use valid email address');
	} else {
		setSuccess(email);
		localStorage.setItem('email', emailValue);
	}

	if(passwordValue === '') {
		setError(password, 'Password cannot be blank');
	} else if(!isPasswordLong(passwordValue)) {
		setError(password, 'Password must be at least 8 characters long');
	} else {
		setSuccess(password);
	}

	if(passwordValue === password2Value && isPasswordLong(passwordValue)) {
		setSuccess(password2);
		localStorage.setItem('password', passwordValue);
	} else {
		setError(password2, 'Passwords do not match');
	}
}

function setError(input, message) {
	let formControl = input.parentElement;
	let formError = formControl.querySelector('.form__error');

	// add error message inside .form__error
	formError.innerText = message;

	//add error class to .form__control
	formControl.className = 'form__control error';
}


function setSuccess(input) {
	let formControl = input.parentElement;

	//add success class to .form__control
	formControl.className = 'form__control success';
}

function isEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	return re.test(String(email).toLowerCase());
}

function isPasswordLong(password) {
	return password.length >= 8 ? true:false;
}

function showSuccessMessage() {
	let formControlArray = form.querySelectorAll('.form__control');
	let count = 0;

	for(let i = 0; i < formControlArray.length; i++) {
		let formControlClass = formControlArray[i].className;

		if(formControlClass === 'form__control success') {
			count += 1;
		}
	}

	console.log(count);

	if (count === formControlArray.length) {
		form.style.display = 'none';
		registration.querySelector('.form__success').style.display = 'block';
	}
}