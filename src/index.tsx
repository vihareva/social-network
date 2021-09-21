import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {changeNewText, onChange, state, stateType, subscribe} from './redux/state'
import {addPost} from'./redux/state'


export const renderTree=()=>{
    ReactDOM.render(
        <App state={state}
             addPost={addPost}
             changeNewText={changeNewText}
        />,
        document.getElementById('root')
    )

}
renderTree()
subscribe(renderTree);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
