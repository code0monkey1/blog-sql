import config from "../utils/config.js";
import jwt from 'jsonwebtoken';
import {User, Session} from "../models/index.js";
import { v4 as uuidv4 } from 'uuid';

const login=async(req,res,next)=>{

    try{
            // verify that the user exists in the database by ensuring that the right username and password are available
            const user = await User.findOne({ where: { username: req.body.username } });

            const isCorrectPassword = req.body.password=='secret';
            
            if (!(user && isCorrectPassword)) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            
            const tokenInfo = {
                id: user.id,
                username: user.username
            };

            // do not let disabled users login
            if (user.isDisabled) {
                return res.status(401).json({ message: 'User is disabled, contact admin' });
            }

            // generate a JWT token
            const token = jwt.sign(tokenInfo, config.JWT_SECRET);

            // save the token to the database
            await Session.create({ userId: user.id, token });

            res.json({ username:user.username,name:user.name, token });

    }catch(e){
        next(e);
    }

}

const logout=async(req,res,next)=>{
    try{
        console.log("🚀 ~ logout ~ req.decodedToken:", req.decodedToken)
        await Session.destroy({ where: { userId: req.decodedToken.id} });
        res.status(204).end();
    }catch(e){
        next(e);
    }
}

export default{
    login,
    logout
}