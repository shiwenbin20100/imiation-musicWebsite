import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import MayLikeCard from "./MayLikeCard";
import Comment from "./Comment";
import MusicTitle from "./MusicTitle";
import People from "./People";

import {peopleData,mayLikeData,selectedComment} from "./fakeData";
import *  as actions from "./IndexRedux";
import {pageChange} from "components/header/HeaderRedux";

import S from "./index.scss";
import axios from "axios"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";



class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShrink: false,
            textareaVal: "",
            commentData: null
        }
    this.toggleShrink = this.toggleShrink.bind(this);
    this.textareaInput = this.textareaInput.bind(this);
    this.getComment = this.getComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.startPlay = this.startPlay.bind(this);
    }


    componentDidMount(){
        if(/userInfo/.test(document.cookie)){
            let cookieArr = document.cookie.match(/userInfo={(.+)}/)[1];
            let userID = cookieArr.match(/(?:("_id":))(\d+)/)[2];
            let username = cookieArr.match(/(?:("username":))(.+),+|$/)[2];
            let nickname = cookieArr.match(/(?:("nickname":))(.+),*/)[2];
            this.props.getCookie(userID,username,nickname);
        }
        this.getComment(1);

    }

    getComment(page){
        axios({
            url: `http://localhost:9000/comment/song?id=888&page=${page}`,
            method: "get",
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 withCredentials: true
             }).then((res)=>{
            this.setState({
                commentData:res.data
            })
        })
    }

    toggleShrink(){
        let {isShrink} = this.state;
        this.setState({
            isShrink: !isShrink
        })
    }

    submitComment(){
        let {textareaVal} = this.state;
        let {nickname,id} = this.props;
        nickname = nickname === ""?null:nickname.replace(/"/g,"");
        textareaVal = textareaVal.replace(/\s/g,"");
        if(!!textareaVal || !!textareaVal.replace(/\s/g,"")){
            axios({
            url: `http://localhost:9000/comment/song`,
            method: "post",
            data: {
                id: id,
                userid: id,
                nickname: nickname,
                content: textareaVal
            },
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 withCredentials: true
             }).then((res)=>{
                this.setState({
                    textareaVal: ""
                },()=>{
                    alert("发表成功");
                    this.getComment(1);
                });
        })
        }else {
            alert("内容不能为空");
        }


    }

    textareaInput(ev){
        let {textareaVal} = this.state;
        if(textareaVal.length >= 300) return;

        this.setState({
            textareaVal: ev.target.value
        })
    }

    startPlay(){
        this.props.pageChange("/play");
        let {getSong} = this.props;
        getSong(1);
    }
    render(){
        let {toggleShrink,textareaInput,submitComment,startPlay} = this;
        let {isShrink,textareaVal,commentData} = this.state;
        let {pageChange,nickname} = this.props;

        nickname = nickname === ""?null:nickname;
        let isComment = nickname?(
            <div className={S.sendCommentWrap}>
                                <h3>我来说两句</h3>
                                <div className={S.sendComment}>
                                    <div className={S.commentFrame}>
                                        <img src={require("common/img/body_comment_avatar.png")}/>
                                        <textarea
                                            value={textareaVal}
                                            onChange={textareaInput}
                                        ></textarea>
                                    </div>
                                    <div className={S.subFrame}>
                                        <p>{textareaVal.length}/300</p>
                                        <button
                                            onClick={ev=>submitComment()}
                                        >发表评论</button>
                                    </div>
                                </div>
                            </div>
        ):(
            <div className={S.saysth}>
                                <h3>我来说两句</h3>
                                <div className={S.loginwrap}>
                                    <p>您需要登录后才可以留言，新用户<a href="javascript:;"
                                    onClick={ev=>pageChange("/register")}
                                    >注册帐号</a> </p>
                                    <div className={S.loginbtn}>
                                        <img src={require("common/img/body_login_xiami.png")}
                                        onClick={ev=>pageChange("/login")}
                                        />
                                        <img src={require("common/img/body_login_weibo.png")}/>
                                        <img src={require("common/img/body_login_qq.png")}/>
                                    </div>
                                </div>
                            </div>
        );

        //假数据
        let fakePeoples = peopleData.map((data,i)=>{
            return (<People
                {...{
                    key:i,
                    img:data.img,
                    name:data.name
                }}
            />)
        });
        let fakeMayLikePeoples = mayLikeData.map((data,i)=>{
            return (<MayLikeCard
                {...{
                    key:i,
                    img:data.img,
                    name:data.name,
                    author:data.author
                }}
            />)
        });
        let fakeSelectedComment = selectedComment.map((data,i)=>{
            return <Comment
                    key={i}
                    {...{
                       data
                    }}
                />
        })

        let comment;
        if(commentData){
            comment = commentData.data.map((data,i)=>{
                if(data){
                    return <Comment
                    key={i}
                    {...{
                       data
                    }}
                />
                }else return null;
            })
        }
        let count = commentData?commentData.count:0;

        return (
            <div>
                <div className={S.warning}>仿</div>
                <Header/>
                <div className={S.bg}>
                    <MusicTitle/>
                    <div className={S.wrap}>
                        <nav className={S.navbar}>
                            <a href="javascript:;">主页</a>
                            <a href="javascript:;">档案</a>
                            <a href="javascript:;">Demo</a>
                            <a href="javascript:;" className={S.active}>专辑</a>
                            <a href="javascript:;">热门歌曲</a>
                            <a href="javascript:;">超清MV</a>
                            <a href="javascript:;">粉丝</a>
                        </nav>
                        <div className={S.bodywrap}>
                        <div className={S.body}>
                        <div className={S.bodyleft}>
                            <div className={S.btng}>
                                <div className={S.play}>
                                    <a href="javascript:;"
                                        onClick={ev=>startPlay()}
                                    > 立即播放</a>
                                </div>
                                <ul>
                                    <li className={S.collection}>
                                        <a href="javascript:;"> <span></span><p>收藏到音乐库</p></a>

                                    </li>
                                    <li className={S.share}>
                                        <a href="javascript:;"><span></span><p>分享<em>(188684)</em></p></a>

                                    </li>
                                    <li className={S.addtolist}>
                                        <a href="javascript:;"><span></span><p>添加到歌单</p></a>

                                    </li>

                                </ul>
                            </div>
                            <div className={S.detail}>
                                <div className={S.detailimg}>
                                    <img src={require("common/img/body_photo.jpg")}/>
                                </div>
                                <div className={S.detailinfo}>
                                    <ul>
                                        <li><p>所属专辑：</p><a href="javascript:;">完美世界</a></li>
                                        <li><p>演唱者：</p><a href="javascript:;">金玟岐<em></em></a></li>
                                        <li><p>作词：</p>金玟岐</li>
                                        <li><p>作曲：</p>金玟岐</li>
                                        <li><p>编曲：</p>
薛琳可</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={S.lyric}
                                style={{height:!isShrink?"506px":"256px"}}
                            >
                                <div className={S.shareto}>
                                    <div className={S.shareframe}>
                                        <span>分享到:</span>
                                        <ul>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                        </ul>

                                    </div>
                                </div>
                                <div className={S.songlyric}>
                                    <h4><a href="javascript:;">《《岁月神偷》》歌词</a> </h4>
                                    <div className={S.toggle}
                                        onClick={ev=>toggleShrink()}
                                    >收缩</div>
                                    <div className={S.mainlyric}>
                                        能够握紧的就别放了<br/>
                                        能够拥抱的就别拉扯<br/>
                                        时间着急的冲刷着<br/>
                                        剩下了什么<br/>
                                        <br/>
                                        原谅走过的那些曲折<br/>
                                        原来留下的都是真的<br/>
                                        纵然似梦啊 半醒着<br/>
                                        笑着哭着都快活 谁让<br/>
                                        <br/>
                                        时间是让人猝不及防的东西<br/>
                                        晴时有风阴有时雨<br/>
                                        争不过朝夕又念着往昔<br/>
                                        偷走了青丝却留住一个你<br/>
                                        <br/>
                                        岁月是一场有去无回的旅行<br/>
                                        好的坏的都是风景<br/>
                                        别怪我贪心只是不愿醒<br/>
                                        因为你只为你愿和我一起<br/>
                                        看云淡风轻<br/>
                                    </div>
                                    <div className={S.songedit}>
                                        文本歌词最后由 哈哈哈哈哈哈哈哈哈哈哈皮 编辑于2015-12-23 13:02
                                        <br/>
LRC歌词最后由 歌词 编辑于2016-11-16 13:34
                                    </div>
                                </div>
                            </div>
                            <div className={S.maylike}>
                                <h3>你可能会喜欢的歌单</h3>
                                <div className={S.likewrap}>
                                    <ul>
                                        {fakeMayLikePeoples}
                                    </ul>
                                </div>
                            </div>
                            {isComment}
                            <div className={S.selectedcommentwrap}>
                                <h3>热门评论</h3>
                                <div className={S.selectedcomment}>
                                    {fakeSelectedComment}
                                </div>
                            </div>
                            <p className={S.commentnum}>{count}条简评</p>
                            <div className={S.comment}>
                                {comment}
                            </div>
                        </div>
                        <div className={S.bodyright}>
                            <div className={S.count}>
                                <ul>
                                <li><p>1241255</p>
                                    试听</li>
                                <li><p>125124</p>
                                    分享</li>
                                <li><p>11124</p>
                                    评论</li>
                            </ul>
                            </div>
                            <div className={S.phonescan}>
                                <h3>使用手机扫码收听单曲</h3>
                                <div>
                                    <img src={require("common/img/body_right_phonescan.png")}/>
                                    <ol>
                                        <li>1.打开音乐APP</li>
                                        <li>2.点击更多</li>
                                        <li>3.点击 扫一扫</li>
                                        <li>4.扫描二维码</li>
                                    </ol>
                                </div>
                            </div>
                            <div className={S.peopleinstore}>
                                <h3>收藏岁月神偷的人们</h3>
                                    <div>
                                    <ul>
                                        {fakePeoples}
                                    </ul>
                                    </div>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default connect(
    state=>{
        let {Index:{cookies}} = state;
        return {nickname:cookies.nickName,id:cookies._id};
    },
    dispatch=>bindActionCreators({...actions,pageChange},dispatch)
)(Index);