const express = require('express');
const router = express.Router();
const cors = require('cors');
const {getHistory,test, registerUser,loginUser,getProfile, accountUser,getBalance,addHistory} = require('../controllers/authController')

router.use(
    cors({
        credentials:true,
        origin: ['http://172.20.10.2:5173'],
    })
)

router.get('/',test);

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/profile',getProfile);

router.get('/accountUser',accountUser);

router.get('/getBalance',getBalance)

router.get('/getHistory',getHistory)

router.post('/addHistory',addHistory)

module.exports = router