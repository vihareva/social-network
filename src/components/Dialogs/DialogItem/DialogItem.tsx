import React from 'react';
import s from './../Dialogs.module.css';


type DialogItemType = {
    name: string
    id: string
    changeUser: (id: string)=>void
}
const DialogItem = (props: DialogItemType) => {

    return <div className={s.dialog + ' ' + s.active}>
        <div onClick={()=>props.changeUser(props.id)}>{props.name}</div>
    </div>
}


export default DialogItem;