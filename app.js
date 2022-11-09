const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const app=new express();
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/usersdb");
const studentschema={
name: String,
email: String,
numb: String,
id: Number,
password: String
}
const student=mongoose.model("student",studentschema);
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/",function(req,res){
    res.render("login.ejs");
})
app.post("/login",function(req,res){
    userid=req.body.userid;
    psw=req.body.password;
    student.findOne({id: userid},function(err,stud){
        if(stud.password===psw){
            res.render("dashboard.ejs",{student: stud});
        }
        else{
            res.redirect("/login");
        }
    })
})

app.get("/login",function(req,res){
    res.render("login.ejs")
})
app.get("/signin",function(req,res){
    res.render("information.ejs")
})
app.post("/signin",function(req,res){
    const name=req.body.name;
    const email=req.body.email;
    const id=req.body.id;
    const phn=req.body.number;
    const psw=req.body.password;
    const stud=new student({
        name: name,
        email: email,
        numb: phn,
        id: id,
        password: psw
    })
    stud.save();
    res.redirect("/login");
    
})
app.listen("3000",function(){
    console.log("server started");
})