require('dotenv').config();
var AWS = require("aws-sdk");

let awsConfig = {
    "region": process.env.region,
    "endpoint": process.env.endpoint,
    "accessKeyId": process.env.accessKeyId, "secretAccessKey": process.env.secretAccessKey
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
const table="notebook"
//GET

//SINGLE
const getSingleNoteBook = async (req, res) => {
    const id =req.body
    const searchKey = id.data  // getting data only from thunder client
    console.log({searchKey})
    var params = {
        TableName: table,
        Key: {"id":searchKey}
    }
    const response = await docClient.get(params, (err, data) => {
        if (err) {
            res.status(404).json({ message: "can't find notebook" })
        }
        res.send(data.Item)
    })
}
//All


const getAllNoteBooks = async (req, res) => {
    var params = {
        TableName: table,
    };
    const response = await docClient.scan(params, (err, data) => {
        if (err) {
            res.status(404).json({ message: "can't find notebooks" })
        }
        res.send(data.Items)
    })
}

//POST
const addNewNoteBook = async (req, res) => {
    const dataKey = req.body
    console.log({dataKey})
    var params = {
        TableName: table,
        Item: dataKey.data
    }
    const response = await docClient.put(params, (err, data) => {
        if (err) {
            res.status(404).json({ err })
        }
        res.status(200).json({ message: "successfully created notebook" })

    })
}

//DELETE(POST)
const deleteNoteBook = async (req, res) => {
    const id = req.body
    const deleteKey = id.data
    console.log(deleteKey)
    var params = {
        TableName: table,
        Key: {"id":deleteKey}
    }
    const response = await docClient.delete(params, (err, data) => {
        if (err) {
            res.status(404).json({ err })
        }
        res.status(200).json({ message: "successfully deleted notebook" })
    })
}


//DELETE

const deleteNoteBookTest = async (req, res) => {
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
        res.status(200).json({ message: "successfully deleted notebook" })
    })
}

//UPDATE
const updateNoteBook=async(req,res)=>{
    const {id,title,description,userId}=req.body.data
    console.log(id,title,description,userId)
    console.log(req.body)
    var params = {
        TableName: table,
        Key:{"id":id},
        UpdateExpression: "set title = :byUserTitle, description = :byDescription,userId = :byUserId",
        ExpressionAttributeValues: {
            ":byUserTitle":title,
            ":byDescription": description,
            ":byUserId": userId
        },
        ReturnValues: "UPDATED_NEW"

    };
    const response=await docClient.update(params,(err,data)=>{
        if(err){
            res.status(404).json({ err })
        }
        res.status(200).json({ message: "successfully updated notebook" })
    })
}

module.exports = { getSingleNoteBook, getAllNoteBooks, addNewNoteBook, deleteNoteBook,updateNoteBook,deleteNoteBookTest }