import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {appStore} from "./redux/redux-store";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";

ReactDOM.render(
    <HashRouter>
        <Provider store={appStore}>
            <App/>
        </Provider>
    </HashRouter>, document.getElementById('root')
)

reportWebVitals();
