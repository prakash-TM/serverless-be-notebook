require('dotenv').config();
var AWS = require("aws-sdk");
let awsConfig = {
    "region": process.env.region,
    "endpoint": process.env.endpoint,
    "accessKeyId": process.env.accessKeyId, "secretAccessKey": process.env.secretAccessKey
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
const table="user"
//GET
//SINGLE
const getSingleUser = async (req, res) => {
    const id = req.body
    const searchKey = id.data 
    console.log({searchKey})
    var params = {
        TableName: table,
        Key: {"id":searchKey}
    }

    // Avinash method :not using primary key(id) use below way for some other values to be filter data line name key(not primary one)
    // let reqParams = req.params;
    // const params = {
    // FilterExpression: "#a = :aa",
    // ExpressionAttributeNames: {
    //     "#a": "id" 
    // },
    // ExpressionAttributeValues: { ":aa": "1" },
    // TableName: "user"
    // };

    const response = await docClient.get(params, (err, data) => {
        if (err) {
            res.status(404).json({ message: "can't find user" })
        }
        res.send(data.Item)
    })
}

//All
const getAllUsers = async (req, res) => {
    var params = {
        TableName: table,
    };
    const response = await docClient.scan(params, (err, data) => {
        if (err) {
            res.status(404).json({ message: "can't find user" })
        }
        res.status(200).json( data.Items )
    })
}

//POST
const addNewUser = async (req, res) => {
    const dataKey = req.body
    console.log(dataKey)
    var params = {
        TableName: table,
        Item: dataKey.data
    }
    const response = await docClient.put(params, (err, data) => {
        if (err) {
            res.status(404).json({ err })
        }
        res.status(200).json({ message: "successfully created user" })

    })
}

//DELETE
const deleteUser = async (req, res) => {
    const id = req.body
    const deleteKey = id.data
    console.log(req.body)
    console.log(deleteKey)
    var params = {
        TableName: table,
        Key: {"id":deleteKey}
    }
    const response = await docClient.delete(params, (err, data) => {
        if (err) {
            res.status(404).json({ err })
        }
        res.status(200).json({ message: "successfully deleted user credentials" })
    })
}

//UPDATE
const updateUser=async(req,res)=>{
    const {id,userName,uName,email,contactNumber,gender} = req.body.data
    console.log(id,userName,uName,email,contactNumber,gender)
    console.log(req.body)
    var params = {
        TableName: table,
        Key:{"id":id},
        UpdateExpression: "set userName = :byUserName, uName = :by_Name,email = :byEmail,contactNumber = :byContactNumber,gender = :byGender",
        ExpressionAttributeValues: {
            ":byUserName":userName,
            ":by_Name": uName,
            ":byEmail": email,
            ":byContactNumber":contactNumber,
            ":byGender":gender

        },
        ReturnValues: "UPDATED_NEW"

    };
    const response=await docClient.update(params,(err,data)=>{
        if(err){
           res.status(404).json({err})
        }
        res.status(200).json({message:"successfully updated user credentials"})
    })
}



module.exports = { getSingleUser, getAllUsers, addNewUser, deleteUser,updateUser }