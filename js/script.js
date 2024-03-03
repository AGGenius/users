const usersList = document.getElementById('listaUsuarios');

getUsers();

// Main function to get vales from the API.
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
        allUserData = userData;
        setUsers(userData);
    })
    .catch((error) => {
        console.log(`Error: No se pudo cargar la lista. ${error}`)
    })
};

// function to set the user data as needed.
function setUsers(data) {
    data.forEach((element, i) => {
        const {name, username, phone, email, company} = element;
        const age = Math.floor(Math.random() * (66 - 18) + 18);
        const address = element.address.street.concat(', ', element.address.suite,', ', element.address.city) ;
        const img = `assets/img/${i+1}.jpeg`;
        const allUserData = {...element, age, img, address};

        // The instertion of the info on the DOM.
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
            <button class='userData-companyButton' data-state='false' >Company info</button>
            <div class='userData-company'>
                <p><span>Company:</span> ${allUserData.company.name}</p>
                <p><span>Address:</span> ${allUserData.address}</p>
            </div>
        </li>      
        `); 
    });
    
    // The code below this line is made to be able to show the company information only when the button is clicked.
    // The info will be set out of the render queue when clicked again.
    const userDataCompany = document.querySelectorAll('.userData-company');
    const userDataWindow = document.querySelectorAll('.userData-entry');
    const companyButton = document.querySelectorAll('.userData-companyButton');

    companyButton.forEach((buton, i) => {
        buton.addEventListener('click', function(){ 
            if(this.dataset.state === 'false'){
                this.dataset.state = 'true';
                userDataCompany[i].style.display = 'flex';
                userDataWindow[i].style.height = '200px';
                console.log('Active');
            } else {             
                this.dataset.state = 'false';
                userDataCompany[i].style.display = 'none';
                userDataWindow[i].style.height = '150px';
                console.log('Inactive');
            }                 
        });
    });
}


