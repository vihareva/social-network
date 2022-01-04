import React from 'react';

import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import { useForm } from 'react-hook-form';

type FormDataType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataType>({mode:'onBlur'});
    const onSubmit = (data:FormDataType) =>{
        console.log(data);
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <TextField label="Email"
                               margin="normal"
                        {...register('email',{
                            required:'required',
                            pattern: {
                                message:'invalid email',
                                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                            }
                        })}
                    />
                    {errors?.email &&
                    <div style={{color: 'red'}}>{errors?.email?.message || 'error'}</div>}

                    <TextField type="password" label="Password"
                               margin="normal"
                        {...register('password',{
                            required: 'required',
                            minLength:{
                                value:4,
                                message:'min 4 symbols'
                            }
                        })}
                    />
                    {errors?.password &&
                    <div style={{color: 'red'}}>{errors?.password?.message || 'error'}</div>}

                    <FormControlLabel label={'Remember me'} control={
                        <Checkbox    {...register('rememberMe')}
                        />}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </form>
    </Grid>
</Grid>
}
