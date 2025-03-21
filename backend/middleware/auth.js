import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {

    //take token from header
    const {token} = req.headers;

    //response when token not available
    if(!token){
        return res.json({success: false, message: 'Not Authorized Login Again'})
    }

    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    }catch(err){
        console.log(err);
        res.json({success: false, message: 'Error'})
    }
}

export default authMiddleware