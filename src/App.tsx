import React from 'react';
import style from './App.module.css';
import {Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import MyPostsContainer from "./components/Profile/MyPosts/MyPostsContainer";
import Preloader from "./components/common/Preloader";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

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
            return <div><Preloader/></div>
        }

        return (
            <div className={style.appWrapper}>
                <HeaderContainer/>
                <Navbar/>
                <div className={style.appWrapperContent}>
                    <Route path='/dialogs'
                           render={()=><DialogsContainer/>}/>
                    <Route path='/profile/:userId?'
                           render={()=><ProfileContainer/>}/>
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

