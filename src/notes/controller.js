require('dotenv').config();
var AWS = require("aws-sdk");
let awsConfig = {
    "region": process.env.region,
    "endpoint": process.env.endpoint,
    "accessKeyId": process.env.accessKeyId, "secretAccessKey": process.env.secretAccessKey
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
const table="note"
//GET
//SINGLE
const getSingleNote = async (req, res) => {
    const id = req.body
    const searchKey = id.data 
    console.log({searchKey})
    var params = {
        TableName: table,
        Key: {"id":searchKey}
    }
    const response = await docClient.get(params, (err, data) => {
        if (err) {
            res.status(404).json({ message: "can't find note" })
        }
        res.send(data.Item)
    })
}

//All
const getAllNotes = async (req, res) => {
    var params = {
        TableName: table,
    };
    const response = await docClient.scan(params, (err, data) => {
        if (err) {
            res.status(404).json({ message: "can't find notes" })
        }
        res.status(200).json(data.Items)
    })
}

//POST
const addNewNote = async (req, res) => {
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
        res.status(200).json({ message: "successfully created note" })
    })
}

//DELETE
const deleteNote = async (req, res) => {
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
        res.status(200).json({ message: "successfully deleted note" })
    })
}

//UPDATE
const updateNote=async(req,res)=>{
    const {id,title,authorId,authorName,email} = req.body.data
    console.log(id,title,authorId,authorName,email)
    console.log(req.body)
    var params = {
        TableName: table,
        Key:{"id":id},
        UpdateExpression: "set title = :byTitle, authorId = :byAuthorId,authorName = :byAuthorName,email = :byEmail",
        ExpressionAttributeValues: {
            ":byTitle":title,
            ":byAuthorId": authorId,
            ":byAuthorName":authorName,
            ":byEmail": email
        },
        ReturnValues: "UPDATED_NEW"
    };
    const response=await docClient.update(params,(err,data)=>{
        if(err){
           res.status(404).json({err})
        }
        res.status(200).json({message:"successfully updated note"})
    })
}


module.exports = { getSingleNote, getAllNotes, addNewNote, deleteNote,updateNote }