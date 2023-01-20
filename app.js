const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const app=new express();
const mongoose=require("mongoose");
const cookieparser=require("cookie-parser");
const sessions=require("express-session");
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
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
const oneday=1000*60*60*24;
app.use(sessions({
    secret: "thisismysecretkeyabcdefghitred",
    saveUninitialized: true,
    cookie: {maxAge: oneday},
    resave: false
}));
app.use(cookieparser());
var session;
app.get("/",function(req,res){
    session=req.session;
    if(session.userid){
        userid=session.userid;
        student.findOne({id: userid},function(err,stud){
        res.render("dashboard.ejs",{student: stud});
        });
    }
    else
    res.render("login.ejs");
})
const quiz=[{
    question: "Q1: What is the full form of HTML",
    a: "Hello To My Land",
    b: "Hyper Text Markup Language",
    c: "HyperText Makeup Language",
    d: "Hypertext Markup Language",
    ans: "ans4"
}, {
    question: "Q2: What is the full form of CSS",
    a: "Cascading Style Sheets",
    b: "Castel Store Sheet",
    c: "Cartoon Style Sheets",
    d: "Cascading Super Sheets",
    ans: "ans1"
}, {
    question: "Q3: What is the full form of HTTP",
    a: "Hello To Product",
    b: "Hyper Text Protocol",
    c: "HyperText Transfer Protocol",
    d: "Hyper Transfer Protocol",
    ans: "ans3"
}, {
    question: "Q4: What is the full form of JS",
    a: "Just Scripting",
    b: "Java String",
    c: "Java Script",
    d: "Java Sending",
    ans: "ans3"
}, {
    question: "Q5: What is the full form of HTML",
    a: "Hello To My Land",
    b: "Hyper Text Markup Language",
    c: "HyperText Makeup Language",
    d: "Hyper Markup Language",
    ans: "ans3"
}];
app.get("/quiz",function(req,res){
    res.render("main",{quiz: quiz});
})
app.post("/login",function(req,res){
    userid=req.body.userid;
    psw=req.body.password;
    student.findOne({id: userid},function(err,stud){
        if(stud.password===psw){
            session=req.session;
            session.userid=userid;
            session.name=stud.name;
            console.log(req.session);
            res.render("dashboard.ejs",{student: stud});
        }
        else{
            res.redirect("/login");
        }
    })
})
app.post("/verify_id",function(req,res){
    userid=req.body.userid;
    console.log(userid);
    student.findOne({id: userid},function(err,stud) {
        if(!stud){
            res.render("forgot_password_step1.ejs");
        }
        else{
        res.render("forgot_password_step2.ejs",{id: userid});
        }
    })
})
app.get("/login",function(req,res){
    res.render("login.ejs")
})
app.get("/signin",function(req,res){
    res.render("information.ejs")
})
app.get("/forgotway",function(req,res){
    res.render("forgotway.ejs");
})
app.get("/forgot_password_step1",function(req,res){
    res.render("forgot_password_step1.ejs");
})
app.get("/placement",function(req,res){
    session=req.session;
    res.render("placement.ejs",{name: session.name});
})
app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})
app.get("/Forgot_user_id_step1",function(req,res){
    res.render("forgot_userid.ejs");
})
app.get("/admin",function(req,res){
    res.render("admin.ejs");
})
app.get("/test",function(req,res){
    res.render("compiler");
})
app.post("/compiler",function(req,res){
    var code=req.body.code;
    var lang=req.body.lang;
    var inp=req.body.input;
    var winput=req.body.winput;
    console.log(code);
    console.log(lang);
    console.log(inp);
    console.log(winput);
    if(lang=== "c" || lang=== "c++"){
        if(winput==="yes"){
            var envData = { OS : "windows" , cmd : "g++" ,options: {timeout: 100000}};
            compiler.compileCPPWithInput(envData,code,inp,function(data){
                res.send(data.output);
                console.log(data.output);
                console.log(data.error);
            })
        }
    }
})
app.post("/changepsw",function(req,res){
    console.log("hello");
    const userid=req.body.userid;
    const psw=req.body.pass;
    console.log(userid);
    student.updateOne({id: userid},{$set: {password: psw}},function(err){
        console.log(err);
    });
    res.redirect("/login");
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

app.listen("3000" || process.env.PORT,function(){
    console.log("server started");
})