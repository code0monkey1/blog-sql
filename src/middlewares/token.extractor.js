import config from "../utils/config.js";
import jwt from 'jsonwebtoken';
const tokenExtractor =(req,res,next)=>{

    try{
        const authorization = req.get('authorization');
        if(authorization && authorization.toLowerCase().startsWith('bearer ')){
            req.token = authorization.substring(7);
            console.log("🚀 ~ tokenExtractor ~  req.token:",  req.token)
            
            try{
                //decode the token
                const decodedToken = jwt.verify(req.token,config.JWT_SECRET);
    
                req.decodedToken = decodedToken;

                console.log("🚀 ~ tokenExtractor ~ req.decodedToken:", req.decodedToken)

            }catch(err){
                throw new Error('Could not decode token');
            }

        }else{
            throw new Error('No token provided');
        }
        next();

    }catch(e){
        next(e);
    }

}

export default tokenExtractor;