// import React from 'react';
// import styles from './Users.module.css';
// import {usersStateType, UserType} from "../../redux/users-reducer";
// import {UsersPropsType} from "./UsersContainer";
//
// let Users = (props:UsersPropsType) => {
//     if (props.usersPage.users.length === 0) {
//         props.setUsers([
//                 {
//                     id: 1,
//                     photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/220px-Dmitry_Nagiev_2017_4.jpg',
//                     followed: false,
//                     fullName: 'Dmitry',
//                     status: 'I am a boss',
//                     location: {city: 'Minsk', country: 'Belarus'}
//                 },
//                 {
//                     id: 2,
//                     photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/220px-Dmitry_Nagiev_2017_4.jpg',
//                     followed: true,
//                     fullName: 'Sasha',
//                     status: 'I am a boss too',
//                     location: {city: 'Moscow', country: 'Russia'}
//                 },
//                 {
//                     id: 3,
//                     photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/220px-Dmitry_Nagiev_2017_4.jpg',
//                     followed: false,
//                     fullName: 'Andrew',
//                     status: 'I am a boss too',
//                     location: {city: 'Kiev', country: 'Ukraine'}
//                 }
//             ]
//         )
//     }
//
//     return <div>
//         {
//             props.usersPage.users.map(u => <div key={u.id}>
//                 <span>
//                     <div>
//                         <img src={u.photoUrl} className={styles.userPhoto}/>
//                     </div>
//                     <div>
//                         {u.followed
//                             ? <button onClick={() => {
//                                 props.unfollow(u.id)
//                             }}>Unfollow</button>
//                             : <button onClick={() => {
//                                 props.follow(u.id)
//                             }}>Follow</button>}
//
//                     </div>
//                 </span>
//                 <span>
//                     <span>
//                         <div>{u.fullName}</div>
//                         <div>{u.status}</div>
//                     </span>
//                     <span>
//                         <div>{u.location.country}</div>
//                         <div>{u.location.city}</div>
//                     </span>
//                 </span>
//             </div>)
//         }
//     </div>
// }
//
// export default Users;

import React from 'react';
import styles from './Users.module.css';
import {UserType} from "../../redux/users-reducer";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import {usersAPI} from "../../api/api";
import userPhoto from "../../assets/userPhoto.jpg"

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (isFetching:boolean, userId:number )=>void
    followingInProgressIDs: number[]
}

let Users = (props: UsersPropsType) => {

    //let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= 40; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage: ''}
                             onClick={(e) => {
                                 props.onPageChanged(p);
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                       <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto }
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgressIDs.some(id=>id===u.id)}
                                      onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                            : <button disabled={props.followingInProgressIDs.some(id=>id===u.id)}
                                      onClick={() => {props.follow(u.id)}}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}


export default Users;