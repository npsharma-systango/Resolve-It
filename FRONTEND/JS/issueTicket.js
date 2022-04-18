let tableBody = document.querySelector("#tableBody");

let aurthorizationToken  = localStorage.getItem("Aurthorization");
showTicket();

function showTicket()
{
    fetch("http://localhost:4000/issueTicket/showTicket", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization" : aurthorizationToken,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        console.log(data.length);
        let ticket = document.createElement("tr");
        ticket.setAttribute("id", "ticket");
        let subject = document.createElement("td");
        let priority = document.createElement("td");
        let assignee = document.createElement("td");
        let status = document.createElement("td");
        let createdBy = document.createElement("td");
        let department = document.createElement("td");


        let id = document.createElement("a");

        
        
        
        
        id.innerHTML = data[0];
        subject.innerHTML = data[1];
        department.innerHTML = data[2];
        status.innerHTML = data[3];
        priority.innerHTML = data[4];
        assignee.innerHTML = data[5];
        createdBy.innerHTML = data[6];

        
        ticket.appendChild(id);
        ticket.appendChild(subject);
        ticket.appendChild(department);
        ticket.appendChild(status);
        ticket.appendChild(priority);
        ticket.appendChild(assignee);
        ticket.appendChild(createdBy);
        



        tableBody.appendChild(ticket);
    })
        .catch((e) => {
            console.error(e);
        })
}