import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/userPhoto.jpg";
import styles from "./Users.module.css";
import cs from "../../assets/Common.module.css";
import s from "./User.module.css";
import React from "react";
import {UserType} from "../../redux/users-reducer";

type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgressIDs: number[]
}

export let User = ({user, ...props}: UserPropsType) => {

    return <div className={`${cs.container} ${s.userContainer}`}>


        <div className={s.imgContainer}>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                     className={styles.userPhoto}/>
            </NavLink>
        </div>
        <div className={s.descContainer}>
            <div className={s.name}>{user.name}</div>
            <div className={s.status}>{user.status}</div>
        </div>
        <div>
            {user.followed
                ? <button className={cs.button}
                          disabled={props.followingInProgressIDs.some(id => id === user.id)}
                          onClick={() => {
                              props.unfollow(user.id)
                          }}>Unfollow</button>
                : <button className={cs.button}
                          disabled={props.followingInProgressIDs.some(id => id === user.id)}
                          onClick={() => {
                              props.follow(user.id)
                          }}>Follow</button>}
        </div>
    </div>
}
