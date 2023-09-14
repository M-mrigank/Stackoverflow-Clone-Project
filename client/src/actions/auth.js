import * as api from "../api"
import {setCurrentUser} from "./currentUser"

export const signup=(authData, navigate)=>async (dispatch)=>{
    try{
        const {data}=await api.signUp(authData);
        dispatch({
            type:'AUTH',
            data
        });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        // console.log("hello enter here");
        navigate('/');
    }
    catch(error){
        console.log(error);
    }
}
export const login=(authData, navigate)=>async (dispatch)=>{
    try{
        // console.log("hello enter here");
        // console.log(authData);
        const {data}=await api.logIn(authData);
        console.log(data);
        dispatch({
            type:'AUTH',
            data
        })
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        // console.log("hello enter here");
        navigate('/');
    }
    catch(error){
        console.log(error);
    }
}