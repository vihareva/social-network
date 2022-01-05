import React from 'react';

import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
export const Login = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, setError, formState: {errors}} = useForm<FormDataType>({mode: 'onBlur'});
    const isAuth = useSelector<AppStateType, boolean>(st => st.auth.isAuth);
    const appError = useSelector<AppStateType, string | null>(st => st.app.error)

    const onSubmit = (data: FormDataType) => {
        const {email, password, rememberMe} = data
        dispatch(login(email, password, rememberMe));
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <TextField label="Email"
                               margin="normal"
                               {...register('email', {
                                   required: 'required',
                                   pattern: {
                                       message: 'invalid email',
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                                   }
                               })}
                    />
                    {errors?.email &&
                    <div style={{color: 'red'}}>{errors?.email?.message || 'error'}</div>}

                    <TextField type="password" label="Password"
                               margin="normal"
                               {...register('password', {
                                   required: 'required',
                                   minLength: {
                                       value: 4,
                                       message: 'min 4 symbols'
                                   }
                               })}
                    />
                    {errors?.password &&
                    <div style={{color: 'red'}}>{errors?.password?.message || 'error'}</div>}

                    <FormControlLabel label={'Remember me'} control={
                        <Checkbox    {...register('rememberMe')}
                        />}
                    />
                    {appError && <div>{appError} </div>}
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </form>
        </Grid>
    </Grid>
}
