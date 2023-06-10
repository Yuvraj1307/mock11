const express=require("express")
const cors=require("cors")
const { connection } = require("./config/db")
const { postRout } = require("./routs/postRout")

const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/post",postRout)

app.listen(4500,async ()=>{

    try {
        await connection
        console.log("connected to DB at 4500")
    } catch (error) {
        
        console.log("cant connect")
        console.log(error)
    }
})