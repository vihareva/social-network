import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {followAC, usersStateType, setUsersAC, unfollowAC, UserType} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

type mapStateToPropsType={
    usersPage: usersStateType
}

type mapDispatchToPropsType={
    follow: (userId: number) =>void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void

}

export type UsersPropsType=mapStateToPropsType&mapDispatchToPropsType;

let mapStateToProps = (state: AppStateType) :mapStateToPropsType=> {
    return {
        usersPage: state.usersPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);