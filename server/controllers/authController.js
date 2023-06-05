const { hashPassword, comparePassword } = require('../helpers/auth');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const test = (req, res) => {
    res.json('test is working');
}

const registerUser = async (req,res) => {
    try {
        const {name, userName,password} = req.body;
        if (!name) {
            return res.json({
                error : 'name is required'
            })
        }

      //  console.log(1);

        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        }       // console.log(2);


        const exist = await User.findOne({userName})

        if(exist) {
            return res.json({
                error: 'userName is taken already'
            })
        } 
     //   console.log(3);

        if(!userName || userName.length < 6) {
            return res.json({
                error: 'userName is required and should be at least 6 characters long'
            })
        }
        //console.log(4);
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            userName,
            password:hashedPassword
        })


        return res.json(user);
    } catch (error) {
        return res.json(error);
    }
}

const loginUser = async (req,res) => {
    try{
        const {userName,password} = req.body;
       // console.log(password);
        const user = await User.findOne({userName})
        //console.log(user);
        if(!user) {
            return res.json({
                error:'No user found'
            })
        }
        
        const check =await comparePassword(password,user.password) ;
        //console.log(check)
    if(check) {
        token = jwt.sign({userName:user.userName,id:user._id,name :user.name},process.env.JWT_SECRET,{},(err, token) => {
            if (err) throw err;
            return res.json({
                status : "ok",
                data : token
            })
        }
        )
    }
    if(!check) {
        return res.json({  
            error: 'Password wrong'
        })
    }
    }

    catch(error) {
        console.log(error);
    }
}

const getProfile = (req,res) => {
    const token = req.query.key1;
    
    try {
        const user= jwt.verify(token,process.env.JWT_SECRET,{});
        return res.json(user);
    } catch (error) {
        
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
};