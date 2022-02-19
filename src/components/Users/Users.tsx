import React from 'react';
import {FilterUsersDataType, UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator";
import {User} from "./User";
import styles from './Users.module.css';
import {FilterUsers} from "./FilterUsers";

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
    filter: FilterUsersDataType
    onFilterForm: (filter: FilterUsersDataType) => void
}

let Users = React.memo((props: UsersPropsType) => {

    return <div>
        <FilterUsers filter={props.filter} onFilterForm={props.onFilterForm}/>
        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                   portionSize={5} items={props.users}/>

        {props.users.length
            ? <div className={styles.usersContainer}>
                {props.users.map(u => <User key={u.id}
                                            user={u}
                                            follow={props.follow}
                                            followingInProgressIDs={props.followingInProgressIDs}
                                            toggleFollowingProgress={props.toggleFollowingProgress}
                                            unfollow={props.unfollow}/>)}
            </div>
            : <div style={{display:"flex", justifyContent:"center"}}>Users not found</div>}
    </div>
})

export default Users;