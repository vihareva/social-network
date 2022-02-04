import {ContactsType, ProfileType, updateProfileDescription} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {
    Checkbox,
    createTheme,
    FormControlLabel,
    FormGroup,
    TextField,
    ThemeProvider
} from "@mui/material";
import React from "react";
import cs from "../../../assets/Common.module.css";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";


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
    const theme = createTheme({
        typography: {
            fontFamily: `"Montserrat",  sans-serif`,
            fontWeightRegular: 500,
        },
        palette: {
            primary: {
                main: '#104f9e'
            }
        }
    })
    const onSubmit = (data: ProfileDescriptionFormDataType) => {
        dispatch(updateProfileDescription(data, userId));
        props.switchOffEditMode()
    }
    return   <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <FormControlLabel label={'lookingForAJob'} control={
                            <Checkbox   icon={<CircleUnchecked/>}
                                        checkedIcon={<CircleCheckedFilled/>}
                                        sx={{
                                            color: "#104f9e",
                                            '&.Mui-checked': {
                                                color: "#104f9e",
                                            },
                                            borderRadius: '50%',
                                        }}    {...register('lookingForAJob')}
                            />}
                        />
                        <TextField label="lookingForAJobDescription"
                                   margin="normal" variant="standard"
                                   {...register('lookingForAJobDescription')}
                        />
                        <TextField label="fullName"
                                   margin="normal" variant="standard"
                                   {...register('fullName')}
                        />

                        <TextField label="aboutMe"
                                   margin="normal" variant="standard"
                                   {...register('aboutMe')}
                        />

                        {Object.keys(profile.contacts).map(contact => {
                            const contactName = 'contacts.' + contact as "contacts.github" | "contacts.vk" | "contacts.facebook" | "contacts.instagram" | "contacts.twitter" | "contacts.website" | "contacts.youtube" | "contacts.mainLink"
                            return <TextField label={contact}
                                              margin="normal" variant="standard"
                                              {...register(contactName)}
                            />
                        })}
                        {/*<Button type={'submit'} variant={'contained'} color={'primary'}>*/}
                        {/*    edit*/}
                        {/*</Button>*/}
                        <div style={{display:"flex", justifyContent:"flex-start"}}>
                            <button type={'submit'} className={`${cs.button}`}>
                                Edit
                            </button>
                        </div>

                    </FormGroup>
                </form>

    </ThemeProvider>
}
