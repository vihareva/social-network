import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updatePhoto: (file: File) => void
    userId: number
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo status={props.status}
                         profile={props.profile}
                         isOwner={props.isOwner}
                         updatePhoto={props.updatePhoto}
                         userId={props.userId}
            />
        </div>
    )

}

export default Profile;