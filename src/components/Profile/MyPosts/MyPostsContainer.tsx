import React from 'react';
import {addPostActionCreator, profilePageType, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type mapStateToPropsType={
    profilePage: profilePageType
}
type mapDispatchToPropsType={
    addPost: (postMessage: string) =>void
    updateNewPostText: (body:string) =>void
}

const mapStateToProps = (state:AppStateType):mapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
export type PostsPropsType=mapStateToPropsType&mapDispatchToPropsType
const mapDispatchToProps = (dispatch:Dispatch) :mapDispatchToPropsType=> {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost: (postMessage) => {
            dispatch(addPostActionCreator(postMessage));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;