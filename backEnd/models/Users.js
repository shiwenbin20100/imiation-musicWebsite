module.exports = function (sequelize, DataType) {
    var Users = sequelize.define("user",{
        username : {
            type: DataType.STRING
        },
        password : {
            type: DataType.STRING
        },
        nickname : {
            type: DataType.STRING
        }
    });
    return Users;
}
