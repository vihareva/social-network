import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {ProfileType, getUserProfile, getUserStatus, updatePhoto} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";

type PathParamsType = {
    userId: number
}

type mapStateToPropsType = {
    profile: ProfileType
    status: string
    isAuth: boolean
    userId: number
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updatePhoto: (file: File) => void
}

type OwnPropsType = mapStateToPropsType & mapDispatchToPropsType


// @ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {

        let id = this.props.match.params.userId;
        if (!id) {
            this.props.userId
                ? id = this.props.userId
                : this.props.history.push('/login');
        }
        this.props.getUserProfile(id);
        this.props.getUserStatus(id)
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {

        let id = this.props.match.params.userId;
        if (id !== prevProps.match.params.userId) {
            if (!id) {
                this.props.userId
                    ? id = this.props.userId
                    : this.props.history.push('/login');
            }
            this.props.getUserProfile(id);
            this.props.getUserStatus(id)
        }
    }


    render() {
        return (
            <Profile {...this.props}
                     userId={this.props.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     isOwner={!this.props.match.params.userId}
                     updatePhoto={updatePhoto}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    userId: state.auth.id
}) as mapStateToPropsType;


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updatePhoto}),
    withRouter
)(ProfileContainer)

