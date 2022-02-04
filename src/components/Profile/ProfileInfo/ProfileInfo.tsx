import React, {useState} from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader";
import {ProfileDescriptionForm} from "./ProfileDescriptionForm";
import {ProfileDescription} from "./ProfileDescription";
import {ProfileContacts} from "./ProfileContacts";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updatePhoto: (file: File) => void
    userId: number
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }

    return <>
        {!editMode
            ? <div>
                <div>
                    <ProfileDescription profile={props.profile} status={props.status}
                                        isOwner={props.isOwner} updatePhoto={props.updatePhoto}
                                        userId={props.userId} switchOnEditMode={() => setEditMode(true)}/>
                    <ProfileContacts profile={props.profile}/>
                </div>
            </div>
            : <div>
                <ProfileDescriptionForm userId={props.userId} profile={props.profile}
                                        switchOffEditMode={() => setEditMode(false)}/>
            </div>
        }
    </>
}

export default ProfileInfo;