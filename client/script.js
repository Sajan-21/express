async function addUser(event) {
    event.preventDefault();

    console.log("Reached here...");

    let name = document.getElementById('name').value;
    console.log("name : ",  name);

    let email = document.getElementById('email').value;
    console.log("email : ",  email);

    let password=  document.getElementById('password').value;
    console.log("password : ", password);

    let nameError = document.getElementById('name-error');
    let emailError = document.getElementById('email-error');
    let passwordError = document.getElementById('password-error');

    let emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;


    //validations
    if(!name) {
        nameError.innerHTML = "Name is required";
    }else {
        nameError.innerHTML = "";
    }

    if(!email) {

        emailError.innerHTML = "Emai is required";

    }else if(!emailRegex.test(email)) {

        emailError.innerHTML = "Invalid email";

    }else {
        emailError.innerHTML = "";
    }
    

    if(!password) {
        passwordError.innerHTML = "Password is required";
    }else {
        passwordError.innerHTML = "";
    }


    let datas = {
        name,
        email,
        password,
    }
    console.log("datas : ", datas);


    let json_data = JSON.stringify(datas);
    console.log("json_data : ", json_data);


   let response = await fetch('/users', {
        method : "POST",
        headers : {
            'Content-Type' : "application/json",
        },
        body : json_data,
    });

    console.log("responser : ", response);

    let parsed_response = await response.text();
    console.log("parsed_response : ", parsed_response);

    if(parsed_response) {
        alert(parsed_response);
        return;
    }else {
        alert("Something went wrong");
    }

}

//login
async function login(event) {

    event.preventDefault();

    let email = document.getElementById('email').value;
    console.log("email : ",  email);

    let password=  document.getElementById('password').value;
    console.log("password : ", password);

    body = {
        email,
        password
    }

    let strbody = JSON.stringify(body);

    let response = await fetch('/login',{method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : strbody
    });

    let parsed_response = await response.json();

    let token = parsed_response.data;
    console.log("token : ",token);

    localStorage.setItem(email, token);

    window.location = `getUsers.html?email=${email}`;

}


//getAllUsers
async function getAllUsers() {

    let queryString = window.location.search;
    console.log("queryString : ", queryString);

    let url_params = new URLSearchParams(queryString);
    console.log("url_params : ", url_params);

    let email = url_params.get("email");
    console.log("email : ", email);

    let localtoken = localStorage.getItem(email);
    console.log("localtoken : ",localtoken);

    try {

        let response = await fetch('/users',{
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${localtoken}`
            }
        });
    
        let parsed_response = await response.json();
    
        let users = parsed_response.data;
        console.log("users : ",users);
        
    } catch (error) {

        console.log("error : ",error);
        
    }
    
}