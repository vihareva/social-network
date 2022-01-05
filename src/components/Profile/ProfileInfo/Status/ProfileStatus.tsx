import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getUserStatus, updateUserStatus} from "../../../../redux/profile-reducer";

type StatusType = {
    status: string
}

export const ProfileStatus = (props: StatusType) => {
    const dispatch=useDispatch()

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)



    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        dispatch(updateUserStatus(status))
    }

    return <>
        {editMode
            ? <div>
                <input onChange={onChange} autoFocus value={status} onBlur={activateViewMode}/>
            </div>
            : <div>
                <span onDoubleClick={() => setEditMode(true)}>{status}</span>
            </div>
        }
    </>
}