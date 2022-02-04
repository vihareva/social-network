import s from "./ProfileInfo.module.css";
import cs from "../../../assets/Common.module.css";
import userPhoto from "../../../assets/userPhoto.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {ProfileStatus} from "./Status/ProfileStatus";
import React, {ChangeEvent, MutableRefObject, useRef} from "react";
import {ProfileType} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";


type ProfileDescriptionPropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updatePhoto: (file: File) => void
    userId: number
    switchOnEditMode: () => void
}
export const ProfileDescription = (props: ProfileDescriptionPropsType) => {

    const dispatch = useDispatch()
    const selectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            dispatch(props.updatePhoto(e.target.files[0]))
        }
    }
    const fileInput = useRef() as MutableRefObject<HTMLInputElement>

    return <div className={s.mainBlock}>
                <div className={`${cs.container} ${s.mainProfileDescContainer}`}>
                    <div className={s.flex}>
                        <div>
                            <div>
                                <img className={s.userPhoto}
                                     src={props.profile.photos.large ? props.profile.photos.large : userPhoto}/>
                            </div>
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
                    {props.isOwner
                        ? <div className={s.name}> {props.profile.fullName}</div>
                        : <div style={{textAlign: 'center'}} className={s.name}> {props.profile.fullName}</div>}
                </div>
                <div className={`${cs.container} ${s.jobDescContainer}`}>

                    <div className={s.desc}><span
                        className={s.textHeader}>aboutMe: </span>{props.profile.aboutMe? props.profile.aboutMe :'no info' }</div>
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
                        <button className={`${cs.button} ${s.editButton}`} onClick={props.switchOnEditMode}>
                            <FontAwesomeIcon size={"lg"} icon={faUserEdit}/>
                        </button>
                    </div>}
                </div>
            </div>
}