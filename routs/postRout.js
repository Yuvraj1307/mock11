const express=require("express")
const { postModel } = require("../model/postModel")

const postRout=express.Router()


postRout.get("/",async (req,res)=>{

    try {
        let post=await postModel.find()
        console.log(post)
        res.status(200).send({msg:"here is your data",post})
    } catch (error) {
        console.log(error)
        res.status(404).send({msg:"not found"})
    }
 })


postRout.post("/",async (req,res)=>{

    let { name,email,destination, NoOftravellers,BudgetPerPerson}=req.body

    try {
        let post=new postModel({name,email,destination, NoOftravellers,BudgetPerPerson})
        await post.save()
        console.log(post)
        res.status(201).send({msg:"data is added"})
    } catch (error) {
        console.log(error)
        res.sendStatus(404).send({msg:"can't add"})
    }
    
})


postRout.delete("/:id",async (req,res)=>{
    let ID=req.params.id
    try {

        let post=await postModel.findByIdAndRemove({_id:ID})
        console.log(post)
        res.status(200).send({msg:"here is your post",post})
        
    } catch (error) {
        console.log(error)
        res.sendStatus(404).send({msg:"posts not found"})
    }

    
})


postRout.get("/:destination",async (req,res)=>{

    let filt=req.params.destination
    try {

        let post=await postModel.find({destination:filt})
        console.log(post)
        res.status(200).send({msg:"here is your post",post})
        
    } catch (error) {
        console.log(error)
        res.sendStatus(404).send({msg:"posts not found"})
    }

    
})

postRout.get("/get/:budgetperperson",async (req,res)=>{

    let sor=req.params.budgetperperson

    try {

        let post=await postModel.find().sort({BudgetPerPerson:sor})
        console.log(post)
        res.status(200).send({msg:"here is your post",post})
        
    } catch (error) {
        console.log(error)
        res.sendStatus(404).send({msg:"posts not found"})
    }

    
})


postRout.get("/get/:destination/filt/:budgetperperson",async (req,res)=>{
    // /get/${destination}/filt/${way}
    let sor=req.params.budgetperperson
    let filt=req.params.destination


    try {

        let post=await postModel.find({destination:filt}).sort({BudgetPerPerson:sor})
        console.log(post)
        res.status(200).send({msg:"here is your post",post})
        
    } catch (error) {
        console.log(error)
        res.sendStatus(404).send({msg:"posts not found"})
    }

    
})

module.exports={
    postRout
}