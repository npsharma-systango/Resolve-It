const connection = require("../database/database_connection");
const jwt = require('jsonwebtoken');
require('dotenv').config()



async function fetchdepartmentDetails(req,res)
{
    let departmentObject = [];
    console.log("inside function ---------------------");
    let queryToGetAllDepartment = `SELECT id,name FROM department`

     connection.query(queryToGetAllDepartment, (err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({success:false , error : err });
        }
        else
        {
            
            // console.log(result.length + "bxshb");
            result.forEach(element => {
                let key,value;
               
                key = element.name;
                // console.log(key + "hjgkui");
                value = element.id
                departmentObject.push({
                    [key] :  value,
                })
                
            })
            
        }
        console.log(departmentObject);
       res.status(200).json({success:true , data : departmentObject });
    })
   
}

function fetchStatus(req,res)
{
    let statusObject = [];
    console.log("inside function ---------------------");
    let queryToGetAllStatus = `SELECT id,title FROM status`

     connection.query(queryToGetAllStatus, (err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({success:false , error : err });
        }
        else
        {
            
            // console.log(result.length + "bxshb");
            result.forEach(element => {
                let key,value;
               
                key = element.title;
                // console.log(key + "hjgkui");
                value = element.id
                statusObject.push({
                    [key] :  value,
                })
                
            })
            
        }
        console.log(statusObject);
       res.status(200).json({success:true , data : statusObject });
    })
   
}

function fetchPriority(req,res)
{
    let priorityObject = [];
    console.log("inside function");
    let queryToGetAllpriority = `SELECT id,title FROM priority`

     connection.query(queryToGetAllpriority, (err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({success:false , error : err });
        }
        else
        {
            
            // console.log(result.length + "bxshb");
            result.forEach(element => {
                let key,value;
               
                key = element.title;
                // console.log(key + "hjgkui");
                value = element.id
                priorityObject.push({
                    [key] :  value,
                })
                
            })
            
        }
        console.log(priorityObject);
       res.status(200).json({success:true , data : priorityObject });
    })
   
}

function fetchAssignee(Department,req,res)
{
    let assigneeObject = [];
    console.log("inside function");
    let queryToGetUserId = `SELECT user_id FROM user_department_role WHERE department_id = "${Department}" AND user_type_id = "${1}"`

     connection.query(queryToGetUserId, (err,result)=>{
        if(result.length > 0)
        {
            console.log(result);
            // console.log(result.length + "bxshb");
            result.forEach(element => {
                let key,value;
               
                key = element.user_id;
                console.log(key);
                let queryToGetUsernameFromId = `SELECT name,id FROM user_info WHERE id = "${key}"`
                connection.query(queryToGetUsernameFromId,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                        res.status(400).json({success:false , error : err });
                    }
                    else{
                        console.log(result);
                        result.forEach(element => {
                            let key,value;
                           
                            key = element.name;
                            // console.log(key + "hjgkui");
                            value = element.id
                            assigneeObject.push({
                                [key] :  value,
                            })
                            
                        })
                        console.log(assigneeObject);
                        res.status(200).json({success:true , data : assigneeObject });
                    }
                })
                
            })
        }
        else
        {
            console.log(err);
            res.status(400).json({success:false , error : err });
            
        }
    //     console.log(priorityObject);
    //    res.status(200).json({success:true , data : priorityObject });
    })
   
}

function storeIssueData(Subject,Decription,Department,Status,Priority,CreatedDate,AssignTo,CreatedBy,req,res)
{
    console.log(CreatedBy);
    let decoded = jwt.verify(CreatedBy, process.env.TOKEN_KEY)
    console.log(decoded.user);
    let queryToGetIdOfUser = `SELECT id FROM user_info WHERE email = "${decoded.user}";`;

    connection.query(queryToGetIdOfUser,(err,result)=>
    {
        if(result.length > 0)
        {
            // let creater
            console.log(result);
            result.forEach(element =>{
                let creater = element.id
                let queryToInsertIssueData = `INSERT INTO issue (subject, description, department_id, status , priority, created_date,assign_to,created_by) VALUES  ( "${Subject}", "${Decription}", "${Department}" , "${Status}","${Priority}","${CreatedDate}","${AssignTo}","${creater}");`;
            
                connection.query(queryToInsertIssueData,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("data stored");
                        res.status(200).json({success:true , data : "issueCreated" });
                    }
                })
            });
            
        }
        else
        {
            
            res.status(400).json({success:false , data : err });
            
        }
    })
}


module.exports = {fetchdepartmentDetails,fetchStatus,fetchPriority,fetchAssignee,storeIssueData}