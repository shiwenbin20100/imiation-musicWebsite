import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import S from "./index.scss";
import Validator from "common/util/Validator";
import {pageChange} from "components/header/HeaderRedux.js"

import axios from "axios";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class Register extends Component{
    constructor(props){
        super(props);

        this.state={
            username: "",
            password: "",
            rePassword: "",
            nickName: "",
            isVerify: false,
            usernameMsg: "",
            passwordMsg: "",
            rePasswordMsg: "",
            nickNameMsg: "",
            step: "1"
        }
        this.validator = new Validator();
        this.validator.addRule("username",[
            {rule:"isEmpty",warnMsg:"用户名不能为空"},
            {rule:"minLength:4",warnMsg:"用户名最少需要4个字符"},
            {rule:"maxLength:12",warnMsg:"用户名最大不能超过12个字符"},
            {rule:"hasSpace",warnMsg:"用户名中不能有空格"}
        ]);
        this.validator.addRule("password",[
            {rule:"isEmpty",warnMsg:"密码不能为空"},
            {rule:"minLength:4",warnMsg:"密码最少需要4个字符"},
            {rule:"maxLength:12",warnMsg:"密码最大不能超过12个字符"},
            {rule:"hasSpace",warnMsg:"密码中不能有空格"}
        ]);
        this.validator.addRule("nickName",[
            {rule:"isEmpty",warnMsg:"昵称不能为空"},
            {rule:"minLength:1",warnMsg:"昵称最少需要1个字符"},
            {rule:"maxLength:12",warnMsg:"昵称最大不能超过12个字符"},
            {rule:"hasSpace",warnMsg:"昵称中不能有空格"}
        ]);


        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.rePasswordChange = this.rePasswordChange.bind(this);
        this.nickNameChange = this.nickNameChange.bind(this);

        this.fSubmit = this.fSubmit.bind(this);
        this.nSubmit = this.nSubmit.bind(this);

        this.handleMove = this.handleMove.bind(this);
    }
    userChange(ev){
        let warnMsg = this.validator.startValidate("username",ev.target.value);
        this.setState({
            username:ev.target.value,
            usernameMsg: warnMsg
        })
    }
    passwordChange(ev){
        let warnMsg = this.validator.startValidate("password",ev.target.value);
        this.setState({
            password:ev.target.value,
            passwordMsg: warnMsg
        })
    }
    rePasswordChange(ev){
        let {password} = this.state;
        let warnMsg = ev.target.value === password?null:"两次密码输入必须一致";
        this.setState({
            rePassword:ev.target.value,
            rePasswordMsg: warnMsg
        })
    }

    nickNameChange(ev){
        let warnMsg = this.validator.startValidate("nickName",ev.target.value);
        this.setState({
            nickName:ev.target.value,
            nickNameMsg: warnMsg
        })
    }

    fSubmit(){
        let {usernameMsg,isVerify,step} = this.state;
        if(!usernameMsg && isVerify){
            this.setState({
                step: "2"
            })
        }
    }

    nSubmit(){
        let {username,password,rePassword,nickName,passwordMsg,rePasswordMsg,nickNameMsg,step} = this.state;
        let {pageChange} = this.props;
        let _this = this;
        if(!passwordMsg && !rePasswordMsg && !nickNameMsg){
            axios({
                    url: "http://localhost:9000/api/user/register",
                    method: "post",
                    data: {
                        username: username,
                        password: password,
                        rePassword: rePassword,
                        nickname: nickName

                    },
                    headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
                    withCredentials: true
                }
                ).then(function (res) {
                    if(res.data.code === 0){
                        _this.setState({
                            step: "3"
                        },()=>{
                            setTimeout(()=>{
                                pageChange("/index")
                            } ,3000);
                        })
                    }
                })

        }
    }

    handleMove(ev){
        let slideBlock = this.refs.slideBlock;
        let completedBlock = this.refs.completedBlock;
        let slideBlockSuccess = this.refs.slideBlockSuccess;
        let prompt = this.refs.prompt;
        let promptSuccess = this.refs.promptSuccess;
        let slideCode = this.refs.slideCode;
        let target = ev.target;
        let disX = ev.pageX - target.offsetLeft;
        slideBlock.style.transition = "none";
        completedBlock.style.transition = "none";
        document.onmousemove = (event)=>{
            event.stopPropagation();
            event.preventDefault();
            let l = event.pageX - disX;
            l = l >= 0?(l<256?l:256):0;
            slideBlock.style.left = l + "px";
            completedBlock.style.width = l + "px";
            if(parseInt(slideBlock.style.left) >= 256){
                slideBlock.style.display = "none";
                slideBlockSuccess.style.display = "block";
                prompt.style.display = "none";
                promptSuccess.style.display = "block";
                document.onmousemove = null;
                target.onmouseup = null;
                this.setState({
                    isVerify:true
                })
            }
        }
        target.onmouseup = ()=>{
            if(parseInt(slideBlock.style.left) < 256){
                slideBlock.style.transition = "1s";
                completedBlock.style.transition = "1s";
                slideBlock.style.left = "0px";
                completedBlock.style.width = "0px";
            }
            document.onmousemove = null;
            target.onmouseup = null;
        }
    }

    render(){

        let {username,password,rePassword,nickName,usernameMsg,passwordMsg,rePasswordMsg,nickNameMsg,step} = this.state;
        let {userChange,passwordChange,rePasswordChange,nickNameChange,handleMove,fSubmit,nSubmit} = this;
        let {pageChange} = this.props;

        let usernameWarning = usernameMsg ===""?null:(<p className={S.userWarn}>{usernameMsg}</p>);
        let passwordWarning = passwordMsg ===""?null:(<p className={S.passWarn}>{passwordMsg}</p>);
        let rePasswordWarning = rePasswordMsg ===""?null:(<p className={S.rePassWarn}>{rePasswordMsg}</p>);
        let nickNameWarning = nickNameMsg ===""?null:(<p className={S.nickNameWarn}>{nickNameMsg}</p>);
        return (
            <div>
            <Header/>
            <div id={S.regWrap}>
                <h2>用户注册</h2>
                <div className={S.regStep}>
                    <ul>
                        <li className={step==="1"? S.active : ""}>设置用户名</li>
                        <li className={step==="2"? S.active : ""}>填写帐号信息</li>
                        <li className={step==="3"? S.active : ""}>注册完成</li>
                    </ul>
                </div>
                <div className={S.regBody}
                     style={{display:step==="1"?"normal":"none"}}
                >
                    <div className={S.username}>
                        <label htmlFor="username">用户名</label>
                        <input type="text" id="username" placeholder="请输入你的用户名" autoComplete="off"
                            value={username}
                            onChange={userChange}
                        />
                    </div>
                    <div className={S.verCode}>
                        <p>验证码</p>
                        <div className={S.slideCode}
                            ref="slideCode"
                        >
                            <span className={S.completedBlock}
                                  ref="completedBlock"
                            ></span>
                            <span className={S.slideBlock}
                                  onMouseDown={ev=>handleMove(ev)}
                                  ref="slideBlock"
                            > >> </span>
                            <span className={S.slideBlockSuccess}
                                ref="slideBlockSuccess"
                            ></span>
                            <p className={S.verNormal}
                                ref="prompt"
                            >请按住滑块，拖动到最右边</p>
                            <p  className={S.verSuccess}
                                ref="promptSuccess"
                            >验证通过</p>
                        </div>
                    </div>
                    <button
                        onClick={ev=>fSubmit()}
                    >下一步</button>
                    {usernameWarning}
                </div>
                <div className={S.regBody}
                     style={{display:step==="2"?"block":"none"}}>
                    <div className={S.password}>
                        <label htmlFor="password">设置密码</label>
                        <input type="text" id="password" placeholder="请输入登录密码"  autoComplete="off"
                            value={password}
                            onChange={passwordChange}
                        />
                    </div>
                    <div className={S.rePassword}>
                        <label htmlFor="rePassword">确认密码</label>
                        <input type="text" id="rePassword" placeholder="请重复输入登录密码"  autoComplete="off"
                            value={rePassword}
                            onChange={rePasswordChange}
                        />
                    </div>
                    <div className={S.nickName}>
                        <label htmlFor="nickName">昵称</label>
                        <input type="text" id="nickName" placeholder="1-12个字符"  autoComplete="off"
                            value={nickName}
                            onChange={nickNameChange}
                        />
                    </div>
                <button className={S.nextBtn}
                        onClick={ev=>nSubmit()}
                >下一步</button>
                {passwordWarning}
                {rePasswordWarning}
                {nickNameWarning}
                </div>
                <div className={S.regSuccess}
                     style={{display:step==="3"?"block":"none"}}>
                    <h3>成功注册账户，尽情享受音乐服务吧！</h3>
                    <p>5秒后，跳转至之前页面</p>
                    <button
                        onClick={ev=>pageChange("/index")}
                    >直接跳转</button>
                </div>
            </div>
            <Footer/>
            </div>
                );
    }
}

export default connect(
    state=>{
        return state;
    },
    dispatch=>bindActionCreators({pageChange},dispatch)
)(Register);