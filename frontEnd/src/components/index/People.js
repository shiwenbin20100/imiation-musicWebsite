export default class People extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {img,name} = this.props;
        return (
            <li><a href="javascript:;"><img src={img}></img><p>{name}</p></a> </li>
        );
    }
}