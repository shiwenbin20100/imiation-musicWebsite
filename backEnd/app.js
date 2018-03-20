const express = require("express");
const swig = require("swig");
const app  =express();
const sqldb = require("./db");
const bodyParser = require("body-parser");
const cookieParser = require("cookies");
const db  =require("./db/index");
const path  = require("path");
const port = 9000;
//静态文件托管  当用户访问public目录，直接返回后面显示的目录
app.use("/public",express.static(__dirname + "/public"));

// sync用于同步模型到数据库
// db.sync({force:false}).then(function () {
//     console.log("succedd");
//
// }).catch(function (err) {
//     console.error(err);
// });

//告诉路由在哪里找模版文件
app.engine("html",swig.renderFile);//1：模版文件后缀；2：解析的方法
app.set("views","./views");//1：模版文件存放目录（必须是views)；2：目录
app.set("view engine","html");//1：必须是；2：与engine中的1必须相同；
swig.setDefaults({cache:false});//不进行缓存，适用于线下开发用

//通过此项配置后在req对象下会存在一个body属性,内为post传来的属性
app.use(bodyParser.urlencoded({extended:true}));

//cookie相关必须放在路由前面
app.use(function (req, res, next) {
    req.cookies = new cookieParser(req,res);
    req.userInfo = {};
    if(req.cookies.get("userInfo")){
        try{
            req.userInfo = JSON.parse(req.cookies.get("userInfo"));

            db.User.findOne({
            where: {
                id : req.userInfo._id
            }}).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            });
        }
        catch (err){
                next();
            }
    }
    else{
        next();
    }

});

//根据不同功能划分模块
app.use("/play",require("./routers/play"));//play模块
app.use("/api",require("./routers/api"));//评论模块
app.use("/comment",require("./routers/indexPage"));//登陆注册模块
app.use("/",require("./routers/main"));//前台模块
app.get("/",function (req, res, next) {

    res.render("index");
});
app.get("/*",function (req, res, next) {

    res.render("index");
});



app.listen(port,(error)=>{
    if(!error){
        console.log("hello")
    }
});


