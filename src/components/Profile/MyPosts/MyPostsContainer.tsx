import React from 'react';
import {addPost, getUserProfile, profilePageType, updateNewPostText} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {compose} from "redux";
import {RouteComponentProps} from "react-router-dom";
import Preloader from "../../common/Preloader";

type mapStateToPropsType = {
    profilePage: profilePageType
    isAuth: boolean
    userId:number | null
    isFetching: boolean
}
type mapDispatchToPropsType = {
    addPost: (postMessage: string, date: string) => void
    updateNewPostText: (body: string) => void
    getUserProfile: (userId: number) => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        profilePage: state.profilePage,
        isAuth: state.auth.isAuth,
        isFetching: state.usersPage.isFetching,
        userId: state.auth.id
    }
}

class MyPostsContainer extends React.Component<RouteComponentProps & MyPostsContainerPropsType> {

    componentDidMount() {
        if(Object.keys(this.props.profilePage.profile).length === 0){
            this.props.userId
                ?this.props.getUserProfile(this.props.userId)
                : this.props.history.push('/login');
        }
     }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            {
                Object.keys(this.props.profilePage.profile).length !== 0
                    ? <MyPosts profilePage={this.props.profilePage} isAuth={this.props.isAuth}
                                                         addPost={this.props.addPost} updateNewPostText={this.props.updateNewPostText}/>
                    :<></>
            }
        </>
    }

}

type MyPostsContainerPropsType = mapStateToPropsType & mapDispatchToPropsType;
export default compose<React.ComponentType>(connect(mapStateToProps, {updateNewPostText,getUserProfile,addPost}))(MyPostsContainer);