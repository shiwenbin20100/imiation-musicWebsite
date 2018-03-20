
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { routerReducer, routerMiddleware, ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import thunk from 'redux-thunk';

import reducers from './reducer';

const history = createHistory();

const routerML = routerMiddleware(history);

export {history};


let rootReducer = combineReducers({
    ...reducers,
    router: routerReducer
});
export default function configureStore() {

    if(process.env.NODE_ENV === 'production'){
        return createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk, routerML)
            )
        );
    }else{
        return createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk, routerML),
                window.devToolsExtension ? window.devToolsExtension() : f=>f
            )

        );
    }


}
