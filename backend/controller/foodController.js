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

}

export {addFood, listFood}