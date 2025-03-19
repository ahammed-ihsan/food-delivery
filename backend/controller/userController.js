import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config'

//login
const loginUser = async (req, res) => {
    
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {

    //take data through request body
    const {name, password, email} = req.body
    try{

        //check user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false, message: 'user alreay exists'})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Please enter a valid email'})
        }

        //checking password standard
        if(password.length<8){
            return res.json({success: false, message: 'Please enter a strong password'})
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})
    }catch(err){
        console.log(err);
        res.json({success: false,message: 'Error'})
    }
}

export {loginUser, registerUser}
