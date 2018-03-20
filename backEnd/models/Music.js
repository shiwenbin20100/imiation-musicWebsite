module.exports = function (sequelize, DataType) {
    var Musics = sequelize.define("music",{
        singer : {
            type: DataType.STRING
        },
        musicName : {
            type: DataType.STRING
        },
        lyric : {
            type: DataType.STRING
        },
        album : {
            type: DataType.STRING
        },
        img : {
            type: DataType.STRING
        },
        audio : {
            type: DataType.STRING
        }
    });
    return Musics;
}
