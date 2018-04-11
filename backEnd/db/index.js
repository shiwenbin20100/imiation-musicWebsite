var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var db = new Sequelize("fake","root","shiwenbin20100", {
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases : {
        $ne: Op.ne,
        $not: Op.not
    },
    pool: {
        max: 10,
        min: 0,
        idle: 5000
    },
});
db.User = db.import("../models/Users");
db.Music = db.import("../models/Music");
db.Comment = db.import("../models/Comment");
module.exports = db;