var express = require("express");
var router = express.Router();
var db  =require("../db/index");
var responseData;
var Sequelize = require("sequelize");

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
        data: []
    }
    next();
});

router.get("/song",function (req, res, next) {

    db.Music.findAll({
        attributes: ["id","singer","musicName","album"]
    }).then(function (data) {
        data.map((dt)=>{
            responseData.data.push(dt.dataValues)
        })
        responseData.code = 0;
        res.json(responseData);
    })
});

router.get("/singleSong",function (req, res, next) {
    if(req.query.id == 0){
        db.Music.findAll({
        limit: 1
    }).then(function (music) {
        responseData.code = 0;
        responseData.data = music[0];
        res.json(responseData);
    })
    }else {
        db.Music.findById(req.query.id).then(function (music) {
        responseData.code = 0;
        responseData.data = music;
        res.json(responseData);
    })
    }


});


module.exports = router;
