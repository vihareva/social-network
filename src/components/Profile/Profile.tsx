import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import {actionTypes, profilePageType} from "../../redux/state";


type ProfilePropsType={
   state:  profilePageType
    dispatch: (action: actionTypes)=>void
}
const Profile = (props:ProfilePropsType ) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts postData={props.state.postData}
                     message={props.state.messageForNewPost}
                    dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;