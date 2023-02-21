const express = require("express");
const {NoteModel} = require("../Models/notes.model");
const {auth} = require("../Middlewares/auth.middleware");

const notesRoute = express.Router();

notesRoute.get("/mynotes",auth,async (req,res) => {
    try{
        const mynotes = await NoteModel.find({userID:req.body.userID});
        if(mynotes.length > 0){
            res.send(mynotes);
        }
        else{
            res.send({"message":"You have not created any posts yet"});
        }
    }
    catch(err){
        res.send({"message":"Something Went Wrong","error":err.message});
    }
})

notesRoute.post("/create",auth,async (req,res) => {
    const note = req.body;
    try{
        const savenotes = new NoteModel(note);
        await savenotes.save();
        res.send({"message":"Notes created"});
    }
    catch(err){
        res.send({"message":"Something Went Wrong","error":err.message});
    }
})

notesRoute.patch("/update/:notesID",auth,async (req,res) => {
    const notesUpdate = req.body;
    const {notesID} = req.params;
    try{
        await NoteModel.findByIdAndUpdate({_id:notesID},notesUpdate);
        res.send({"message":"Notes Updated"});
    }
    catch(err){
        res.send({"message":"Something Went Wrong","error":err.message});
    }
})

notesRoute.delete("/delete/:notesID",auth,async (req,res) => {
    const {notesID} = req.params;
    try{
        await NoteModel.findByIdAndDelete({_id:notesID});
        res.send({"message":"Notes Deleted"});
    }
    catch(err){
        res.send({"message":"Something Went Wrong","error":err.message});
    }
})

module.exports = {notesRoute};

