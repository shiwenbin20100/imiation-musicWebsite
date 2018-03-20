import S from "./index.scss";
export default class SongInfo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {sortNum,data,id,isPlay,getSpecSong} = this.props;
        return (
                <div className={S.songBody}>
                            <ul>
                                <li className={data.id === id?S.singleWrap:""}>
                                    <input type="checkbox"/>
                                <div className={S.sortItem}><span
                                        onClick={ev=>getSpecSong(data.id)}
                                ></span>
                                    <div className={S.playingIcon}
                                    style={{display:data.id === id?"inline":"none"}}
                                    >
                                        <img src={require(`common/img/${isPlay?"play_sPlaying.gif":"play_playing.png"}`)}
                                    style={{display:data.id === id?"inline":"none"}}
                                />
                                    </div>

                                    <em
                                        style={{display:data.id === id?"none":""}}
                                    >{sortNum}</em>
                                </div>
                                <div className={S.infoWrap}>
                                    <div>{data.musicName}</div>
                                    <div>{data.singer}</div>
                                    <div>{data.album}</div>
                                </div>

                                <div className={S.manipt}>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                                <div className={S.similarSong}
                                    style={{display:data.id === id?"block":"none"}}
                                ></div>
                            </li>
                            </ul>

                        </div>
        );
    }
}