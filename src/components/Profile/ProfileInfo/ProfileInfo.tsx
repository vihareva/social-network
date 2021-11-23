import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader";
import styles from "../../users/Users.module.css";
import userPhoto from "../../../assets/userPhoto.jpg";
import {ProfileStatus} from "./Status/ProfileStatus";


type ProfileInfoPropsType={
    profile:ProfileType| null
    status: string
}
const ProfileInfo = (props:ProfileInfoPropsType ) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>

            <div className={s.descriptionBlock}>
                <img className={styles.userPhoto}
                     src={props.profile.photos.large?props.profile.photos.large: userPhoto  } />
                <div>
                    <div>{props.profile.fullName}</div>
                    <div>{props.profile.contacts.instagram}</div>

                    <ProfileStatus status={props.status}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;