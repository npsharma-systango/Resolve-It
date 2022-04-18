const connection = require("../database/database_connection");

function storeUserData(Name,Email,Usertype,Password,req,res)
{
    let queryToSearchEmail = `SELECT * FROM user_info WHERE email = "${Email}";`;
    let queryToInsertUserData = `INSERT INTO user_info (name, email, user_type, password) VALUES  ( "${Name}", "${Email}", "${Usertype}" , "${Password}");`;

    connection.query(queryToSearchEmail,(err,result)=>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            let check = result.length;
            if(check<1)
            {
                connection.query(queryToInsertUserData,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("data stored");
                        res.status(200).json({success:true , data : "register" });
                    }
                })
            }
            else
            {
                res.status(400).json({success:false , data : "alreadyExist" });
            }
        }
    })
    
}


async function fetchUserType(req,res)
{
    let userTypeObject = [];
    console.log("inside function ---------------------");
    let queryToGetAllUserType = `SELECT id,title FROM user_type`

     connection.query(queryToGetAllUserType, (err,result)=>{
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
               
                key = element.title
                // console.log(key + "hjgkui");
                value = element.id
                userTypeObject.push({
                    [key] :  value,
                })
                
            })
            
        }
        console.log(userTypeObject);
       res.status(200).json({success:true , data : userTypeObject });
    })
   
}


module.exports = {storeUserData,fetchUserType}