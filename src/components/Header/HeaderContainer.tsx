import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {authDataType, getAuthUserData, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type mapStateToPropsType = {
    isAuth: boolean
    login: null | string
}
type mapDispatchToPropsType = {
    logout: () => void
}

export type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {
    render() {
        return <Header {...this.props} />
    }
}


const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, { logout})(HeaderContainer);