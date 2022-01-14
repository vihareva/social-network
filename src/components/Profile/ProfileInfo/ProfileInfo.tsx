import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import {ContactsType, ProfileType, updateProfileDescription} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader";
import styles from "../../Users/Users.module.css";
import userPhoto from "../../../assets/userPhoto.jpg";
import {ProfileStatus} from "./Status/ProfileStatus";
import {useDispatch} from "react-redux";
import {ProfileDescriptionForm} from "./ProfileDescriptionForm";


type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updatePhoto: (file: File) => void
    userId: number
}
const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    const dispatch = useDispatch()
    const selectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files[0])
            dispatch(props.updatePhoto(e.target.files[0]))
        }

    }

    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }


    return <>

        {!editMode
            ? <div>
                {props.isOwner && <button onClick={() => setEditMode(true)}>edit</button>}

                <div className={s.descriptionBlock}>
                    <img className={styles.userPhoto}
                         src={props.profile.photos.large ? props.profile.photos.large : userPhoto}/>

                    <div>
                        {props.isOwner && <input type="file" onChange={selectPhoto}/>}
                    </div>

                    <div>
                        <div>fullName: {props.profile.fullName}</div>
                        <div>aboutMe: {props.profile.aboutMe}</div>
                        <div>lookingForAJob: {props.profile.lookingForAJob ? 'I am looking for a job' : 'I am not looking for a job'}</div>
                        {props.profile.lookingForAJob &&
                        <div>lookingForAJobDescription: {props.profile.lookingForAJobDescription}</div>}


                        {Object.keys(props.profile.contacts).map(contact => {

                            return <div>
                                <div>{contact}</div>
                                <div>{props.profile.contacts[contact as keyof ContactsType]}</div>
                            </div>

                        })}
                        <ProfileStatus status={props.status}/>
                    </div>
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