import express from 'express'
import colors from 'colors';
import dotenv from 'dotenv'
import { dbConnect } from './config/db.js';
import studentRoute from './routes/studentRoute.js'
import teacherRoute from './routes/teacherRoute.js';
import authRoute from './routes/authRoute.js';
import noticeRoute from './routes/noticeRoute.js';
import reportRoute from './routes/reportRoute.js'
import adminRoute from "./routes/adminRoute.js"
import forteacher from './routes/teacherRouteForTeacher.js'
import cors from 'cors'
import morgan from 'morgan';

//rest object
const app = express();

//database config
dbConnect()

//dotenv config()
dotenv.config()

// middleware 
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));


app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/student', studentRoute)
app.use('/api/v1/teacher', teacherRoute)
app.use('/api/v1/notice', noticeRoute)
app.use('/api/v1/report', reportRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/forTeachers', forteacher)


app.get("/",(req,res)=>{
    res.send("<h1>Welcome to MY-SCHOOL</h1>")
})





const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(colors.bgMagenta(`Server is running on http://localhost:${PORT}`));
});