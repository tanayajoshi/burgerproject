const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
            console.log("exist")
        }
        else{
            res.json("notexist")
        }
    }

    catch(e){
        res.json("notexist")
    }
})

app.post("/signup",async(req,res)=>{
    const{email,password,confirmPassword}=req.body

    const data={email:email,password:password}

    console.log(req.body)



    try{
        const check=await collection.findOne({email})

        if(check){
            // alert("Email already exists")
            console.log("exist")
            res.json("exist")
        }
        else{
            
            const check = await collection.insertMany([data])
            res.json("notexist")
            
            console.log(check)
        }
       
    }

    catch(e){
        console.log(e)
        // res.json("notexist")
    }
})

app.listen(8000,()=>{
    console.log("port connected")
})