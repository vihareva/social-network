import React from 'react';
import s from './Post.module.css';
import userPhoto from '../../../../assets/userPhoto.jpg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import cs from "../../../../assets/Common.module.css";
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {profilePageType, ProfileType} from "../../../../redux/profile-reducer";
type PostType={
    message: string
    likesCount: number
    profile: ProfileType
    date:string
}
const Post = (props: PostType) => {

    return (
        <div className={`${cs.container} ${s.container}`}>
            <div className={s.descContainer}>
                <img className={s.userPhoto} src={props.profile.photos.large ? props.profile.photos.large : userPhoto}/>
                <div>
                    <div className={s.name}>{props.profile.fullName}</div>
                    <div className={s.date}>{props.date}</div>
                </div>
            </div>
            <p className={s.item}>{props.message }</p>
            <div>
                <span> <FontAwesomeIcon icon={faHeart}/> </span> { props.likesCount }
            </div>
        </div>
    )
}

export default Post;