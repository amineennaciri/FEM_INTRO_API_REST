import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
        process.env.JWT_SECRET
    )
    return token;
}
// bearer it's a generic way of describing someone having the ability to send up a token. and that token can be of any type of token. It could be a json web token, it could be an API key, an access token. But bearer just describes this person sent in a token.
export const protect =(req,res, next) => {
    const bearer = req.headers.authorization;
    
    if(!bearer){
        res.status(401).json({message: 'not authorized'});
        return;
    }
    const [, token] = bearer.split(' '); //"bearer token"
    if(!token){
        res.status(401).json({message: 'not valid token'});
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: 'not valid token'});
        return;
    }
}