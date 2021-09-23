import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import { StoreType} from "./redux/state";


type AppPropsType = {
    store: StoreType
}

function App(props: AppPropsType) {
const state=props.store.getState();
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <Dialogs
                               state={state.messagesPage}
                               dispatch={props.store.dispatch.bind(props.store)}/>}/>
                    <Route path='/profile'
                           render={() => <Profile
                               state={state.profilePage}
                              dispatch={props.store.dispatch.bind(props.store)}
                           />}
                    />
                </div>
            </div>
        </BrowserRouter>)
}

export default App;
