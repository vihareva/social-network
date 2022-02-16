// import React from 'react';
// import Users from "./Users";
// import {connect} from "react-redux";
// import {follow, usersStateType, setUsers, unfollow, UserType} from "../../redux/Users-reducer";
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
//     setUsers: (Users: Array<UserType>) => void
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
//         setUsers: (Users: Array<UserType>) => {
//             dispatch(setUsers(Users));
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
    unfollow, UserType, toggleFollowingProgress, getUsers, FilterUsersDataType,
} from '../../redux/users-reducer';
import Users from '../Users/Users';
import Preloader from "../common/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import queryString from 'querystring'

type QueryParamsType = { term?: string, friend?: string, page?: string }

class UsersContainer extends React.Component<RouteComponentProps & UsersPropsType> {
    componentDidMount() {
        //считываем из адресной строки и делаем запрос
        const {search} = this.props.history.location
        const parsedUrl = queryString.parse(search.substring(1)) as QueryParamsType
        // console.log(parsedUrl)

        let actualPageNumber = this.props.currentPageNumber;
        if (!!parsedUrl.page) {
            actualPageNumber = Number(parsedUrl.page)
        }

        let actualFilter = this.props.filter;
        if (!!parsedUrl.term) {
            actualFilter = {...actualFilter, term: parsedUrl.term}
        }
        switch(parsedUrl.friend){
            case 'null': {
                actualFilter = {...actualFilter, friend: null}
            break;
            }
            case 'true':{
                actualFilter = {...actualFilter, friend: true}
                break;
            }
            case 'false':{
                actualFilter = {...actualFilter, friend: false}
                break;
            }
        }

        this.props.getUsers(actualPageNumber, this.props.pageSize, actualFilter)
    }

    componentDidUpdate(prevProps: UsersPropsType) {
      //если в инпуте и селекте мы поменяли чтото и отправили на сервер запрос и в рез засетались новые фильтры
        //то эти фильтры надо засунуть в куеристроку
        if (this.props.filter !== prevProps.filter || this.props.currentPageNumber !== prevProps.currentPageNumber) {
            const query:QueryParamsType={}
            if(!!this.props.filter.term) query.term=this.props.filter.term
            if(this.props.currentPageNumber!==1) query.page=String(this.props.currentPageNumber)
            if(this.props.filter.friend!==null) query.friend=String(this.props.filter.friend)
            const url = queryString.stringify(query)
            this.props.history.push('?'+ url, '/users')
        }
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter)
    }

    onFilterForm = (filter: FilterUsersDataType) => {
        this.props.setCurrentPage(1);
        this.props.getUsers(1, this.props.pageSize, filter)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPageNumber}
                   onPageChanged={this.onPageChanged}
                   onFilterForm={this.onFilterForm}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgressIDs={this.props.followingInProgressIDs}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   filter={this.props.filter}
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
    isFetching: boolean,
    followingInProgressIDs: number[],
    filter: FilterUsersDataType
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPageNumber: state.usersPage.currentPageNumber,
        isFetching: state.usersPage.isFetching,
        followingInProgressIDs: state.usersPage.followingInProgressIDs,
        filter: state.usersPage.filter
    }
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterUsersDataType) => void
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow, unfollow, setUsers,
        setCurrentPage, setTotalUsersCount,
        toggleIsFetching, toggleFollowingProgress,
        getUsers
    }),
    withRouter)(UsersContainer);