import axios, {AxiosResponse} from "axios";
import {FormDataType} from "../components/Login/Login";
import {ProfileDescriptionFormDataType} from "../components/Profile/ProfileInfo/ProfileDescriptionForm";


const baseURL = `https://social-network.samuraijs.com/api/1.0/`

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "b2cbf0c8-a18f-4c4c-a855-cbb200160c11"
    }
});


export const usersAPI = {
    getUsers(currentPageNumber: number, pageSize: number) {
        return instance.get<any>(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<any>(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<any>(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: number) {
        return instance.get<any>(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get<any>(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<any>(`/profile/status`, {status})
    },
    updatePhoto(file: File) {
        const formData = new FormData();

        formData.append('image', file);
        return instance.put<any>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfileDescription(data: ProfileDescriptionFormDataType) {
        return instance.put<any>(`/profile`, data)
    }
}
export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthMeTypeResponse>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        //return instance.post<FormDataType, AxiosResponse<ResponseType<{ userId: number }>>>(`auth/login`, {email, password, rememberMe,captcha})
        return instance.post<any>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
    },
    getCaptchaUrl() {
        return instance.get<{ url: string }>(`security/get-captcha-url`)
    },
}

type AuthMeTypeResponse = { id: number, email: string, login: string }

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}