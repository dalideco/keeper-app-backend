require('dotenv').config();

//requirements
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//mongoose initialization
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.igzzx.mongodb.net/DocsDB`,
    {useNewUrlParser:true,useUnifiedTopology:true}
)

const  DocSchema = new mongoose.Schema({
    title:String,
    content:String
})

const Doc = new mongoose.model('docs',DocSchema);




//express initialization
const port = process.env.PORT|| 5000;

const app = express(); 
app.use(bodyParser.urlencoded({extended:true}));

//routes

app.get("/find",(req,res)=>{
    Doc.find((err, foundDoc)=>{
        if (err) console.log(err);
        else res.send(foundDoc);
    })
})

app.post("/add",async (req,res)=>{
    const {title,content}= req.body;
    (new Doc({
        title:title,
        content: content
    })).save();
})

app.post("/remove",(req,res)=>{
    const theid = req.body._id;
    Doc.deleteOne({_id:theid},err=>{
        if(err) console.log(err);
    })

})


app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})