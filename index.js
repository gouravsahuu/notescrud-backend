const express = require("express");
const {connection} = require("./Configs/db");
const {userRoutes} = require("./Routes/user.routes");
const {notesRoute} = require("./Routes/notes.routes");
const cors = require("cors");
require("dotenv").config();
const port = process.env.port;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user",userRoutes);
app.use("/notes",notesRoute);
app.get("/",(req,res) => {
    res.send("This is the Backend Home Page");
})

app.listen(port,async () => {
    try{
        await connection;
        console.log("Connected to Database");
    }
    catch(err){
        console.log(err.message);
    }
    console.log(`Server is running at port ${port}`);
})