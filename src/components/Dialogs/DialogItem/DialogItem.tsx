import React, {useState} from 'react';
import s from './../Dialogs.module.css';
import userPhoto from "../../../assets/userPhoto.jpg";
import cs from "../../../assets/Common.module.css";


type DialogItemType = {
    name: string
    id: string
    changeUser: (id: string)=>void
    activeUserId: string
}
const DialogItem = (props: DialogItemType) => {


    return <div className={s.userContainer}>
        <div onClick={()=>props.changeUser(props.id)}>
            <img className={s.userPhoto} src={userPhoto}/>
        </div>
        <div className={props.id===props.activeUserId? `${s.name} ${s.active}`:`${s.name}` }>
            {props.name}
        </div>
    </div>
}


export default DialogItem;