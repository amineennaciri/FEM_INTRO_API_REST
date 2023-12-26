import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import {createNewUser, signin} from './handlers/user';
const app = express();
/* const customLogger = (message) => (req,res,next) => {
    console.log(`Hello from ${message}`);
    next();
} */
app.use(cors());
// dev formatting gives you what you need as a developper in your login, morgan does console.log some information to you about your response.
app.use(morgan('dev'));
// allows a client to send us json data
app.use(express.json());
// url encoded allows a client to add things like a query strings or parameters and decodes and encodes that properly. whereas if you don't do that it will just treat it like a string.
app.use(express.urlencoded({extended: true}));
/* app.use(customLogger('customer logger')); */

/* app.use((req,res,next)=>{
    req.shhhh_secret = 'doggy';
    //next();
    res.status(401).send('nope');
}) */
app.get('/', (req,res) => {
    console.log('hello from express');
    res.status(200).json({message:'hello'});
});
// no one can access this route unless they are authorized
app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);
export default app;