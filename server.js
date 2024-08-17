import express from 'express';
import { conn } from './connection.js';
import cors from 'cors'
import latestRouter from './latestRoutes/dataRoute.js';
import route from './userRoutes/userRoutes.js';


// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

app.use(latestRouter)
app.use(route)

app.listen(8000,()=>{
  console.log(`server running @ http://localhost:8000`)
})