import React, {useEffect} from 'react';
import {createTheme, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {FilterUsersDataType, UserType} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import cs from "../../assets/Common.module.css";

type FilterUsersPropsType = {
    onFilterForm: (filter: FilterUsersDataType) => void
    filter: FilterUsersDataType
}
type FriendType = 'null' | 'true' | 'false'

type FilterFormUsersDataType = {
    term: string,
    friend: FriendType
}

export const FilterUsers = React.memo((props: FilterUsersPropsType) => {
    console.log(props.filter)

    const {register, handleSubmit, reset, control} = useForm<FilterFormUsersDataType>({
        defaultValues: {term: props.filter.term, friend: String(props.filter.friend) as FriendType},
        mode: 'onSubmit'
    });

    useEffect(() => {
        reset({term: props.filter.term, friend: String(props.filter.friend) as FriendType});
    }, [props.filter])

    //const dispatch = useDispatch();
    // const filter = useSelector<AppStateType, FilterUsersDataType>(st => st.usersPage.filter);

    const onSubmit = (data: FilterFormUsersDataType) => {
        const filterValues = {
            term: data.term,
            friend: data.friend === 'null' ? null : data.friend === 'true' ? true : false
        }

        props.onFilterForm(filterValues)
    }

    const theme = createTheme({
        typography: {
            fontFamily: `"Montserrat",  sans-serif`,
            fontWeightRegular: 500,
        }
    })

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ThemeProvider theme={theme}>
                <FormControl fullWidth>
                    {/*<InputLabel id="friend-select-label">Friend</InputLabel>*/}
                    {/*/!*<Controller name={"friend"}*!/*/}
                    {/*/!*            control={control}*!/*/}
                    {/*/!*    render={*!/*/}
                    {/*/!*        ()=>{ return*!/*/}
                    {/*<Select  label="friend"*/}
                    {/*        labelId="friend-select-label"*/}
                    {/*         {...register('friend')}*/}
                    {/*>*/}
                    {/*    <MenuItem value={'true'}>Friends</MenuItem>*/}
                    {/*    <MenuItem value={'false'}>Not followed users</MenuItem>*/}
                    {/*    <MenuItem value={'null'}>All users</MenuItem>*/}
                    {/*</Select>*/}
                    {/*/!*}}*!/*/}
                    {/*/>*/}
                    <select {...register('friend')}>
                            <option  value={'true'}>Friends</option>
                            <option  value={'false'}>Not followed users</option>
                            <option  value={'null'}>All users</option>
                    </select>
                </FormControl>
                <TextField
                    margin="normal" variant="standard"
                    {...register('term')}
                />

            </ThemeProvider>
            <button type={'submit'} className={`${cs.button}`}>
                Find
            </button>
        </form>
    </div>
})