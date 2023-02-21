const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    userID:{type:String}
})

const NoteModel = mongoose.model("notes",noteSchema);

module.exports = {NoteModel};