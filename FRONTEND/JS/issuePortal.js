let department =  document.querySelector("#issueInDepartment");
let departmentSelected = document.querySelector("#departmentSelect");
let issuePortal, issueStatus,issuePriority,issueAssignTo,subject,issueDescription;
let createIssueBtn = document.querySelector("#createIssueBtn");
departmentSelected.addEventListener("click", createIssuePortal);
createIssueBtn.addEventListener("click", storeTicketData)

let aurthorizationToken  = localStorage.getItem("Aurthorization");

// console.log(de);

getDepartments();
function getDepartments() {
    fetch("http://localhost:4000/issuePortal/departmentDetails", {
        method: "POST",
        // body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization" : aurthorizationToken
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
            department.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })

}

function createIssuePortal() {
    issuePortal = document.querySelector(".issuePortal");
    issueStatus = document.querySelector("#status");
    issuePriority = document.querySelector("#priority");
    issueAssignTo  = document.querySelector("#assignee");
    console.log(department.value);
    issuePortal.classList.remove("hide");


    fetch("http://localhost:4000/issuePortal/status", {
        method: "POST",
        // body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization" : aurthorizationToken
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
            issueStatus.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })

    fetch("http://localhost:4000/issuePortal/priority", {
        method: "POST",
        // body: "",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization" : aurthorizationToken

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
            issuePriority.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })

        let departmentValue = {
            Department : department.value,
        } 
        fetch("http://localhost:4000/issuePortal/assignTo", {
        method: "POST",
        body: JSON.stringify(departmentValue),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization" : aurthorizationToken

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
            issueAssignTo.appendChild(option);
        });
    })
        .catch((e) => {
            console.error(e);
        })

}
let today = new Date();
let currentdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

function storeTicketData() {

    subject = document.querySelector("#subject").value;
    issueDescription = document.querySelector("#description").value;
    issueStatus = document.querySelector("#status").value;
    issuePriority = document.querySelector("#priority").value;
    issueAssignTo = document.querySelector("#assignee").value;
    
    console.log(currentdate);
    let data = {
        Subject : subject,
        Decription : issueDescription,
        Department : department.value,
        Status : issueStatus,
        Priority : issuePriority,
        CreatedDate : currentdate,
        AssignTo : issueAssignTo,
        CreatedBy : aurthorizationToken,

    }
    console.log(data);

    fetch("http://localhost:4000/issuePortal/createIssue", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization" : aurthorizationToken,

        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        if (data == "issueCreated") {
            alert("issueCreated");
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
