import {push} from "react-router-redux";

export const pageChange = (url) => (dispatch,getState)=>{
    dispatch(push(url))
}