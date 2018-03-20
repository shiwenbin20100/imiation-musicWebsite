import S from "./index.scss";
import SongInfo from "./SongInfo";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *  as actions from "./PlayRedux";
import {getSong} from "components/index/IndexRedux";
import {pageChange} from "components/header/HeaderRedux";
import {formatTime,getAbsLeft,formatTimeToSeconds} from "common/util/Util.js";

class Play extends Component{
    constructor(props){
        super(props);
        this.scrollMove = this.scrollMove.bind(this);
        this.setScrollHeight = this.setScrollHeight.bind(this);
        this.audioCanPlayThrough = this.audioCanPlayThrough.bind(this);
        this.handleSongStatus = this.handleSongStatus.bind(this);
        this.setSongTime = this.setSongTime.bind(this);
        this.audioPlay = this.audioPlay.bind(this);
        this.progressMove = this.progressMove.bind(this);
        this.endSong = this.endSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.prevSong = this.prevSong.bind(this);
        this.changeLyricProgress = this.changeLyricProgress.bind(this);
        this.changeMuted = this.changeMuted.bind(this);

        this.state = {
            startTime: "",
            endTime: "",
            isMuted: false
        }
    }

    componentWillMount(){
        let {songData} = this.props;
        if(!!!songData.length){
            this.props.getSong();
        }

    }

    componentDidMount(){
        this.setScrollHeight();
        this.props.getSpecSong(0);
        this.refs.audio.volume = 0.2;
        this.refs.audioUp.style.right = "80%"
    }

    //设置滚动条高度
    setScrollHeight(){

        let songBodyWrap = this.refs.songBodyWrap;
        let allSong = this.refs.allSong;
        let lyricFrame = this.refs.lyricFrame;
        let lyric = this.refs.lyric;

        let scrollBar = this.refs.scrollBar0;
        let scrollBlock0 = this.refs.scrollBlock0;
        let scrollBlock1 = this.refs.scrollBlock1;
        scrollBlock0.style.height = songBodyWrap.offsetHeight *songBodyWrap.offsetHeight/allSong.offsetHeight + "px";
        scrollBlock1.style.height = lyricFrame.offsetHeight *lyricFrame.offsetHeight/lyric.offsetHeight + "px";

        if(allSong.offsetHeight <= songBodyWrap.offsetHeight){
            scrollBlock0.style.display = "none";
        }
        // if(lyric.offsetHeight <= lyricFrame.offsetHeight){
        //     scrollBlock1.style.display = "none";
        // }
    }

    //滚动条滑动
    scrollMove(ev,num){
        let objWrap = num===1?this.refs.songBodyWrap:this.refs.lyricFrame;
        let objIn = num===1?this.refs.allSong:this.refs.lyric;;
        let scrollBar = ev.target.parentNode;
        let scrollBlock = ev.target;
        let target = ev.target;
        let startY = ev.pageY;
        let startTop = target.offsetTop;

        document.onmousemove = (ev)=>{
            ev.preventDefault();
            ev.stopPropagation();
            let blockTop = startTop+ev.pageY - startY;
            let maxHeight = scrollBar.offsetHeight - scrollBlock.offsetHeight;
            let scrollValue = blockTop>0?(blockTop<maxHeight?blockTop:maxHeight):0;
            scrollBlock.style.top = scrollValue + "px";

            objIn.style.top = -((objIn.offsetHeight - objWrap.offsetHeight)*(scrollBlock.offsetTop))/maxHeight + "px";
        }
        document.onmouseup = (ev)=>{
            document.onmousemove = null;
            target.onmouseup = null;
        }
    }

    //歌曲加载完触发
    audioCanPlayThrough(){
        this.refs.audio.play();
        this.setSongTime();
    }

    //底部歌曲开关
    handleSongStatus(){
        this.props.changeStatus();
        let {isPlay} = this.props;
        if(isPlay){
            this.refs.audio.pause();
        }else {
            this.refs.audio.play();
        }
    }

    //设置歌曲开始和结束时间
    setSongTime(){
        let currentTime = this.refs.audio.currentTime;
        let duration = this.refs.audio.duration;
        let playPosition = currentTime*100/duration;
        let startTime = formatTime(currentTime);
        let endTime = formatTime(duration-currentTime);
        this.setState({
            startTime,
            endTime
        })
        this.refs.progressUp.style.right = 100 - playPosition + "%";
    }

    audioPlay(){
        this.setSongTime();
        this.changeLyricProgress();
    }

