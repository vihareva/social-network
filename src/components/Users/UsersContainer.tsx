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

        const {search} = this.props.history.location
        const parsedUrl = queryString.parse(search.substring(1)) as QueryParamsType

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