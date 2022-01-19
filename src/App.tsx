import React from 'react';
import './App.css';
import {Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import {withSuspense} from "./hoc/withSuspense";
import MyPostsContainer from "./components/Profile/MyPosts/MyPostsContainer";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

type mapStateToPropsType = {
    isInitialized: boolean
}
type mapDispatchToPropsType = {
    initializeApp: () => void
}

export type AppComponentType = mapStateToPropsType & mapDispatchToPropsType

class App extends React.Component<AppComponentType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.isInitialized) {
            return <div>preloader</div>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={withSuspense(DialogsContainer)}/>
                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                    <Route path='/posts'
                           render={() => <MyPostsContainer/>}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isInitialized: state.app.isInitialized
});

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

