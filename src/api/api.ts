import axios from "axios";

const baseURL=`https://social-network.samuraijs.com/api/1.0/`

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "b2cbf0c8-a18f-4c4c-a855-cbb200160c11"
    }
});


export const usersAPI={
    getUsers(currentPageNumber: number,pageSize: number){
       return  instance.get<any>(baseURL+`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response=>response.data)
    }
}