import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import authRequestSender from './requests'

interface Auth {
        user: {username: string, avatar: string, email: string} | null;
        loggedIn: boolean;
        errorMessage: string | null;
}

interface AuthCtx {
    auth: Auth;
    getLoggedIn: () => Promise<any>, 
    registerUser: (username: string, email: string, password: string, passwordVerify: string, avatar: string) => Promise<any>, 
    loginUser: (email: string, password: string) => Promise<any>, 
    logoutUser: () => Promise<any>
}
const AuthContext = createContext<AuthCtx>({} as AuthCtx);
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER"
}

function AuthContextProvider(props: {children: React.ReactNode}) {
    const [auth, setAuth] = useState<Auth>({
        user: null,
        loggedIn: false,
        errorMessage: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        getLoggedIn();
    }, []);

    const authReducer = (action : {type: any, payload: any}) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: null
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage
                })
            }
            default:
                return auth;
        }
    }

    const getLoggedIn = async function () {
        const response = await authRequestSender.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    const registerUser = async function(username: string, email: string, password: string, passwordVerify: string, avatar: string) {
        try{   
            const response = await authRequestSender.registerUser(username, email, password, passwordVerify, avatar);  
            if (response.status === 200) {
                const result = await response.json(); 
                console.log("Registered Sucessfully");
                navigate("/");
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: result.user,
                        loggedIn: true,
                        errorMessage: null
                    }
                })
            }
        } catch(error: any){
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    errorMessage: error.errorMessage
                }
            })
        }
    }

    const loginUser = async function(email: string, password: string) {
        try{
            const response = await authRequestSender.loginUser(email, password);
            if (response.status === 200) {
                const result = await response.json();
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: result.user,
                        loggedIn: true,
                        errorMessage: null
                    }
                })
                navigate("/");
            }
        } catch(error: any){
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    errorMessage: error.errorMessage
                }
            })
        }
    }

    const logoutUser = async function() {
        const response = await authRequestSender.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            navigate("/");
        }
    }

    return (
        <AuthContext.Provider value={
            {auth, getLoggedIn, registerUser, loginUser, logoutUser}
        }>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };