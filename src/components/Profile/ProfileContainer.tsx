import React from 'react';
import Profile from "./Profile";
import  axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type PathParamsType={
    userId: number
}

type mapStateToPropsType={
    profile: ProfileType|null
}
type mapDispatchToPropsType={
    setUserProfile:(profile:ProfileType)=>void
}

type OwnPropsType=mapStateToPropsType&mapDispatchToPropsType

// @ts-ignore
type PropsType=RouteComponentProps<PathParamsType>&OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state:AppStateType):mapStateToPropsType => ({
    profile: state.profilePage.profile
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);