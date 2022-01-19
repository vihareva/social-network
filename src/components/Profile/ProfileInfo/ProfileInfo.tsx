import React, {ChangeEvent, useState, useRef, MutableRefObject} from 'react';
import s from './ProfileInfo.module.css';
import {ContactsType, ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader";
import userPhoto from "../../../assets/userPhoto.jpg";
import {ProfileStatus} from "./Status/ProfileStatus";
import {useDispatch} from "react-redux";
import {ProfileDescriptionForm} from "./ProfileDescriptionForm";
import cs from "../../../assets/Common.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
import {faVk} from "@fortawesome/free-brands-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faPaperclip} from '@fortawesome/free-solid-svg-icons'
import {faUserEdit} from '@fortawesome/free-solid-svg-icons'
import {faLaptopHouse} from '@fortawesome/free-solid-svg-icons'
import {faImages} from '@fortawesome/free-solid-svg-icons'
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updatePhoto: (file: File) => void
    userId: number
}

const contactImages = {
    github: faGithub,
    vk: faVk,
    facebook: faFacebookF,
    instagram: faInstagram,
    twitter: faTwitter,
    website: faLaptopHouse,
    youtube: faYoutube,
    mainLink: faPaperclip
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    const dispatch = useDispatch()
    const selectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            dispatch(props.updatePhoto(e.target.files[0]))
        }

    }
    const fileInput = useRef() as MutableRefObject<HTMLInputElement>
    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }


    // @ts-ignore
    return <>

        {!editMode
            ? <div>


                <div>
                    <div className={s.mainBlock}>
                        <div className={`${cs.container} ${s.mainProfileDescContainer}`}>
                            <div>
                                <div>
                                    <img className={s.userPhoto}
                                         src={props.profile.photos.large ? props.profile.photos.large : userPhoto}/>
                                </div>
                                <div className={s.name}> {props.profile.fullName}</div>
                            </div>
                            <div>
                                {props.isOwner && <div>
                                    <input style={{display: 'none'}} ref={fileInput} type="file"
                                           onChange={selectPhoto}/>
                                    <button className={`${cs.button} ${s.editButton}`}
                                            onClick={() => fileInput.current.click()}>
                                        <FontAwesomeIcon size={"lg"} icon={faImages}/>
                                    </button>
                                </div>}
                            </div>


                        </div>
                        <div className={`${cs.container} ${s.jobDescContainer}`}>

                            <div className={s.desc}><span
                                className={s.textHeader}>aboutMe: </span>{props.profile.aboutMe}</div>
                            <ProfileStatus isOwner={props.isOwner} status={props.status}/>
                            <div className={s.desc}><span
                                className={s.textHeader}>lookingForAJob:</span> {props.profile.lookingForAJob ? 'I am looking for a job' : 'I am not looking for a job'}
                            </div>
                            {props.profile.lookingForAJob &&
                            <div className={s.desc}><span
                                className={s.textHeader}>lookingForAJobDescription:</span> {props.profile.lookingForAJobDescription}
                            </div>}
                            {props.isOwner &&
                            <div className={s.buttonContainer}>
                                <button className={`${cs.button} ${s.editButton}`} onClick={() => setEditMode(true)}>
                                    <FontAwesomeIcon size={"lg"} icon={faUserEdit}/>
                                </button>
                            </div>}
                        </div>
                    </div>


                    <div>
                        <div className={s.contactsContainer}>
                            {Object.keys(props.profile.contacts).map(contact => {

                                return <div className={`${cs.container} ${s.contactContainer}`}>
                                    <div className={s.iconContainer}>
                                        <FontAwesomeIcon size={"2x"}
                                                         icon={contactImages[contact as keyof ContactsType]}/>
                                    </div>
                                    <div className={s.contactDescContainer}>
                                        <div className={s.contact}>{contact}</div>
                                        <div>
                                            <a className={s.contactValue}
                                               href={props.profile.contacts[contact as keyof ContactsType]}>
                                                {props.profile.contacts[contact as keyof ContactsType] ? 'click here to go' : 'no link'}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            })}
                        </div>

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