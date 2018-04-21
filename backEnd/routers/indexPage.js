const express = require("express");
const router = express.Router();
const db  =require("../db/index");
const authMiddleware = require("../middleware/authMiddleware");
let responseData;

let date = new Date();
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
        count: 0,
        data:[],
        message: ""
    }
    next();
});

router.get("/song",function (req, res, next) {

    var page =  Number(req.query.page || 1);
    var limit = 10;

    db.Comment.count().then(function (count) {

        pages = Math.ceil(count/limit);
        page = Math.min(page,pages);
        page = Math.max(page,1);
        var skip = (page - 1)* limit;
        db.Comment.findAndCountAll({
        where: "",
        limit: limit,
        offset: skip,
        order:[["id","DESC"]]
    }).then(function (comments) {
        responseData.code = 0;
        responseData.count = comments.count;
        responseData.data = comments.rows;
        res.json(responseData)
    })
    })

});

router.post("/song",authMiddleware,function (req, res, next) {
    console.log(req.loginUser)
    for(let key in req.body){
        var arr =  JSON.parse(key);
        var id = arr.id;
        var userid = arr.userid;
        var nickname = arr.nickname;
        var content = arr.content;
    }
    if(content == ""){
        responseData.code = 1;
        responseData.message = "内容不能为空";
        res.json(responseData)
    }
    if(req.loginUser === nickname){
        db.Comment.create({
            userid: userid,
            nickname: nickname,
            content: content,
            upNum: 0,
            downNum: 0
        }).then(function (rs) {
            responseData.code = 1;
            responseData.message = "发表成功";
            res.json(responseData);
        })
    }

});

router.get("/song/good",function (req, res, next) {

    var page =  Number(req.query.page || 1);
    var limit = 10;

    db.Comment.count().then(function (count) {

        pages = Math.ceil(count/limit);
        page = Math.min(page,pages);
        page = Math.max(page,1);
        var skip = (page - 1)* limit;
        db.Comment.findAndCountAll({
        where: "",
        limit: limit,
        offset: skip,
        order:[["id","DESC"]]
    }).then(function (comments) {
        responseData.code = 0;
        responseData.count = comments.count;
        responseData.data = comments.rows;
        res.json(responseData)
    })
    })

});
module.exports = router;