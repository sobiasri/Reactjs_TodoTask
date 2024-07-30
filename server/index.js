import express from 'express'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
import cors from 'cors'

import taskrouter from './routes/task-router.js'

dotenv.config();

//express use all ref to app variable
const app = express();


mongoose
    .connect(
    `mongodb+srv://sobiasobia176:${process.env.MONGODB_PASSWORD}@tasks.1kkxkki.mongodb.net/todo?retryWrites=true&w=majority&appName=Tasks`
).then(()=>
    app.listen(8080,() => 
    console.log("Connected to DataBase and server is running")
    )
).catch( (e) => console.log(e) ); 

app.use(express.json());
app.use(cors());

//cors to allow client port
app.use(cors({
    origin:"http://localhost:3000",
    method:["GET","POST","PUT","PATCH","DELETE"]
  }))


  // Set middleware of CORS 
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });

// tasks router
app.use('/tasks', taskrouter);