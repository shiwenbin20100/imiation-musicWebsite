import S from "./index.scss";

export default class Comment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {content,createdAt,downNum,nickname,upNum} = this.props.data;
        createdAt = createdAt.replace(/T/," ").substring(0,19);
        return (
            <div className={S.singlecontent}>
                <img src={require("common/img/body_comment_avatar.png")}/>
                <div className={S.contentdetail}>
                    <div className={S.userinfo}>
                        <p className={S.username}>{nickname}</p><time>{createdAt}</time><p className={S.bad}>弱({downNum})</p><p className={S.good}>赞({upNum})</p>
                    </div>
                    <div className={S.usercontent}>{content}</div>
                </div>
            </div>
        );
    }
}