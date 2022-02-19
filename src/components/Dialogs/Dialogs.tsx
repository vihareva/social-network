import React, {ChangeEvent, useState} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import cs from "../../assets/Common.module.css";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const Dialogs = (props: DialogsPropsType) => {

    let id = useSelector<AppStateType, string>(st => st.dialogsPage.dialogsData[0].id)

    let [activeUserId, setActiveUserId] = useState(id)
    let [message, setMessage] = useState('')

    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const changeUser = (id: string) => {
        setActiveUserId(id)
    }
    const sendMessage = () => {
        props.sendMessage(message, activeUserId)
        setMessage('')
    }

    return (
        <div>
            <div className={`${cs.container} ${s.usersContainer}`}>
                {props.dialogsPage.dialogsData.map(d => <DialogItem key={d.id} activeUserId={activeUserId} changeUser={changeUser}
                                                                    name={d.name} id={d.id}/>)}
            </div>

            <div className={s.messages}>
                <div>{props.dialogsPage.messagesData[activeUserId]
                    .map(m => <Message key={m.id} userId={activeUserId} message={m.message}/>)}
                </div>

                <div className={`${cs.container} ${s.addMessageContainer}`}>
                   <textarea className={`${cs.input} ${s.textarea}`} value={message}
                             placeholder='Enter your message'
                             onChange={newTextChangeHandler}/>
                    <div>
                        <button className={`${s.button} ${cs.button}`}
                                onClick={sendMessage}> Send
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;