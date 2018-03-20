var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var db = new Sequelize("fake","fake","shiwenbin20100", {
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases : {
        $ne: Op.ne,
        $not: Op.not
    },
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    },
});
db.User = db.import("../models/Users");
db.Music = db.import("../models/Music");
db.Comment = db.import("../models/Comment");
module.exports = db;