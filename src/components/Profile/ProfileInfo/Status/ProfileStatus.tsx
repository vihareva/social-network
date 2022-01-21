import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getUserStatus, updateUserStatus} from "../../../../redux/profile-reducer";
import s from "../ProfileInfo.module.css";
import {faPenNib} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import cs from '../../../../assets/Common.module.css'
type StatusType = {
    status: string
    isOwner: boolean
}

export const ProfileStatus = (props: StatusType) => {
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        dispatch(updateUserStatus(status))
    }
    const deactivateViewMode = () => {
        props.isOwner && setEditMode(true)
    }

    return <div>
        <span className={s.textHeader}>status :</span>
        {editMode && <input className={cs.input} onChange={onChange} autoFocus value={status}
                       onBlur={activateViewMode}/>}

        {!editMode && <span onDoubleClick={deactivateViewMode } className={s.desc}>
            {props.isOwner &&<span> <FontAwesomeIcon size={"1x"} icon={faPenNib}/>... </span>}
            <span>{status}</span>
            </span>}


    </div>
}