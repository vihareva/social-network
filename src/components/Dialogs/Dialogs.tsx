import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import cs from "../../assets/Common.module.css";
import img from '../../assets/zzzz.jpg'

const Dialogs = (props: DialogsPropsType) => {
    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(e.currentTarget.value)
    }

    return (
        <div className={s.dialogs}>
            <img src={img} />
            <div className={s.dialogsItems}>
                {props.dialogsPage.dialogsData.map(d => <DialogItem name={d.name} id={d.id}/>)}
            </div>
            <div className={s.messages}>
                <div>{props.dialogsPage.messagesData.map(m => <Message message={m.message}/>)}</div>
                <div>
                    <div>
                   <textarea value={props.dialogsPage.newMessageText}
                       placeholder='enter your message'
                       onChange={newTextChangeHandler}>
               </textarea>
                    </div>
                    <div>
                        <button  className={`${s.button} ${cs.button}`}  onClick={() => props.sendMessage()}> send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;