    //歌词进度
    changeLyricProgress(){

        let reg = /\[[^[]+/g;
        let lyricFrame = this.refs.lyricFrame;
        let lyricEle = this.refs.lyric;
        let temp = this.props.lyric.match(reg);
        let currentTime = this.refs.audio.currentTime;
        let liHeight = this.refs.slyric.children[0].offsetHeight;
        let scrollBar = this.refs.scrollBar1;
        let maxTop = Math.abs(lyricFrame.offsetHeight - lyricEle.offsetHeight);
        temp.map((data,i)=>{
            temp[i] = [data.substring(0,10),data.substring(10)]
        });
        temp.map((data,i)=>{
            if(i != temp.length -1 && currentTime > formatTimeToSeconds(temp[i][0]) && currentTime < formatTimeToSeconds(temp[i+1][0])){
                for(let i=0;i<temp.length;i++){
                    this.refs.slyric.children[i].style.color = "black";
                }
                this.refs.slyric.children[i].style.color = "#ff6600";
                if(i > 4){
                    let val = -liHeight * (i-5);
                    val = Math.abs(val) >= maxTop?-maxTop:val;
                    this.refs.lyric.style.top = val + "px";
                    this.refs.scrollBlock1.style.top = (liHeight/lyricEle.offsetHeight*scrollBar.offsetHeight) * (i-5) + "px";
                }else {
                    this.refs.lyric.style.top =0;
                    this.refs.scrollBlock1.style.top = 0;
                }
            }else if(i ==temp.length -1 && currentTime > formatTimeToSeconds(temp[i][0]) ) {
                this.refs.slyric.children[i].style.color = "black";
                this.refs.lyric.style.top = -liHeight * (i-5) + "px";
                this.refs.scrollBlock1.style.top = (liHeight/lyricEle.offsetHeight*scrollBar.offsetHeight) * (i-5) + "px";
            }
        })
    }

    //底部歌曲进度条
    progressMove(ev){
        let target = ev.target;
        let startPosition;
        let startX = ev.pageX - getAbsLeft(target,0);

        if(/Up/.test(target.className)){
            startPosition = target.offsetWidth;
            target = target.previousSibling;
        }else if(!!!target.className){
            startPosition = target.parentNode.offsetWidth;
            target = target.parentNode.previousSibling;
            document.onmousemove = (event)=>{
                event.preventDefault();
                event.stopPropagation();
                let dist = (startPosition + (event.pageX - startX))*100/target.offsetWidth;
                dist = dist >= 0?(dist <= 100?dist:100):0;
                target.nextSibling.style.right = 100 - dist + "%"
            }
        }else {
            startPosition = target.nextSibling.offsetWidth;
        }
        document.onmouseup = (nev)=>{
            if(!!target.className){
                let disX = nev.pageX - getAbsLeft(target,0)+4;
                let scale = disX/target.offsetWidth;
                scale = scale >=0?(scale<=1?scale:1):0;
                target.nextSibling.style.right = (100 - scale * 100) + "%";
                if(!(/audio/.test(target.className))){
                    this.refs.audio.currentTime = scale * this.refs.audio.duration;
                }else {
                    let volumn = this.refs.audioUp.style.right.split(".")[0];
                    volumn = volumn >=0?(volumn<=100?volumn:100):0;
                    this.refs.audio.volume = (100 - volumn)/100
                }
            }
            this.setState({
                isProgressMove: false
            })
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    //歌曲结束触发
    endSong(){
        this.nextSong();
    }

    //下一首歌
    nextSong(){
        this.refs.lyric.style.top =0;
        this.refs.scrollBlock1.style.top =0;
        let nowID = this.props.id;
        let datas = this.props.songData[0];
        let nextID;
            datas.map((data,i)=>{
            if(data.id == nowID){
                if(i == datas.length-1) i= -1;
                nextID = datas[i+1].id;
                return;
            }
        })
        this.props.getSpecSong(nextID);
    }

    //上一首歌
    prevSong(){
        this.refs.lyric.style.top =0;
        this.refs.scrollBlock1.style.top =0;
        let nowID = this.props.id;
        let datas = this.props.songData[0];
        let prevID;
            datas.map((data,i)=>{
            if(data.id == nowID){
                if(i == 0) i= datas.length-1;
                prevID = datas[i+1].id;
                return;
            }
        })
        this.props.getSpecSong(prevID);
    }

    //音量变化
    changeMuted(){
        let {isMuted} = this.state;
        if(isMuted){
            this.refs.audioUp.style.right = "70%";
            this.refs.audio.volume = 0.3;
        }else {
            this.refs.audioUp.style.right = "100%"
            this.refs.audio.volume = 0;
        }
        this.setState({
            isMuted: !isMuted
        })
    }


    render(){
        let {scrollMove,audioCanPlayThrough,handleSongStatus,audioPlay,progressMove,endSong,nextSong,prevSong,changeMuted} = this;

        let {songData,nowSongUrl,isPlay,id,lyric,img,musicName,singer,getSpecSong,pageChange} = this.props;
        let {startTime,endTime,isMuted} = this.state;
        let songInfos;
        let lyricInfos = "";
        if(songData.length){
            songInfos = songData[0].map((data,i)=>{
            return (<SongInfo
                key={i}
                sortNum={i}
                data={data}
                id={id}
                isPlay={isPlay}
                getSpecSong={getSpecSong}
            />)
        });
        }
        if(lyric){
            let reg = /\[[^[]+/g;
            let temp = lyric.match(reg);
            temp.map((data,i)=>{
                temp[i] = [data.substring(0,10),data.substring(10)]
            })

            lyricInfos = temp.map((data,i)=>{
                return (<li
                    key={i}
                >{data[1]}</li>);
            })
        }

        return (
            <div className={S.wrap}>
                <img src={require(`common/lyric/${img}`)} className={`${S.bg} ${S.blur}`}/>
                    <div className={S.header}>
                    <h1
                        onClick={ev=>pageChange("/index")}
                    ><img src={require("common/img/play_logo.png")}/></h1>
                    <div className={S.searchBox}><input type="text"/></div>
                    <div className={S.headerLogin}>马上<p className={S.loginBtn}>登录</p></div>
                </div>
                <div className={S.content}>
                    <div className={S.contentLeft}>
                        <div className={`${S.playing} ${S.active}`}>
                            <img src={require(`common/img/${isPlay?("play_playing.gif"):("play_pause.png")}`)}/>
                            <p>正在播放</p>
                        </div>
                        <div className={S.history}>
                            <span></span>
                            <p>播放历史</p>
                        </div>
                        <div className={S.songCollection}>
                            <span></span>
                            <p>我收藏的单曲</p>
                        </div>
                        <div className={S.listCollection}>我创建的歌单
                            <span></span>
                        </div>
                        <div className={S.tdCode}>
                            <img src={require("common/img/play_tdCode.png")}/>
                            <p>扫码<br/>有惊喜 </p>
                        </div>
                    </div>
                    <div className={S.contentMiddle}>
                        <div className={S.songHeader}>
                            <ul>
                                <li>歌曲(30)</li>
                                <li>演唱者</li>
                                <li>专辑</li>
                            </ul>
                        </div>
                        <div className={S.songBodyWrap}
                            ref="songBodyWrap"
                        >
                            <div className={S.allSong}
                            ref="allSong"
                            >
                                {songInfos}
                            </div>
                            {/*<SlideBar/>*/}
                            <div className={S.scrollBar}
                                ref="scrollBar0"
                            >
                                <div className={S.scrollBlock}
                                    ref="scrollBlock0"
                                    onMouseDown={ev=>scrollMove(ev,1)}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className={S.contentRight}>
                        <img src={require(`common/lyric/${img}`)}/>
                        <div className={S.lyricFrame}
                            ref="lyricFrame"
                        >
                            <div className={S.lyric}
                                ref="lyric"
                            >
                                <ul
                                ref="slyric"
                                >
                                    {lyricInfos}
                                </ul>

                            </div>
                            <div className={S.scrollBar}
                                ref="scrollBar1"
                            >
                                <div className={S.scrollBlock}
                                    ref="scrollBlock1"
                                    onMouseDown={ev=>scrollMove(ev,2)}
                                ></div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className={S.footer}>
                    <div className={S.controlBtns}>
                        <div className={S.prevSong}
                            onClick={ev=>prevSong()}
                        ></div>
                        <div className={isPlay?S.pause:S.playing}
                            onClick={ev=>handleSongStatus()}
                        ></div>
                        <div className={S.nextSong}
                            onClick={ev=>nextSong()}
                        ></div>
                        <div className={S.actionChange}></div>
                    </div>
                    <div className={S.progressWrap}>
                        <div className={S.nowSongDetail}>
                            <p className={S.nowSong}>{musicName}-{singer}</p>
                            <div className={S.nowSongBtn}>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                        </div>
                        <div className={S.progressBar}>
                            <p className={S.startTime}>{startTime}</p>
                            <div className={S.progressLine}
                                onMouseDown={ev=>progressMove(ev)}
                            >
                                <div className={S.progressUnder}></div>
                                <div className={S.progressUp}
                                    ref="progressUp"
                                >
                                    <div
                                    ></div>
                                </div>
                            </div>

                            <p className={S.endTime}>{endTime}</p>
                        </div>
                    </div>
                    <div className={S.audioBar}>
                            <div className={isMuted?S.noaudio:S.audioBtn}
                                onClick={ev=>changeMuted()}
                            ></div>
                        <div className={S.audioProgressWrap}
                            onMouseDown={ev=>progressMove(ev)}
                        >
                            <div className={S.audioUnder}></div>
                            <div className={S.audioUp}
                                ref="audioUp"
                            >
                                    <div></div>
                               </div>
                        </div>

                     </div>
                </div>
                <audio
                    ref="audio"
                    src={require(`common/lyric/${nowSongUrl}`)}
                    onCanPlayThrough={ev=>audioCanPlayThrough()}
                    onTimeUpdate={ev=>audioPlay()}
                    onEnded={ev=>endSong()}
                    muted={isMuted}
                ></audio>
            </div>
        );
    }
}

export default connect(
    state=>{
        let {Index:{songData},Play:{nowSong}} = state;
        songData = songData[0]?songData:[];
        return {songData,nowSongUrl:nowSong.songUrl,isPlay:nowSong.isPlay,id:nowSong.id,lyric:nowSong.lyric,img:nowSong.img,musicName:nowSong.musicName,singer:nowSong.singer};

    },
    dispatch=>bindActionCreators({...actions,getSong,pageChange},dispatch)
)(Play);