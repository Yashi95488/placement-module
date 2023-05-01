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
mongoose.connect("mongodb://localhost:27017/erpdb");
const studentschema={
fname: String,
mname: String,
lname: String,
address: String,
city: String,
state: String,
country: String,
gender: String,
dob: String,
zipcode: String,
category: String,
personalnum: String,
othernum: String,
fathername: String,
mothername: String,
father_anuincom: String,
mother_anuincom: String,
father_occupation: String,
mother_occupation: String,
parent_tel: String,
tenagri: String,
tewagri: String,
tenschoolname: String,
tewschoolname: String,
jeescore: String,
jeescoreAdvance: String,
course: String,
branch: String,
email: String,
id: Number,
pass: String
}
const codingSchema={
    cid: Number,
    question: String,
    st: String
}
const criteriaSchema={
    name: String,
    per10: Number,
    per12: Number,
    pergra: Number
};
const criteria=mongoose.model("criteria",criteriaSchema);
const coding=mongoose.model("coding",codingSchema);
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
app.get("/enrollmentform",function(req,res){
    res.render("enrollmentform");
})
app.get("/training",function(req,res){
    res.render("training",{name: session.name});
})

app.get("/quiz",function(req,res){
    res.render("main",{quiz: quiz});
})
app.get("/companytestinfo",function(req,res){
    res.render("companytestinfo");
})
app.post("/savecoding",function(req,res){
    const questio=req.body.question;
    const st=req.body.st1;
    const q1=new coding({
        cid: 1,
        question: questio,
        st: st

    });
    q1.save();
    res.send("saved successfully");
})
app.get("/coding",function(req,res){
    coding.findOne({cid: 1},function(err,ques){
        res.render("compnaycoding.ejs",{q: ques});
    })
})
app.get("/companyinfo",function(req,res){
    res.render("companyinputcriteria");
})
app.post("/savecompanyinfo",function(req,res){
    const name=req.body.name;
    const per10=req.body.per10;
    const per12=req.body.per12;
    const pergra=req.body.pergra;
    const info=new criteria({
        name: name,
        per10: per10,
        per12: per12,
        pergra: pergra
    });
    info.save();
    res.send("saved succesfully");
    console.log(info);
})
app.get("/check",function(req,res){
    res.render("check.ejs");
})
app.post("/login",function(req,res){
    userid=req.body.userid;
    psw=req.body.password;
    student.findOne({id: userid},function(err,stud){
        if(stud.pass===psw){
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
app.get("/profile",function(req,res){
    student.findOne({id: session.userid},function(err,stud){
        res.render("profile",{student: stud});
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
app.get("/recomendation",function(req,res){
    session=req.session;
    if(session.userid){
        userid=session.userid;
        student.findOne({id: userid}).then((stud)=>{
            console.log(stud.name)
            console.log(stud.tenagri)
            criteria.find({$and: [{per10: { $lte: stud.tenagri}},{per12: {$lte: stud.tewagri}}]},(comp,err)=>{
                console.log(comp);
                console.log(err);
                res.render("recomendation.ejs",{student: err});
            })
        
        });
    }
    
})
app.get("/newpost",function(req,res){
    res.render("newpost.ejs");
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
app.get("/companyDashboard",function(req,res){
    res.render("companydashboard.ejs");
})
app.get("/studentSection",function(req,res){
    res.render("StudentSection");
})
app.post("/signin",function(req,res){
    
    const stud=new student({
        fname: req.body.fname,
mname: req.body.mname,
lname: req.body.lname,
address: req.body.address,
city: req.body.city,
state: req.body.state,
country: req.body.country,
gender: req.body.gender,
dob: req.body.dob,
zipcode: req.body.zipcode,
category: req.body.category,
personalnum: req.body.personalnum,
othernum: req.body.othernum,
fathername: req.body.fathername,
mothername: req.body.mothername,
father_anuincom: req.body.father_anuincom,
mother_anuincom: req.body.mother_anuincom,
father_occupation: req.body.father_occupation,
mother_occupation: req.body.mother_occupation,
parent_tel: req.body.parent_tel,
tenagri: req.body.tenagri,
tewagri: req.body.tewagri,
tenschoolname: req.body.tenschoolname,
tewschoolname: req.body.tewschoolname,
jeescore: req.body.jeescore,
jeescoreAdvance: req.body.jeescoreAdvance,
course: req.body.course,
branch: req.body.branch,
email: req.body.email,
id: req.body.id,
pass: req.body.pass
    })
    stud.save();
    res.redirect("/admin.ejs");
    
})

app.listen("3000" || process.env.PORT,function(){
    console.log("server started");
})