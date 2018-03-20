import {Provider} from 'react-redux';
import { Route,Switch,Link,Redirect } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import configureStore, {history} from 'reduxes/configureStore';

import IndexPg from "./components/IndexPg";
import Index from 'components/index/Index';
import Register from 'components/register/Register';
import Login from 'components/login/Login';
import Play from 'components/play/Play';

import  "./style.scss";
let store = configureStore();

class App extends Component{

    constructor(props){
        super(props);
    }

    render(){

        return (
            <div>
            </div>
        );
    }
}


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                {/*<Route exact path="/" render={()=><Redirect to="/index" />}/>*/}
                <Route exact path="/" component={IndexPg}/>
                <Route path="/index" component={Index}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/play" component={Play}/>
            </Switch>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root')
);
