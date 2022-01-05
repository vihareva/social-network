import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {ProfileType, getUserProfile, getUserStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: number
}

type mapStateToPropsType = {
    profile: ProfileType | null
    status: string
    isAuth: boolean
    userId: number | null
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
}

type OwnPropsType = mapStateToPropsType & mapDispatchToPropsType


// @ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        debugger
        let id = this.props.match.params.userId;
        if (!id) {
            this.props.userId
                ? id = this.props.userId
                : this.props.history.push('/login');
        }
        this.props.getUserProfile(id);
        this.props.getUserStatus(id)
    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    userId: state.auth.id
});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus}),
    withRouter
)(ProfileContainer)

