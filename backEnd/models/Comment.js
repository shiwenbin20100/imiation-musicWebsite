module.exports = function (sequelize, DataType) {
    var Comment = sequelize.define("Comment",{
        userid : {
            type: DataType.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        },
        content : {
            type: DataType.STRING
        },
        upNum : {
            type: DataType.STRING,
            defaultValue: 0
        },
        downNum : {
            type: DataType.STRING,
            defaultValue: 0
        },
        nickname : {
            type: DataType.STRING,
            references: {
                model: "Users",
                key: "nickname"
            }
        }
    });
    return Comment;
}
