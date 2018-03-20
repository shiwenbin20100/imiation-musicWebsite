import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import S from "./index.scss";
import Validator from "common/util/Validator";
import {pageChange} from "components/header/HeaderRedux.js";

import axios from "axios";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            usernameMsg: "",
            passwordMsg: ""
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
        this.handleLogin = this.handleLogin.bind(this);
        this.userInput = this.userInput.bind(this);
        this.passInput = this.passInput.bind(this);
    }

    userInput(ev){
        let warnMsg = this.validator.startValidate("username",ev.target.value);
        this.setState({
            username:ev.target.value,
            usernameMsg: warnMsg
        })
    }
    passInput(ev){
        let warnMsg = this.validator.startValidate("password",ev.target.value);
        this.setState({
            password:ev.target.value,
            passwordMsg: warnMsg
        })
    }


    handleLogin(){
        let {username,password,usernameMsg,passwordMsg} = this.state;
        let {pageChange} = this.props;
        if(!usernameMsg && !passwordMsg){
            axios({
                    url: "http://localhost:9000/api/user/login",
                    method: "post",
                    data: {
                        username: username,
                        password: password
                    },
                    headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
                    withCredentials: true
                }

                ).then(function (res) {
                    if(res.data.code === 0){
                        pageChange("/index");
                    }else {
                        alert(res.data.message);
                    //     this.setState({
                    //     passwordMsg: res.data.message
                    // })
                    }
                })
        }

    }

    render(){

        let {username,password,usernameMsg,passwordMsg} = this.state;
        let {pageChange} = this.props;
        let {handleLogin,userInput,passInput} = this;

        let errMsg = usernameMsg?(<div className={S.errMsg}>{usernameMsg}</div>):null || passwordMsg?(<div className={S.errMsg}>{passwordMsg}</div>):null  || null;

        return (
            <div>
            <Header/>
            <div className={S.loginWrap}>
                <h3>帐号密码登录</h3>
                {errMsg}
                <div className={S.inputWrap}>
                    <input type="text" placeholder="请输入帐号" className={S.inpUsername}
                    value={username}
                    onChange={userInput}
                    />
                    <input type="text" placeholder="请输入密码" className={S.inpPassword}
                    value={password}
                    onChange={passInput}
                    />
                    <button className={S.loginBtn}
                        onClick={ev=>handleLogin()}
                    >登 录</button>
                    <p
                        className={S.reg}
                        onClick={ev=>pageChange("/register")}
                    >新用户注册</p>
                    <p
                        className={S.forgetPass}
                    >忘记密码?</p>
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
)(Login);