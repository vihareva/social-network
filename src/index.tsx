import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux/state";


    export const renderTree=()=>{
    ReactDOM.render(
        <App store={store} />,
        document.getElementById('root')
    )

}
renderTree()
store.subscribe(renderTree);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();