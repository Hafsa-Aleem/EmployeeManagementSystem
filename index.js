const express = require("express")
const app = express()
const engine = require("express-handlebars").engine 
const db = require("./model/connection")

app.use(express.json())  //middleware
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//default page
app.get("/",(req,res)=>{
    res.render('home')
})




//add user
app.post("/adduser",(req,res)=>{
    console.log(req.body)
    const user = {id:req.body.id,name:req.body.name,email:req.body.email,city:req.body.city,phone:req.body.phone}
    const sql ="INSERT INTO `employee` SET ?"
    db.query(sql,user,(err,result)=>{
        if(err) throw err;
        else res.redirect("/getdata")
    })
})
//show data
app.get("/getdata",(req,res)=>{
    const sql = "SELECT * FROM `EMPLOYEE`"
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{ 
            res.render('show',{list:result})
        }
    })
})


app.get('/showuserdelete',(req,res)=>{
    const sql = "SELECT * FROM `EMPLOYEE`"
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            res.render('delete',{list:result})
                    //res.redirect("/getdata")
                }
            })
            
            
             //res.render('show',{list:result})
            
        })
    

//delete user
app.get("/deleteuser/:id",(req,res)=>{
    const sql = `DELETE FROM EMPLOYEE where id='${req.params.id}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else{
            // res.render('delete',{list:result})
           res.redirect("/getdata")
        }
    })
})



const PORT =4000
app.listen(PORT,()=>console.log(`connection established at ${PORT}`))