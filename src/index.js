import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from './my-redux'
import reducers from './reducer'
import Home from './screen/Home'
import {thunk, ceshi} from './my-redux/my-redux-thunk'
import registerServiceWorker from './registerServiceWorker';
import Provider from './my-redux/react-redux'
const store = createStore(reducers, compose(applyMiddleware(ceshi, thunk)))
store.subscribe( function () {
    console.log('订阅了')
} )
const App = ()=> (
    <Provider store={store} >
        <Home></Home>
    </Provider>
)


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
