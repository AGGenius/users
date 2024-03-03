const usersList = document.getElementById('listaUsuarios');

getUsers();

function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
        if(!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        } else {
            return response.json();
        }
    })
    .then((data) => {
        const userData = data;
        setUsers(userData);
    })
    .catch((error) => {
        console.log(`Error: No se pudo cargar la lista. ${error}`)
    })
};

function setUsers(data) {
    data.forEach((element, i) => {
        const {name, username, phone, email, company} = element;
        const age = Math.floor(Math.random() * (66 - 18) + 18);
        const address = element.address.street.concat(', ', element.address.suite,', ', element.address.city) ;
        const img = `assets/img/${i+1}.jpeg`;
        const allUserData = {...element, age, img, address};

        usersList.insertAdjacentHTML('beforeend', `
        <li class='userData-entry'>
            <div class='userData-main'>
                <div class='userData-text'>
                    <p><span>Name:</span> ${allUserData.name}</p>
                    <p><span>Age:</span> ${allUserData.age}</p>
                    <p><span>User Name:</span> ${allUserData.username}</p>
                    <p><span>Phone:</span> ${allUserData.phone}</p>
                    <p><span>Email:</span> ${allUserData.email}</p>
                </div>
                <img class='userData-img' src=${allUserData.img} alt="user photo"/>
            </div>
            <div class='userData-company'>
                <p><span>Company:</span> ${allUserData.company.name}</p>
                <p><span>Address:</span> ${allUserData.address}</p>
            </div>
        </li>      
        `);
    });
}