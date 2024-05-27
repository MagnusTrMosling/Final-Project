const fetchUsers = async()=>{
	const response = await fetch('https://reqres.in/api/users?page=2')
	const result = await response.json();
	console.log(result);
}

fetchUsers()