import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {appStore} from "../../redux/redux-store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";
type ProfilePropsType={
    profile: ProfileType|null
    status: string
}
const Profile = (props:ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo status={props.status} profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;