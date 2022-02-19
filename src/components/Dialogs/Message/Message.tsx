import React from 'react';
import s from './../Dialogs.module.css';
import cs from "../../../assets/Common.module.css";

type MessageType={
    message: string
    userId: string
}

const Message = (props:MessageType ) => {
    return <div className={`${cs.container} ${s.messageContainer}`}>{props.message}</div>
}

export default Message;