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
       return  instance.get<any>(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response=>response.data)
    },
    unfollow(userId: number){
        return instance.delete<any>(`follow/${userId}`)
            .then(response=>response.data)
    },
    follow(userId: number){
        return instance.post<any>(`follow/${userId}`)
            .then(response=>response.data)
    },
    getProfile(userId:number){
        return instance.get<any>(`profile/` + userId);
    },
    getStatus(userId: number){
        return instance.get<any>(`/profile/status/${userId}`)
    },
    updateStatus(status: string){
        return instance.put<any>(`/profile/status`, {status})
    }
}
export const authAPI = {
    me() {
        return instance.get<any>(`auth/me`)
    }
}

