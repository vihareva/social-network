import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {messagesPageType} from "../../redux/state";


type DialogsPropsType={
    state: messagesPageType
}
const Dialogs = (props: DialogsPropsType) => {

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.state.dialogsData.map(d=><DialogItem name={d.name} id={d.id}/>)}

            </div>
            <div className={s.messages}>
                {props.state.messagesData.map(m=><Message message={m.message}/>)}
            </div>
        </div>
    )
}

export default Dialogs;