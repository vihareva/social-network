import React, {useEffect} from 'react';
import {createTheme, FormControl, MenuItem, Select, TextField, ThemeProvider} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {FilterUsersDataType} from "../../redux/users-reducer";
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

    const {register, handleSubmit, reset, control,} = useForm<FilterFormUsersDataType>({
        defaultValues: {term: props.filter.term, friend: String(props.filter.friend) as FriendType},
        mode: 'onSubmit'
    });

    useEffect(() => {
        reset({term: props.filter.term, friend: String(props.filter.friend) as FriendType});
    }, [props.filter])

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
            fontWeightRegular: 600,
            body1: {
                color: '#4c4c4c'
            },
            h4:{
                color: "red"
            },
        },
        palette: {
            primary: {
                main: '#104f9e',
                contrastText: '#6d6b6b'
            }
        }
    })

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ThemeProvider theme={theme}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <FormControl style={{width: '64%'}}>
                        <Controller
                            control={control}
                            name="friend"
                            render={({ field: { onChange, value } }) => (
                                <Select value={value} onChange={onChange} >
                                    <MenuItem value={'true'}>Friends</MenuItem>
                                    <MenuItem value={'false'}>Not followed users</MenuItem>
                                    <MenuItem value={'null'}>All users</MenuItem>
                                </Select>

                            )}
                        />
                    </FormControl>
                </div>
                <div style={{display:"flex", justifyContent:"center"}} >
                    <TextField style={{width: '50%'}}
                    margin="normal" variant="standard"
                    {...register('term')}
                />
                    <button type={'submit'} style={{marginTop: '10px', marginLeft: '10px'}} className={`${cs.button}`}>
                        Find
                    </button>
                </div>
            </ThemeProvider>
        </form>
    </div>
})