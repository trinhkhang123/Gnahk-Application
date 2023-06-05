const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const {mongoose} = require('mongoose');
const app = express();
const {hashPassword} = require('./helpers/auth')
const cookieParser = require('cookie-parser')

app.use(express.json())

//console.log(hashPassword('343'));
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('database not connected',err))

app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


const port = 8000;  

app.use('/',require('./routes/authRoutes'))

app.listen(port,() => console.log(`Server is running on port ${port}`))