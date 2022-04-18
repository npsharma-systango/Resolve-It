require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require('cors');

server.listen(4000,()=>{
    console.log("Server listen 4000");

})
app.use(bodyParser.json());
 
const registerRouter = require("./routes/register")
const loginRouter = require("./routes/loginroutes")
const issuePortalRouter = require("./routes/issueCreate")
const issueTicketRouter = require("./routes/issueTicket")



app.use(cors());
app.use("/login",loginRouter);
app.use("/registration",registerRouter);
app.use("/issuePortal",issuePortalRouter);
app.use("/issueTicket",issueTicketRouter);
// app.use(express.static())
