const express=require('express')
const {getSingleUser,getAllUsers,addNewUser,deleteUser,updateUser} = require('./controller')
const userRoutes=express.Router({mergeParams:true});

userRoutes.post('/getSingleUser',getSingleUser)
userRoutes.get('/getAllUser',getAllUsers)
userRoutes.post('/addNewUser',addNewUser)
userRoutes.delete('/deleteUser',deleteUser)
userRoutes.put('/updateUser',updateUser)
module.exports={
    userRoutes,
}