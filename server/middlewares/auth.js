import jwt from 'jsonwebtoken'
import { jwtSecret } from '../server.js';

function authenticateJWTUser(req,res,next){
    const authHeader = req.headers.authorization 
    if(authHeader){
        const token = authHeader.split(' ')[1]
        req.token = token ;
        jwt.verify(token , jwtSecret , (err, user)=>{
            if(err){
                return res.status(403).json({message: 'Unauthorized'})
            }
            req.user = user
            return next() ;
        })
    }
    else {
        return res.json({message: 'Unauthorized'})
    }
}
export {authenticateJWTUser} 