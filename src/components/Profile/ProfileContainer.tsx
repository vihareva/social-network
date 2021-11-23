import React from 'react';
import Profile from "./Profile";
import  axios from "axios";
import {connect} from "react-redux";
import {ProfileType, getUserProfile, getUserStatus} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType={
    userId: number
}

type mapStateToPropsType={
    profile: ProfileType|null
    status: string

}
type mapDispatchToPropsType={
    getUserProfile : (userId:number) =>void
    getUserStatus:(userId: number) =>void
}

type OwnPropsType=mapStateToPropsType&mapDispatchToPropsType


// @ts-ignore
type PropsType=RouteComponentProps<PathParamsType>&OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {

        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
       this.props.getUserProfile(userId);
this.props.getUserStatus(userId)
    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}/>
        )
    }
}

let mapStateToProps = (state:AppStateType):mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
});



export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile,getUserStatus}),
    withRouter
)(ProfileContainer)

