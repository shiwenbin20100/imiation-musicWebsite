import axios from "axios";
let initState = {
    nowSong: {
        songUrl: "shanqiu.mp3",
        isPlay: true,
        lyric: "",
        id: "",
        img: "shanqiu.jpg",
        musicName: "",
        singer: ""
    }
}

const GET_SPEC_SONG = 'play_page/Index/GET_SPEC_SONG';
const CHANGE_STATUS = 'play_page/Index/CHANGE_STATUS';

export const getSpecSong = (songID) =>(dispatch,getState) =>{
    axios({
            url: `http://localhost:9000/play/singleSong?id=${songID}`,
            method: "get",
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 withCredentials: true
             }).then((res)=>{
                    if(res.data.code === 0){
                        dispatch({
                            type:GET_SPEC_SONG,
                            id: res.data.data.id,
                            songUrl: res.data.data.audio,
                            lyric: res.data.data.lyric,
                            img: res.data.data.img,
                            musicName: res.data.data.musicName,
                            singer: res.data.data.singer
                        })
                    }
            })
}

//改变footer的播放状态
export const changeStatus = () =>(dispatch,getState) =>{

    let {Play:{nowSong}} = getState();
    dispatch({
        type:CHANGE_STATUS,
        isPlay:!nowSong.isPlay
    })
}


export default function Play(state=initState,action) {
    let {type,isPlay,songUrl,lyric,id,img,musicName,singer} = action;
    let {nowSong} = state;
    switch (type){
        case GET_SPEC_SONG:
            return {...state,nowSong:{
                ...nowSong,
                songUrl,
                lyric,
                id,
                img,
                musicName,
                singer,
                isPlay:true
            }};
            break;
        case CHANGE_STATUS:
            return {...state,nowSong:{
                ...nowSong,
                isPlay:isPlay
            }};
            break;

        default:
            return state;
    }
}