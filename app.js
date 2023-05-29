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
const postSchema={
    role: String,
    sdate: String,
    edate: String,
    content: String,
    per10: String,
    per12: String,
    grad: String
}
const timetableSchema={
	sem: String,
	m1:String,
	m2:String,
	m3:String,
	m4:String,
	m5:String,
	m6:String,
	m7:String,
	m8:String,
	t1:String,
	t2:String,
	t3:String,
	t4:String,
	t5:String,
	t6:String,
	t7:String,
	t8:String,
	w1:String,
	w2:String,
	w3:String,
	w4:String,
	w5:String,
	w6:String,
	w7:String,
	w8:String,
	th1:String,
	th2:String,
	th3:String,
	th4:String,
	th5:String,
	th6:String,
	th7:String,
	th8:String,
	f1:String,
	f2:String,
	f3:String,
	f4:String,
	f5:String,
	f6:String,
	f7:String,
	f8:String
}
const applySchema={
    status: String,
    name: String,
    sname: String,
    email: String,
    per10: String,
    per12: String,
    id: Number
};
const noticeSchema={
    noticetitle: String,
    noticelink: String,
    NoticeContent: String,
    Date1: String
    };
const resumeSchema={
    name: String,
    domain: String,
    email: String,
    phone: String,
    about: String,
    skills: String,
    hobbies: String,
    tools: String,
    lang: String,
    org_name1: String,
    org_start_date1: String,
    org_end_date1: String,
    org_des1: String,
    org_name2: String,
    org_start_date2: String,
    org_end_date2: String,
    org_des2: String,
    project_name1: String,
    project_des1: String,
    project_name2: String,
    project_des2: String,
    project_name3: String,
    project_des3: String,
    Certificate_name1: String,
    Certificate_org_name1: String,
    Certificate_start_date1: String,
    Certificate_end_date1: String,
    Certificate_name2: String,
    Certificate_org_name2: String,
    Certificate_start_date2: String,
    Certificate_end_date2: String,
    Certificate_name3: String,
    Certificate_org_name3: String,
    Certificate_start_date3: String,
    Certificate_end_date3: String,
    id: Number

};
const testSchema = {
	TestID: String,
	ExamPassword: String,

	ques1: String,
	q1o1: String,
	q1o2: String,
	q1o3: String,
	q1o4: String,
	q1cans: String,

	ques2: String,
	q2o1: String,
	q2o2: String,
	q2o3: String,
	q2o4: String,
	q2cans: String,

	ques3: String,
	q3o1: String,
	q3o2: String,
	q3o3: String,
	q3o4: String,
	q3cans: String,

	ques4: String,
	q4o1: String,
	q4o2: String,
	q4o3: String,
	q4o4: String,
	q4cans: String,

	ques5: String,
	q5o1: String,
	q5o2: String,
	q5o3: String,
	q5o4: String,
	q5cans: String,

	ques6: String,
	q6o1: String,
	q6o2: String,
	q6o3: String,
	q6o4: String,
	q6cans: String,

	ques7: String,
	q7o1: String,
	q7o2: String,
	q7o3: String,
	q7o4: String,
	q7cans: String,

	ques8: String,
	q8o1: String,
	q8o2: String,
	q8o3: String,
	q8o4: String,
	q8cans: String,

	ques9: String,
	q9o1: String,
	q9o2: String,
	q9o3: String,
	q9o4: String,
	q9cans: String,

	ques10: String,
	q10o1: String,
	q10o2: String,
	q10o3: String,
	q10o4: String,
	q10cans: String,



	ques11: String,
	q11o1: String,
	q11o2: String,
	q11o3: String,
	q11o4: String,
	q11cans: String,

	ques12: String,
	q12o1: String,
	q12o2: String,
	q12o3: String,
	q12o4: String,
	q12cans: String,

	ques13: String,
	q13o1: String,
	q13o2: String,
	q13o3: String,
	q13o4: String,
	q13cans: String,

	ques14: String,
	q14o1: String,
	q14o2: String,
	q14o3: String,
	q14o4: String,
	q14cans: String,

	ques15: String,
	q15o1: String,
	q15o2: String,
	q15o3: String,
	q15o4: String,
	q15cans: String,

	ques16: String,
	q16o1: String,
	q16o2: String,
	q16o3: String,
	q16o4: String,
	q16cans: String,

	ques17: String,
	q17o1: String,
	q17o2: String,
	q17o3: String,
	q17o4: String,
	q17cans: String,

	ques18: String,
	q18o1: String,
	q18o2: String,
	q18o3: String,
	q18o4: String,
	q18cans: String,

	ques19: String,
	q19o1: String,
	q19o2: String,
	q19o3: String,
	q19o4: String,
	q19cans: String,

	ques20: String,
	q20o1: String,
	q20o2: String,
	q20o3: String,
	q20o4: String,
	q20cans: String,

	codeQuestion: String,
	sampleTest1: String,
	sampleTest2: String,
	CodeAns: String
};
const test=mongoose.model("test",testSchema);
const resume=mongoose.model("resume",resumeSchema);
const notice=mongoose.model("notice",noticeSchema);
const apply=mongoose.model("appl",applySchema);
const table=mongoose.model("table",timetableSchema);
const post=mongoose.model("post",postSchema);
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
app.get("/cnotice",function(req,res){
    res.render("cnotice.ejs");
})
app.post("/cnotice",function(req,res){
    const d=new Date();
    const a=new notice({
        noticetitle: req.body.noticetitle,
noticelink: req.body.noticelink,
NoticeContent: req.body.NoticeContent,
Date1: d
    });
    a.save();
    res.redirect("/admin");
})
app.get("/notice",function(req,res){
    notice.find({ },function(err,ques){
        res.render("notice.ejs",{table: ques});
    })
})
app.post("/capply",function(req,res){
    const abc=req.body.check;
    const a="In Review";
    student.findOne({id: session.userid}).then((stud)=>{
        const b=new apply({
            id: session.userid,
            name: abc,
            status: a,
            email: stud.email,
            sname: stud.fname+" "+stud.mname+" "+stud.lname,
            per10: stud.tenagri,
            per12: stud.tewagri,
            id: stud.id
        });
        b.save();
    });
    
    //b.save();
    res.redirect("/");
})
app.post("/createtest",function(req,res){
    const ab=new test({
        TestID: req.body.TestID,
	ExamPassword: req.body.ExamPassword,
	ques1: req.body.ques1,
	q1o1: req.body.q1o1,
	q1o2: req.body.q1o2,
	q1o3: req.body.q1o3,
	q1o4: req.body.q1o4,
	q1cans: req.body.q1cans,
	ques2: req.body.ques2,
	q2o1: req.body.q2o1,
	q2o2: req.body.q2o2,
	q2o3: req.body.q2o3,
	q2o4: req.body.q2o4,
	q2cans: req.body.q2cans,
	ques3: req.body.ques3,
	q3o1: req.body.q3o1,
	q3o2: req.body.q3o2,
	q3o3: req.body.q3o2,
	q3o4: req.body.q3o4,
	q3cans: req.body.q3cans,
	ques4: req.body.ques4,
	q4o1: req.body.q4o1,
	q4o2: req.body.q4o2,
	q4o3: req.body.q4o3,
	q4o4: req.body.q4o4,
	q4cans: req.body.q4cans,
	ques5: req.body.ques5,
	q5o1: req.body.q5o1,
	q5o2: req.body.q5o2,
	q5o3: req.body.q5o3,
	q5o4: req.body.q5o4,
	q5cans: req.body.q5cans,
	ques6: req.body.ques6,
	q6o1: req.body.q6o1,
	q6o2: req.body.q6o2,
	q6o3: req.body.q6o3,
	q6o4: req.body.q6o4,
	q6cans: req.body.q6cans,
	ques7: req.body.ques7,
	q7o1: req.body.q7o1,
	q7o2: req.body.q7o2,
	q7o3: req.body.q7o3,
	q7o4: req.body.q7o4,
	q7cans: req.body.q7cans,
	ques8: req.body.ques8,
	q8o1: req.body.q8o1,
	q8o2: req.body.q8o2,
	q8o3: req.body.q8o3,
	q8o4: req.body.q8o4,
	q8cans: req.body.q8cans,
	ques9: req.body.ques9,
	q9o1: req.body.q9o1,
	q9o2: req.body.q9o2,
	q9o3: req.body.q9o3,
	q9o4: req.body.q9o4,
	q9cans: req.body.q9cans,
	ques10: req.body.ques10,
	q10o1: req.body.q10o1,
	q10o2: req.body.q10o2,
	q10o3: req.body.q10o3,
	q10o4: req.body.q10o4,
	q10cans: req.body.q10cans,
	ques11: req.body.ques11,
	q11o1: req.body.q11o1,
	q11o2: req.body.q11o2,
	q11o3: req.body.q11o3,
	q11o4: req.body.q11o4,
	q11cans: req.body.q11cans,
	ques12: req.body.ques12,
	q12o1: req.body.q12o1,
	q12o2: req.body.q12o2,
	q12o3: req.body.q12o3,
	q12o4: req.body.q12o4,
	q12cans: req.body.q12cans,
	ques13: req.body.ques13,
	q13o1: req.body.q13o1,
	q13o2: req.body.q13o2,
	q13o3: req.body.q13o3,
	q13o4: req.body.q13o4,
	q13cans: req.body.q13cans,
	ques14: req.body.ques14,
	q14o1: req.body.q14o1,
	q14o2: req.body.q14o2,
	q14o3: req.body.q14o3,
	q14o4: req.body.q14o4,
	q14cans: req.body.q14cans,
	ques15: req.body.ques15,
	q15o1: req.body.q15o1,
	q15o2: req.body.q15o2,
	q15o3: req.body.q15o3,
	q15o4: req.body.q15o4,
	q15cans: req.body.q15cans,
	ques16: req.body.ques16,
	q16o1: req.body.q16o1,
	q16o2: req.body.q16o2,
	q16o3: req.body.q16o3,
	q16o4: req.body.q16o4,
	q16cans: req.body.q16cans,
	ques17: req.body.ques17,
	q17o1: req.body.q17o1,
	q17o2: req.body.q17o2,
	q17o3: req.body.q17o3,
	q17o4: req.body.q17o4,
	q17cans: req.body.q17cans,
	ques18: req.body.ques18,
	q18o1: req.body.q18o1,
	q18o2: req.body.q18o2,
	q18o3: req.body.q18o3,
	q18o4: req.body.q18o4,
	q18cans: req.body.q18cans,
	ques19: req.body.ques19,
	q19o1: req.body.q19o1,
	q19o2: req.body.q19o2,
	q19o3: req.body.q19o3,
	q19o4: req.body.q19o4,
	q19cans: req.body.q19cans,
	ques20: req.body.ques20,
	q20o1: req.body.q20o1,
	q20o2: req.body.q20o2,
	q20o3: req.body.q20o3,
	q20o4: req.body.q20o4,
	q20cans: req.body.q20cans,
	codeQuestion: req.body.codeQuestion,
	sampleTest1: req.body.sampleTest1,
	sampleTest2: req.body.sampleTest2,
	CodeAns: req.body.CodeAns
    });
    ab.save();
    res.send("test created suucessfully"+req.body.TestID+" "+req.body.ExamPassword);
})
app.post("/resumeanalysis",function(req,res){
    
    var a= parseInt(req.body.check);
    //a=parseInt(a);
    console.log(a);
    console.log(typeof(a));
    resume.findOne({id: a}).then((stud)=>{
        //console.log(stud);
        if(stud){
            res.render("displayresume.ejs",{ab: stud});
        }
        
    })
    

})
app.post("/test1",function(req,res){
   /*  const id1=req.body.TestID;
    const password=req.body.password;
    test.findOne({id: id1}).then((stud)=>{
        if(stud.ExamPassword===password){
            res.render("test2.ejs",{ab: stud});
        }
        else{
            res.redirect("/taketest");
        }
    }); */
res.render("test2.ejs");
})
app.get("/taketest",function(req,res){
    res.render("test1.ejs");
})
app.get("/training",function(req,res){
    res.render("training.ejs");
})
app.get("/createtest",function(req,res){
    res.render("createtest.ejs");
})
app.get("/create_resume",function(req,res){
    res.render("create_resume.ejs");
})
app.post("/create_resume",function(req,res){
    const a=new resume({
        name: req.body.name,
    domain: req.body.domain,
    email: req.body.email,
    phone: req.body.phone,
    about: req.body.about,
    skills: req.body.skills,
    hobbies: req.body.hobbies,
    tools: req.body.tools,
    lang: req.body.lang,
    org_name1: req.body.org_name1,
    org_start_date1: req.body.org_start_date1,
    org_end_date1: req.body.org_end_date1,
    org_des1: req.body.org_des1,
    org_name2: req.body.org_name2,
    org_start_date2: req.body.org_start_date2,
    org_end_date2: req.body.org_end_date2,
    org_des2: req.body.org_des2,
    project_name1: req.body.project_name1,
    project_des1: req.body.project_des1,
    project_name2: req.body.project_name2,
    project_des2: req.body.project_des2,
    project_name3: req.body.project_name3,
    project_des3: req.body.project_des3,
    Certificate_name1: req.body.Certificate_name1,
    Certificate_org_name1: req.body.Certificate_org_name1,
    Certificate_start_date1: req.body.Certificate_start_date1,
    Certificate_end_date1: req.body.Certificate_end_date1,
    Certificate_name2: req.body.Certificate_name2,
    Certificate_org_name2: req.body.Certificate_org_name2,
    Certificate_start_date2: req.body.Certificate_start_date2,
    Certificate_end_date2: req.body.Certificate_end_date2,
    Certificate_name3: req.body.Certificate_name3,
    Certificate_org_name3: req.body.Certificate_org_name3,
    Certificate_start_date3: req.body.Certificate_start_date3,
    Certificate_end_date3: req.body.Certificate_end_date3,
    id: session.userid
    })
    a.save();
    res.render("displayresume.ejs",{ab: a});
})
app.post("/getstudentdata",function(req,res){
    const ab=req.body.sid;
    const abc=[];
    apply.find({name: ab},function(err,ques){
        console.log(ques);
        res.render("s2.ejs",{q: ques});
        
    
        
    })
    
    
})
app.get("/companyapplied",function(req,res){
    apply.find({id: session.userid},function(err,ques){
        res.render("companyApplied.ejs",{q: ques});
    })
})
app.post("/newpost",function(req,res){
    const newpost= new post({
        role: req.body.role,
        sdate: req.body.sdate,
        edate: req.body.edate,
        content: req.body.content,
        per10: req.body.criteria1,
        per12: req.body.criteria2,
        grad: req.body.criteria3
    })
    newpost.save();
    console.log(newpost)
    res.redirect("/companyDashboard");
})
app.get("/hireme",function(req,res){
    post.find({},function(err,ques){
        console.log(err);
        res.render("hireme.ejs",{q: ques});
    })
   //res.render("hireme.ejs");
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
    res.redirect("/companyinfo");
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
app.get("/createtable",function(req,res){
    res.render("createtable.ejs");
})
app.post("/table",function(req,res){
    const t1=new table({
        sem: req.body.sem,
	m1:req.body.m1,
	m2:req.body.m2,
	m3:req.body.m3,
	m4:req.body.m4,
	m5:req.body.m5,
	m6:req.body.m6,
	m7:req.body.m7,
	m8:req.body.m8,
	t1:req.body.t1,
	t2:req.body.t2,
	t3:req.body.t3,
	t4:req.body.t4,
	t5:req.body.t5,
	t6:req.body.t6,
	t7:req.body.t7,
	t8:req.body.t8,
	w1:req.body.w1,
	w2:req.body.w2,
	w3:req.body.w3,
	w4:req.body.w4,
	w5:req.body.w5,
	w6:req.body.w6,
	w7:req.body.w7,
	w8:req.body.w8,
	th1:req.body.th1,
	th2:req.body.th2,
	th3:req.body.th3,
	th4:req.body.th4,
	th5:req.body.th5,
	th6:req.body.th6,
	th7:req.body.th7,
	th8:req.body.th8,
	f1:req.body.f1,
	f2:req.body.f2,
	f3:req.body.f3,
	f4:req.body.f4,
	f5:req.body.f5,
	f6:req.body.f6,
	f7:req.body.f7,
	f8:req.body.f8
    });
    t1.save();
    res.send("successfull");
})
app.get("/showtable",function(req,res){
    table.find({},function(err,ques){
        console.log(ques);
        res.render("showtable.ejs",{table1: ques});
    })
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