import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "./HeaderRedux";
import axios from "axios";
import S from "./index.scss";
const Fragment = React.Fragment;

class Header extends Component{
    constructor(props){
        super(props);
        this.loginOut = this.loginOut.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.nickname !== nextProps.nickname){
            return true;
        }
        return false;
    }
    loginOut(){
        axios({
                    url: "http://localhost:9000/api/user/logout",
                    method: "get",
                    headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
                    withCredentials: true
                }
                ).then(function (res) {
                    if(res.data.code === "0"){
                        window.location.reload();
                    }
                })
    }

    render(){
        let {pageChange,pathname,nickname} = this.props;
        let {loginOut} = this;
        nickname = nickname === ""?null:nickname.replace(/"/g,"");

        let loginStatus = nickname?(
            <li className={S.loginInfo}><p
                onClick={ev=>loginOut()}
            >登出</p>{nickname}  </li>
        ):(
            <div>
                   <li className={S.register}>
                        <a href="javascript:;"
                            onClick={ev=>pageChange("/register")}
                        >免费注册</a>
                    </li>
                    <li className={S.login}>
                        <a href="javascript:;"
                        onClick={ev=>pageChange("/login")}
                        >立即登录</a>
                        <a href="javascript:;"><span></span></a>
                        <a href="javascript:;"><span></span></a>
                    </li>
            </div>
        );
        return (
            <div id={S.header}>
                <ul className={S.wrap}>
                    <li className={S.logo}><img src={require("common/img/logo.png")}/></li>
                    <li className={S.info}>
                        <a href="javascript:;"
                           className={pathname==="/index"?S.active:""}
                           onClick={ev=>pageChange("/index")}
                        >发现音乐</a>
                        <a href="javascript:;"
                           className={pathname==="/mymusic"?S.active:""}
                           onClick={ev=>{
                               pageChange("/index");
                               alert("这页没做")
                           }}
                        >我的音乐</a>
                    </li>
                    <li className={S.select}>
                        <a href="javascript:;">歌单</a>
                        <a href="javascript:;">电台</a>
                        <a href="javascript:;">音乐人</a>
                        <a href="javascript:;">客户端</a>
                    </li>
                    <li className={S.search}>
                        <img src={require("common/img/header_icon_search.png")}></img>
                            <input type="text" placeholder="音乐搜索，找人..."/>
                    </li>
                    {loginStatus}

                </ul>
            </div>
        );
    }
}

export default connect(
    state=>{
        let {router:{location},Index:{cookies}} = state;
        return {pathname:location.pathname,nickname:cookies.nickName}
    },
    dispatch => bindActionCreators({...actions},dispatch)
)(Header);