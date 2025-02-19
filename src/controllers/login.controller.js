import config from "../utils/config.js";
import jwt from 'jsonwebtoken';
import {User} from "../models/index.js";

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
                username: user.username,
            };

            // generate a JWT token
            const token = jwt.sign(tokenInfo, config.JWT_SECRET);

            res.json({ username:user.username,name:user.name, token });

    }catch(e){
        next(e);
    }
   

}


export default{
    login,
}