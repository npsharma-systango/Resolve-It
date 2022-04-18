let createUserBtn = document.querySelector("#createUser");
createUserBtn.addEventListener("click", save)
let userType = document.querySelector("#userType");
//varialbe to store data of user after user is created 
let email, password, Name, usertype, department;

// window.addEventListener("load",createUsertype)


createUsertype();

function createUsertype() {
    fetch("http://localhost:4000/registration/usertype", {
        method: "POST",
        // body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        console.log(data.length);
        data.forEach(element => {
            console.log(element);
            let keys = Object.keys(element)
            let value = Object.values(element)
            let option = document.createElement("option");
            option.setAttribute("value", value);
            option.appendChild(document.createTextNode(keys));
            userType.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })
}



//function to save the user data in firebase 
function save() {

    email = document.querySelector("#email").value;
    Name = document.querySelector("#name").value;
    password = Math.floor(100000 + Math.random() * 900000)
    usertype = document.querySelector("#userType").value;
    department = (document.querySelector("#department").value).toUpperCase()

    let data = {
        Email: email,
        Name: Name,
        Password: password,
        Usertype: usertype,

    }

    fetch("http://localhost:4000/registration/register/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        if (data == "register") {
            alert("registerd");
        }
        else if(data == "alreadyExist")
        {
            alert("User email already exist");
        }
        // console.log(result.json());
    })
        .catch((e) => {
            console.error(e);
        })


}