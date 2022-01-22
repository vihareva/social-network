import React, {ChangeEvent, useState} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import cs from "../../assets/Common.module.css";
import img from '../../assets/zzzz.jpg'
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const Dialogs = (props: DialogsPropsType) => {
    let id = useSelector<AppStateType, string>(st => st.dialogsPage.dialogsData[0].id)

    let [userId, setUserId] = useState(id)
    let [message, setMessage] = useState('')

    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const changeUser = (id: string) => {
        setUserId(id)
    }

    const sendMessage = () => {
        props.sendMessage(message, userId)
        setMessage('')
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.dialogsPage.dialogsData.map(d => <DialogItem changeUser={changeUser} name={d.name} id={d.id}/>)}
            </div>

            <div className={s.messages}>
                <div>{props.dialogsPage.messagesData[userId]
                    .map(m => <Message userId={userId} message={m.message}/>)}
                </div>
                <div>
                    <div>
                   <textarea value={message}
                             placeholder='enter your message'
                             onChange={newTextChangeHandler}>
               </textarea>
                    </div>
                    <div>
                        <button className={`${s.button} ${cs.button}`}
                                onClick={sendMessage}> send
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;