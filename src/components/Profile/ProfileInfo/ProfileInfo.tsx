import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader";

type ProfileInfoPropsType={
    profile:ProfileType| null
}
const ProfileInfo = (props:ProfileInfoPropsType ) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>

            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} />
                <div>
                    <div>{props.profile.fullName}</div>
                    <div>{props.profile.contacts.instagram}</div>

                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;