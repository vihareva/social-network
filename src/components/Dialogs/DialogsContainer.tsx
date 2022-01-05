import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {
    messagesPageType,
    sendMessageActionCreator,
    updateNewMessageTextActionCreator
} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type mapStateToPropsType={
    dialogsPage: messagesPageType

}
type mapDispatchToPropsType={
    sendMessage: () =>void
    updateNewMessageBody: (body:string) =>void
}
export type DialogsPropsType=mapStateToPropsType&mapDispatchToPropsType

let mapStateToProps = (state: AppStateType):mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch:Dispatch):mapDispatchToPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageActionCreator());
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageTextActionCreator(body));
        }
    }
}


export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);