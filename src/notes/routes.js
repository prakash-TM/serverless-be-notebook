const express=require('express')
const {getSingleNote, getAllNotes, addNewNote, deleteNote,updateNote} = require('./controller')
const notesRoutes=express.Router({mergeParams:true});

notesRoutes.post('/getSingleNote',getSingleNote)
notesRoutes.get('/getAllNotes',getAllNotes)
notesRoutes.post('/addNewNote',addNewNote)
notesRoutes.delete('/deleteNote',deleteNote)
notesRoutes.put('/updateNote',updateNote)
module.exports={
    notesRoutes,
}