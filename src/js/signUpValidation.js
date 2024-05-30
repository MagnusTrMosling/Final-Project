const validateSignUpForm = (firstname, lastname, email, password, ErrorMsg) => {
	let errorStatus = false;
	if (!firstname || !lastname || !email || !password) {
	  errorStatus = true;
	  ErrorMsg.style.visibility = "visible";
	  ErrorMsg.textContent = "Please complete all the fields";
	} else {
	  errorStatus = false;
	  ErrorMsg.style.visibility = "hidden";
	  ErrorMsg.textContent = "";
	}
  
	const signUpErrorStatus = () => {
	  return errorStatus;
	};
	return { errorStatus, signUpErrorStatus };
  };
  
  const removeSignUpErrorOnInput = (
	firstname,
	lastname,
	email,
	password,
	signUpErrorMsg
  ) => {
	if (firstname && lastname && email && password) {
	  signUpErrorMsg.style.visibility = "hidden";
	}
  };
  export { validateSignUpForm, removeSignUpErrorOnInput };
  