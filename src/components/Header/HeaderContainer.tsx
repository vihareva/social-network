import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {authDataType, setAuthUserData} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type mapStateToPropsType={
    isAuth:boolean
    login: null|string
}
type mapDispatchToPropsType={
    setAuthUserData: (data:authDataType)=>void
}

export type HeaderContainerType=mapStateToPropsType&mapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        //Is current user authorized
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(response.data.data);
                }
            });
    }

    render() {
        return <Header {...this.props} />
    }
}


const mapStateToProps = (state: AppStateType):mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);