const jwt = require("jsonwebtoken")
const connection = require("../database/database_connection");

function checkUserCredentials(Email, Password,req,res) {
    let queryToCheckEmailPassword = `SELECT * FROM user_info WHERE email = "${Email}" AND password = "${Password}";`;
    connection.query(queryToCheckEmailPassword, (err, result) => {
        if(result.length > 0) {
            // console.log(result);
            console.log("user found");
            result.forEach(element => {
                
               
                let user = element.email
                // value = element.id
                // userTypeObject.push({
                //     [key] :  value,
                // })
                const token  =   jwt.sign({user}, process.env.TOKEN_KEY)
                res.status(200).json({ success: true, data: {user,token}});
            })
            
            

        }
        else{

            console.log(err);
            res.status(400).json({ success: false, data: "noUserFound" });

        }
    })
}

module.exports = { checkUserCredentials }