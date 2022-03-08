const express=require('express')
const {getSingleNoteBook, getAllNoteBooks, addNewNoteBook, deleteNoteBook,updateNoteBook,deleteNoteBookTest} = require('./controller')
const notebookRoutes=express.Router({mergeParams:true});

notebookRoutes.post('/getSingleNoteBook',getSingleNoteBook)
notebookRoutes.get('/getAllNoteBooks',getAllNoteBooks)
notebookRoutes.post('/addNewNoteBook',addNewNoteBook)
notebookRoutes.post('/deleteNoteBook',deleteNoteBook)
notebookRoutes.delete("/deleteNotebookTest",deleteNoteBookTest)
notebookRoutes.put('/updateNoteBook',updateNoteBook)
module.exports={
    notebookRoutes,
}