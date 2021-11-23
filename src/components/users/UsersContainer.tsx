// import React from 'react';
// import Users from "./Users";
// import {connect} from "react-redux";
// import {follow, usersStateType, setUsers, unfollow, UserType} from "../../redux/users-reducer";
// import {AppStateType} from "../../redux/redux-store";
// import {Dispatch} from "redux";
//
// type mapStateToPropsType={
//     usersPage: usersStateType
// }
//
// type mapDispatchToPropsType={
//     follow: (userId: number) =>void
//     unfollow: (userId: number) => void
//     setUsers: (users: Array<UserType>) => void
//
// }
//
// export type UsersPropsType=mapStateToPropsType&mapDispatchToPropsType;
//
// let mapStateToProps = (state: AppStateType) :mapStateToPropsType=> {
//     return {
//         usersPage: state.usersPage
//     }
// }
//
// let mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(follow(userId));
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollow(userId));
//         },
//         setUsers: (users: Array<UserType>) => {
//             dispatch(setUsers(users));
//         }
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Users);
import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount,
    toggleIsFetching,
    unfollow, UserType, toggleFollowingProgress, getUsers, ThunkType
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader";
import {AppStateType} from "../../redux/redux-store";
import { usersAPI} from "../../api/api";
import {Dispatch} from "redux";


class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPageNumber,this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber,this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPageNumber}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgressIDs={this.props.followingInProgressIDs}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }
}

type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType;

type mapStateToPropsType = {
    users: Array<UserType>
    pageSize: number,
    totalUsersCount: number,
    currentPageNumber: number,
    isFetching: boolean
    followingInProgressIDs: number[]
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPageNumber: state.usersPage.currentPageNumber,
        isFetching: state.usersPage.isFetching,
        followingInProgressIDs: state.usersPage.followingInProgressIDs
    }
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching:boolean, userId:number )=>void
    getUsers: (currentPage: number, pageSize: number)  =>void
}

export default connect(
    mapStateToProps, {
        follow, unfollow, setUsers,
        setCurrentPage, setTotalUsersCount,
        toggleIsFetching,toggleFollowingProgress,
        getUsers
    }
)(UsersContainer);