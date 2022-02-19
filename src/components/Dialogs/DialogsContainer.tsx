import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {messagesPageType, sendMessageActionCreator} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type mapStateToPropsType={
    dialogsPage: messagesPageType

}
type mapDispatchToPropsType={
    sendMessage: (message: string, userId: string) =>void
}
export type DialogsPropsType=mapStateToPropsType&mapDispatchToPropsType

let mapStateToProps = (state: AppStateType):mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch:Dispatch):mapDispatchToPropsType => {
    return {
        sendMessage: (message: string, userId: string) => {
            dispatch(sendMessageActionCreator(message,userId));
        }
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps))(Dialogs);