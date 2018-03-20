import S from "./index.scss";

export default class MusicTitle extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={S.title}>
                <h2>岁月神偷</h2>
                <p>Travel of Time</p>
            </div>

        );
    }
}