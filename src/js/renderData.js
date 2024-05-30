function renderData(peoples){

    const mainContentContainer = document.querySelector('.main-content-container');
	peoples.forEach((people) => {
	const peopledata = people.data()	
	const peopleContainer = document.createElement('span')
	const avatarContainer = document.createElement('span')
	const peopleAvatar = document.createElement('img')
	const peopleFirstName = document.createElement('div')
	const peopleLastName = document.createElement('div')
	const peopleEmail = document.createElement('div')
	const peopleId = document.createElement('div')

	mainContentContainer.append(peopleContainer);
	peopleContainer.append(
		avatarContainer,
		peopleFirstName, 
		peopleLastName, 
		peopleEmail, 
		peopleId
	);

	avatarContainer.append(peopleAvatar);

	peopleAvatar.src = peopledata.avatar;
	peopleFirstName.textContent = peopledata.firstname;
	peopleLastName.textContent = peopledata.lastname;
	peopleEmail.textContent = peopledata.email;
	peopleId.textContent = peopledata.id;
	console.log(peoples);

	peopleContainer.classList.add('people-container')
	// avatarContainer.classList.add('avatar-container')
	// peopleFirstName.classList.add('people-firstname')
	// peopleLastName.classList.add('people-lastname ')
	// peopleEmail.classList.add('people-email')
	// peopleId.classList.add('people-id')
	});
}

export default renderData;