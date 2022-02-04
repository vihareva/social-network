import React from 'react';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import {
    Checkbox,
    createTheme,
    FormControlLabel,
    ThemeProvider
} from "@mui/material";
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import cs from "../../assets/Common.module.css";
import s from './Login.module.css'


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captchaText: string | null
}

export const Login = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit,  formState: {errors}} = useForm<FormDataType>({mode: 'onBlur'});
    const isAuth = useSelector<AppStateType, boolean>(st => st.auth.isAuth);
    const captcha = useSelector<AppStateType, string | null>(st => st.auth.captcha);
    const appError = useSelector<AppStateType, string | null>(st => st.app.error)

    const onSubmit = (data: FormDataType) => {
        const {email, password, rememberMe, captchaText} = data
        dispatch(login(email, password, rememberMe, captchaText));
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    const theme = createTheme({
        typography: {
            fontFamily: `"Montserrat",  sans-serif`,
            fontWeightRegular: 500,
        }
    })
    return <div className={s.loginContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${cs.container} ${s.container}`}>
                <div style={{marginBottom: '25px'}}>
                    <div>To log in use my accout credentials:</div>
                    <div>viharevakatia@gmail.com</div>
                    <div>qwerty123</div>
                </div>
                <input className={`${cs.input}  ${s.input}`}
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

                <input className={`${cs.input}  ${s.input}`} type="password"
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
                <div style={{marginBottom: '25px'}} >
                    <ThemeProvider theme={theme}>
                        <FormControlLabel label={'Remember me'}
                                          control={
                                              <Checkbox
                                                  icon={<CircleUnchecked/>}
                                                  checkedIcon={<CircleCheckedFilled/>}
                                                  sx={{
                                                      color: "#104f9e",
                                                      '&.Mui-checked': {
                                                          color: "#104f9e",
                                                      },
                                                      borderRadius: '50%',
                                                  }}  {...register('rememberMe')}
                                              />
                                          }
                        />
                    </ThemeProvider>
                </div>

                {captcha && <div>
                    <img src={captcha} alt=""/>
                    <input className={`${cs.input}`}
                           {...register('captchaText', {
                               required: 'required'
                           })}
                    />
                </div>}
                    <button type={'submit'} className={`${cs.button}`}>
                        Login
                    </button>
                {appError && <div>{appError} </div>}
            </div>
        </form>
    </div>


}
