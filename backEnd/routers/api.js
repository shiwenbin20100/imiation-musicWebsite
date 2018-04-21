var express = require("express");
var router = express.Router();
var db  =require("../db/index");
var responseData;
var jwt = require("jsonwebtoken");

router.all('*', function(req, res, next) {
     res.header('Access-Control-Allow-Origin', 'http://localhost:8090');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     res.header('Access-Control-Allow-Credentials', 'true');
     next();
});
router.use(function (req,res,next) {
    responseData = {
        code:0,
        message: "",
        token: ""
    }
    next();
});
router.post("/user/test",(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    console.log(req.body)
    responseData.code = 1;
        responseData.message = "用户名不能为空";
    res.json(responseData)
})

router.post("/user/register",function (req, res, next) {
    for(let key in req.body){
        var arr =  JSON.parse(key);
        var username = arr.username;
        var password = arr.password;
        var repassword = arr.rePassword;
        var nickname = arr.nickname;
    }
    if(username == ""){
        responseData.code = 1;
        responseData.message = "用户名不能为空";
        res.json(responseData);
        return;
    }
    if(password == ""){
        responseData.code = 2;
        responseData.message = "密码不能为空";
        res.json(responseData);
        return;
    }
    if(password !== repassword){
        responseData.code = 3;
        responseData.message = "两次输入的密码必须一致";
        res.json(responseData);
        return;
    }
    if(nickname == ""){
        responseData.code = 4;
        responseData.message = "昵称不能为空";
        res.json(responseData);
        return;
    }


    db.User.findOne({
            where:{username:username}
    }).then(function (userInfo) {
        if(userInfo){
            responseData.code = 5;
            responseData.message = "用户名已经被注册了";
            res.json(responseData);
            return;
        }else {
            db.User.create({
                username:username,
                password:password,
                nickname:nickname
            }).then(function (newUserInfo) {
                responseData.message = "注册成功";
                res.json(responseData);
            })
        }
    })


});

router.post("/user/login",function (req, res, next) {

    for(let key in req.body){
        var username = JSON.parse(key).username;
        var password = JSON.parse(key).password;
    }

// console.log(username,password)

    if(username == "" || password == ""){
        responseData.code = 1;
        responseData.message = "用户名或密码不能为空";
        res.json(responseData);
        return
    }else {
        db.User.findOne({
            where: {
                username : username,
                password : password
            }
        }).then(function (userInfo) {
            if(!userInfo){
                responseData.code = 2;
                responseData.message = "用户名或密码错误";
                res.json(responseData);
                return;
            }else {
                var token = jwt.sign({
                    data:username,
                    exp:Math.floor(Date.now() / 1000) + (60 * 60 * 2)
                },"swb1995.com")
                responseData.message = "登录成功";
                responseData.userInfo = {
                    _id: userInfo.id,
                    username: userInfo.username,
                    nickname: userInfo.nickname
                }
                req.cookies.set("userInfo",JSON.stringify({
                    _id: userInfo.id,
                    username: userInfo.username,
                    nickname: userInfo.nickname,
                    token: token
                }),{httpOnly:false});
                res.json(responseData);
                return;
            }
        })
    }
})

router.get("/user/logout",function (req, res) {
    req.cookies.set("userInfo",null);
    responseData.code = "0";
    res.json(responseData);
})
module.exports = router;