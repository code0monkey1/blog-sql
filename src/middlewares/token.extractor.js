import config from "../utils/config.js";
import jwt from 'jsonwebtoken';
import { Session, User } from "../models/index.js";

const tokenExtractor =async(req,res,next)=>{

    try{
        const authorization = req.get('authorization');
        if(authorization && authorization.toLowerCase().startsWith('bearer ')){
            
            req.token = authorization.substring(7);
            
            // check token is found in sessions table
            const session = await Session.findOne({ include: { model: User, attributes: ['isDisabled'] }, where: { token: req.token } });

            if(!session){
                throw new Error('No User Sessions found. Login again!');
                // redirect to login page 
            }

            //check if the user  is disabled
            if(session.user.isDisabled){
                throw new Error('User is disabled, contact admin');
                // redirect to login page
            }
            
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