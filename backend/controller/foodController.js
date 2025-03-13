import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try{
        await food.save()
        res.json({success: true, message: 'food added'})
    }catch(err){
        console.log('add food',err);
        res.json({success:false, message: "Error"})
    }
} 

//list foods
const listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({})
        res.json({
            success: true,
            data: foods
        })
    }catch(err){
        console.log('list food error',err);
        res.json({success: false, message: 'error'})
    }
}

const removeFood = async(req, res) =>{
    try{
        //get food document from database by id
        const food = await foodModel.findById(req.body.id)

        //remove image file from uploads folder
        fs.unlink(`uploads/${food.image}`,(error)=>{console.log('image delete error',error);
        })
        
        //delete food document from database 
        await foodModel.findByIdAndDelete(req.body.id)   
         
        res.json({
            success: true,
            message: 'food removed'
        })
    }catch(err){
        console.log('remove food error',err);
        res.json({
            success: false,
            message: 'Error' 
        })
    }
}

export {addFood, listFood, removeFood}