import S from "./index.scss";
export default class MayLikeCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {img,name,author} = this.props;
        return (
            <li>
                <div>
                     <img src={img}/>
                     <p className={S.name}>{name}</p>
                     <p className={S.bywho}>by<a href="javascript:;">{author}</a><span className={S.playbtn}></span> </p>
                </div>
            </li>
        );
    }
}