import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import {profilePageType} from "../../redux/state";


type ProfilePropsType={
   state:  profilePageType
    addPost:(postMessage: string)=>void
    changeNewText: (newText: string)=>void
}
const Profile = (props:ProfilePropsType ) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts postData={props.state.postData}
                     message={props.state.messageForNewPost}
                     addPost={props.addPost}
                     changeNewText={props.changeNewText}
            />
        </div>
    )
}

export default Profile;