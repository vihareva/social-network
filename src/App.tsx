import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {changeNewText, stateType} from "./redux/state";


type AppPropsType = {
    state: stateType
    addPost: (postMessage: string) => void
    changeNewText: (newText: string)=>void
}

function App(props: AppPropsType) {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <Dialogs state={props.state.messagesPage}/>}/>
                    <Route path='/profile'
                           render={() => <Profile
                               state={props.state.profilePage}
                               addPost={props.addPost}
                               changeNewText={props.changeNewText}
                           />}
                    />
                </div>
            </div>
        </BrowserRouter>)
}

export default App;
