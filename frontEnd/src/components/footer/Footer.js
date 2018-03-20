import S from "./index.scss";

export default class Footer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id={S.footer}>
                <div className={S.wrap}>
                    <div className={S.top}>
                        <ul>
                            <li>关于</li>
                            <li><a href="javascript">关于我们</a></li>
                            <li><a href="javascript">招聘</a></li>
                            <li><a href="javascript">独立音乐人合作</a></li>
                            <li><a href="javascript">联系我们</a></li>
                            <li><a href="javascript">友情链接</a></li>
                        </ul>
                        <ul>
                            <li>特色服务</li>
                            <li><a href="javascript">关于我们</a></li>
                            <li><a href="javascript">招聘</a></li>
                            <li><a href="javascript">音乐专题</a></li>
                        </ul>
                        <ul>
                            <li>客户端</li>
                            <li><a href="javascript">for iPhone</a></li>
                            <li><a href="javascript">for Android</a></li>
                            <li><a href="javascript">for Windows</a></li>
                            <li><a href="javascript">for Mac</a></li>
                            <li><a href="javascript">for iPad</a></li>
                        </ul>
                        <ul>
                            <li>更多</li>
                            <li><a href="javascript">分类找歌</a></li>
                            <li><a href="javascript">帮助中心</a></li>
                            <li><a href="javascript">添加更多</a></li>
                            <li><a href="javascript">音频上传</a></li>
                            <li><a href="javascript">添加歌词</a></li>
                        </ul>
                    </div>
                    <div className={S.middle}>
                        <ul>
                            <li><a href="javascript:;">阿里巴巴集团</a></li>
                            <li><a href="javascript:;">阿里巴巴国际站</a></li>
                            <li><a href="javascript:;">阿里巴巴中国站</a></li>
                            <li><a href="javascript:;">全球速卖通</a></li>
                            <li><a href="javascript:;">淘宝网</a></li>
                            <li><a href="javascript:;">天猫</a></li>
                            <li><a href="javascript:;">聚划算</a></li>
                            <li><a href="javascript:;">一淘</a></li>
                            <li><a href="javascript:;">阿里妈妈</a></li>
                            <li><a href="javascript:;">飞猪</a></li>
                            <li><a href="javascript:;">阿里云计算</a></li>
                            <li><a href="javascript:;">YunOS</a></li>
                            <li><a href="javascript:;">阿里通信</a></li>
                            <li><a href="javascript:;">来往</a></li>
                            <li><a href="javascript:;">支付宝</a></li>
                            <li><a href="javascript:;">万网</a></li>
                            <li><a href="javascript:;">高德</a></li>
                            <li><a href="javascript:;">优视</a></li>
                            <li><a href="javascript:;">友盟</a></li>
                            <li><a href="javascript:;">酷盘</a></li>
                            <li><a href="javascript:;">虾米</a></li>
                            <li><a href="javascript:;">阿里星球</a></li>
                            <li><a href="javascript:;">钉钉</a></li>
                            <li><a href="javascript:;">阿里游戏</a></li>
                        </ul>
                    </div>
                    <div className={S.bottom}>
                        <div className={S.bottomleft}>
                            关注:
                            <a href="javasript:;" title="新浪微博"></a>
                            <a href="javasript:;" title="人人网"></a>
                            <a href="javasript:;" title="QQ空间"></a>
                            <a href="javasript:;" title="腾讯微博"></a>
                            <a href="javasript:;" title="豆瓣"></a>
                        </div>
                        <div className={S.copyright}>
                            © 2007 - 2018 XXXXXXX文化创意有限公司 - 网站地图
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}