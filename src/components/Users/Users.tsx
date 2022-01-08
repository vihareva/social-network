// import React from 'react';
// import styles from './Users.module.css';
// import {usersStateType, UserType} from "../../redux/Users-reducer";
// import {UsersPropsType} from "./UsersContainer";
//
// let Users = (props:UsersPropsType) => {
//     if (props.usersPage.Users.length === 0) {
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
//             props.usersPage.Users.map(u => <div key={u.id}>
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
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator";
import {User} from "./User";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgressIDs: number[]
}

let Users = (props: UsersPropsType) => {

    return <div>
        <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        {props.users.map(u => <User key={u.id}
                                    user={u}
                                    follow={props.follow}
                                    followingInProgressIDs={props.followingInProgressIDs}
                                    toggleFollowingProgress={props.toggleFollowingProgress}
                                    unfollow={props.unfollow}/>)}
    </div>
}

export default Users;