import axios from "axios";
let initState = {
    cookies: {
        _id: "",
        username: "",
        nickName: ""
    },
    songData: []
}

const GET_COOKIE = 'index-page/Index/GET_COOKIE';
const GET_SONG = 'index-page/Index/GET_SONG';

export const getCookie = (userID,username,nickName) =>(dispatch,getState)=>{
    dispatch({
        type: GET_COOKIE,
        userID,
        username,
        nickName
    })
}
export const getSong = () =>(dispatch,getState)=>{
    axios({
            url: `http://localhost:9000/play/song`,
            method: "get",
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 withCredentials: true
             }).then((res)=>{
                    if(res.data.code === 0){
                        dispatch({
                        type: GET_SONG,
                        sData:res.data.data
                    })
                    }
        })

}


export default function Index(state = initState, action) {
    let {type,userID,username,nickName,sData} = action;
    let {songData} = state;
    switch (type){
        case GET_COOKIE:
            return {...state,cookies:{
                _id: userID,
                username:username,
                nickName:nickName
            }}
            break;
        case GET_SONG:
            songData.push(sData);
            return {...state,songData};
            break;
        default:
            return state;
    }
}