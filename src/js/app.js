import firebaseConfig from "./firebaseConfig";
import {initializeApp} from "firebase/app";
import {
	getAuth, 
	createUserWithEmailAndPassword, 
	signOut, 
	signInWithEmailAndPassword, 
	onAuthStateChanged
} from "firebase/auth";



import {getFirestore, collection, addDoc, getDocs} from 'firebase/firestore'

// firebase
initializeApp(firebaseConfig);


// auth server
const authService = getAuth();


// firestore database
const database = getFirestore();

// access people
const peopleCollection = collection(database, 'people');



import {validateSignInForm} from "./signInValidation";
import {validateSignUpForm} from "./signUpValidation";
import renderData from "./renderData";


// sign in form Element

const emailInput = document.querySelector('.email')
const passwordInput = document.querySelector('.password')
const signInButton = document.querySelector('.sign-in-button')
const emailError = document.querySelector('.email-error')
const passwordError = document.querySelector('.password-error')
const signInForm = document.querySelector('.sign-in-form')
const submissionError = document.querySelector('.submission-error')


// sign up form Element
const signUpFirstname = document.querySelector(".firstname");
const signUpLastname = document.querySelector(".lastname");
const signUpEmail = document.querySelector(".sign-up-email");
const signUpPassword = document.querySelector(".sign-up-password");
const signUpError = document.querySelector(".sign-up-error");
const signUpForm = document.querySelector(".sign-up-form");
const closeSignUpButton = document.querySelector(".sign-up-form__close");
const openSignUpFormButton = document.querySelector(".sign-up-form__open");
const signUpFormContainer = document.querySelector(".sign-up-form-container");
const signUpButton = document.querySelector(".sign-up-button");

// sign out button
const signOutButton = document.querySelector(".sign-out-button");


const mainContentContainer = document.querySelector('.main-content-container')




openSignUpFormButton.addEventListener('click',(e) =>{
	e.preventDefault();
	signUpFormContainer.style.display = 'block'

})

closeSignUpButton.addEventListener('click',(e) =>{
	e.preventDefault();
	signUpFormContainer.style.display = 'none'
})


function signUpUser() {
	const {signUpErrorStatus} = validateSignUpForm(
		signUpFirstname.value.trim(), 
		signUpLastname.value.trim(), 
		signUpEmail.value.trim(), 
		signUpPassword.value.trim(), 
		signUpError
	);

	if (signUpErrorStatus()) {
		return
	} else {
		const newUser = {
			firstName: signUpFirstname.value.trim(),
			LastName: signUpLastname.value.trim(),
			signUpEmail: signUpEmail.value.trim(),
			signUpPassword: signUpPassword.value.trim()
		}
		createUserWithEmailAndPassword(authService,newUser.signUpEmail,newUser.signUpPassword)
		.then(()=>{
			signUpForm.reset();
			signUpFormContainer.style.display = 'none';
		})
		.then((err)=> console.log(err.message));
	}
}


signUpButton.addEventListener('click', (e) => {
	e.preventDefault();
	signUpUser();
})

// sign out action
function signOutUser(){
	signOut(authService)
	.then(()=>{
		console.log('sign out');
		signOutButton.style.visibility = 'hidden';
		signInForm.style.display = 'flex';
	})
	.catch((err)=> console.log(err.message));
}

signOutButton.addEventListener('click', (e)=>{
	e.preventDefault();
	signOutUser();
});

// sign in action

function signInUser(){

	const {signInFormStatus} = validateSignInForm(
		emailInput.value,
		passwordInput.value,
		emailError,
		passwordError
	);
	if(signInFormStatus()){
		return
	}else{
		const email = emailInput.value.trim();
		const password = passwordInput.value.trim()
		signInWithEmailAndPassword(authService, email, password)
		.then(()=>{
			signInForm.reset();
			signOutButton.style.visibility = 'visible';
			console.log('sign in');
		})
		.catch(err => {
			submissionError.textContent = err.message
		})
	}
}

signInButton.addEventListener('click', (e) => {
	e.preventDefault();
	signInUser();
})






// API


const peopleArray = [];

const sortByFirstNameButton = document.querySelector(".sort-by-firstname-button");
const sortByLastNameButton = document.querySelector(".sort-by-lastname-button");
const sortByEmailButton = document.querySelector(".sort-by-email-button");
const displayDataContainer = document.querySelector(".display-data-container");

async function fetchData() {
  const dataExists = await checkDataExists();
  if (!dataExists) {
    const response = await fetch("https://reqres.in/api/users?page=2");
    const data = await response.json();
    console.log(data);
    storeData(data.data);
  }
}
fetchData();

function checkDataExists() {
  return new Promise((resolve) => {
    if (peopleArray.length === 0) {
      resolve(false);
    } else {
      resolve(true);
    }
  });
}

const sortByName = (data) => {
  return data.slice().sort((a, b) => a.first_name.localeCompare(b.first_name));
};

const sortByLastName = (data) => {
  return data.slice().sort((a, b) => a.last_name.localeCompare(b.last_name));
};

const sortByEmail = (data) => {
  return data.slice().sort((a, b) => a.email.localeCompare(b.email));
};


const storeData = (data) => {
  peopleArray.length = 0;
  for (let person of data) {
    peopleArray.push(person);
  }
  displayData(peopleArray);
};

const displayData = (data) => {
  displayDataContainer.innerHTML = "";
  for (let person of data) {
    const p = document.createElement("div");
    p.innerHTML = `
      <span class="first-name">${person.first_name}</span>
      <span class="last-name">${person.last_name}</span>
      <span class="email">${person.email}</span>
    `;
    displayDataContainer.appendChild(p);
  }
};

sortByFirstNameButton.classList.add("sort-button");
sortByLastNameButton.classList.add("sort-button");
sortByEmailButton.classList.add("sort-button");

sortByFirstNameButton.addEventListener("click", () => {
  const sortedByName = sortByName(peopleArray);
  storeData(sortedByName);
  console.log(sortedByName);
});

sortByLastNameButton.addEventListener("click", () => {
  const sortedByLastName = sortByLastName(peopleArray);
  storeData(sortedByLastName);
  console.log(sortedByLastName);
});

sortByEmailButton.addEventListener("click", () => {
  const sortedByEmail = sortByEmail(peopleArray);
  storeData(sortedByEmail);
  console.log(sortedByEmail);
});


async function storeDate(data){
	console.log(data.data);
	for(let people of data){
		const newpeople = {
			avatar: people.avatar,
			firstname: people.first_name,
			lastname: people.last_name,
			email: people.email,
			id: people.id
		}
		await addDoc(peopleCollection, newpeople)
	}
}




async function chekDataExists(){
	const snapshot = await getDocs(peopleCollection);
	console.log(snapshot.empty);
	return !snapshot.empty;
}

onAuthStateChanged(authService, (user)=>{
	if(user){
		const peopleCollection = collection (database, 'people')
		getDocs(peopleCollection)
		.then((snapshot)=>{
			console.log(snapshot.docs);
			renderData(snapshot.docs)
			signOutButton.style.visibility = 'visible';
			signInForm.style.display = 'none';
			signUpFormContainer.style.display = 'none';
			mainContentContainer.style.display = 'flex'
		})
	}else {
		mainContentContainer.style.display = 'none';
		signOutButton.style.visibility = 'hidden';
		signInForm.style.display = 'flex';
	}
})

