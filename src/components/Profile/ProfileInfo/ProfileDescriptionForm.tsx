import {ContactsType, ProfileType, updateProfileDescription} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import React from "react";


export type ProfileDescriptionFormDataType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    aboutMe: string
}

export type ProfileDescriptionFormPropsType = {
    profile: ProfileType
    userId: number
    // updateProfileDescription:(data: ProfileDescriptionFormDataType)=>void
    switchOffEditMode: () => void
}

export const ProfileDescriptionForm = ({profile, userId, ...props}: ProfileDescriptionFormPropsType) => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm<ProfileDescriptionFormDataType>({
        defaultValues: {
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            contacts: profile.contacts
        },
        mode: 'onBlur'
    });

    const onSubmit = (data: ProfileDescriptionFormDataType) => {
        dispatch(updateProfileDescription(data, userId));
        props.switchOffEditMode()
    }
    return <>
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <FormControlLabel label={'lookingForAJob'} control={
                            <Checkbox    {...register('lookingForAJob')}
                            />}
                        />
                        <TextField label="lookingForAJobDescription"
                                   margin="normal"
                                   {...register('lookingForAJobDescription')}
                        />
                        <TextField label="fullName"
                                   margin="normal"
                                   {...register('fullName')}
                        />

                        <TextField label="aboutMe"
                                   margin="normal"
                                   {...register('aboutMe')}
                        />

                        {Object.keys(profile.contacts).map(contact => {
                            const contactName = 'contacts.' + contact as "contacts.github" | "contacts.vk" | "contacts.facebook" | "contacts.instagram" | "contacts.twitter" | "contacts.website" | "contacts.youtube" | "contacts.mainLink"
                            return <TextField label={contact}
                                              margin="normal"
                                              {...register(contactName)}
                            />
                        })}
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            edit
                        </Button>
                    </FormGroup>
                </form>
            </Grid>
        </Grid>
    </>


}
