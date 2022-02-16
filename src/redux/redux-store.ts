import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer, {AuthActionsType} from "./auth-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {ProfileActionType, profileReducer} from "./profile-reducer";
import usersReducer, {UsersActionsType} from "./users-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {AppActionsType, appReducer} from "./app-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export type AllActionsType = AuthActionsType | AppActionsType | ProfileActionType |UsersActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AllActionsType>


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const appStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
