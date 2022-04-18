const express = require("express"); 
const issuePortalrouter = express.Router();
const issuePortalController = require("../controllers/issuePortal");
const auth = require("../middware/auth");

console.log("juhhol");
issuePortalrouter.post("/departmentDetails",(req,res)=>{
   
    issuePortalController.fetchdepartmentDetails(req,res);
});


issuePortalrouter.post("/status",auth,(req,res)=>{
    console.log("jbhjkj");
    issuePortalController.fetchStatus(req,res);
   
});


issuePortalrouter.post("/priority",auth,(req,res)=>{
    issuePortalController.fetchPriority(req,res);
});

issuePortalrouter.post("/assignTo",auth,(req,res)=>{

    console.log("bnjb");
    let {Department} = req.body;
    issuePortalController.fetchAssignee(Department,req,res);
})

issuePortalrouter.post("/createIssue",auth,(req,res)=>{

    console.log(req.body);
    let {Subject,Description,Department,Status,Priority,CreatedDate,AssignTo,CreatedBy} = req.body;
    issuePortalController.storeIssueData(Subject,Description,Department,Status,Priority,CreatedDate,AssignTo,CreatedBy,req,res);
})


module.exports = issuePortalrouter 