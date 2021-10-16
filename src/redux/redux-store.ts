import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./auth-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk"

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const appStore = createStore(rootReducer,applyMiddleware(thunkMiddleware));
