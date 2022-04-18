const connection = require("../database/database_connection");

function showTicket(req,res)
{
    let queryToShowTicket = `SELECT * FROM issue;`
    connection.query(queryToShowTicket,(err,result)=>{
        if(result.length > 0)
        {
            console.log(result);
            let issueData = [];
            result.forEach(element => {
                let queryTogetAllTicketData = `SELECT name FROM department WHERE id = "${element.department_id}"; SELECT title FROM status WHERE id = "${element.status}";SELECT title FROM priority WHERE id = "${element.priority}";SELECT name FROM user_info WHERE id = "${element.assign_to}";SELECT name FROM user_info WHERE id = "${element.created_by}";`
                connection.query(queryTogetAllTicketData,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        issueData.push(element.id);
                        issueData.push(element.subject);

                        console.log(result);
                        result.forEach(element=>{
                            console.log(element);
                            element.forEach(info=>{
                                if(info.name != undefined)
                                {
                                    console.log(info.name);
                                    issueData.push(info.name);
                                }
                                else if(info.title != undefined)
                                {
                                    console.log(info.title);
                                    issueData.push(info.title);
                                }
                                
                            })
                            
                        })
                        console.log(issueData);
                        res.status(200).json({success:true , data : issueData });
                    }
                })
            });
        }
        else
        {
            res.status(400).json({ success: false, data: "noTicketFound" });
        }
    })
}

module.exports={showTicket}