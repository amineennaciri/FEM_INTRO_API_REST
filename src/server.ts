import express from 'express';
const app = express();
app.get('/', (req,res) => {
    console.log('hello from express');
    res.status(200).json({message:'hello'});
});

export default app;