function renderData(peoples){

    const mainContentContainer = document.querySelector('.main-content-container');
	peoples.forEach((people) => {
	const peopleContainer = document.createElement('span')
	const avatarContainer = document.createElement('span')
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
  });
}

export default renderData;


