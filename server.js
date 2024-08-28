import express from 'express';
import { join, resolve } from 'path';
const __dirname = import.meta.dirname
const app = express();

app.use(express.static(join(__dirname,'dist')));

app.get('*', (req,res) =>{
    res.sendFile(resolve(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
})