import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
    actionTypes,
    messagesPageType,
    sendMessageActionCreator, updateNewMessageTextActionCreator,
    updateNewPostTextActionCreator
} from "../../redux/state";


type DialogsPropsType = {
    state: messagesPageType
    dispatch: (action: actionTypes) => void
}
const Dialogs = (props: DialogsPropsType) => {
    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageTextActionCreator(e.currentTarget.value))
    }
    return (
        <div className={s.dialogs}>2
            <div className={s.dialogsItems}>
                {props.state.dialogsData.map(d => <DialogItem name={d.name} id={d.id}/>)}
            </div>
            <div className={s.messages}>
                <div>{props.state.messagesData.map(m => <Message message={m.message}/>)}</div>
                <div>
                    <div>
                   <textarea value={props.state.newMessageText}
                       placeholder='enter your message'
                       onChange={newTextChangeHandler}>
               </textarea>
                    </div>
                    <div>
                        <button onClick={() => props.dispatch(sendMessageActionCreator())}> send</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dialogs;