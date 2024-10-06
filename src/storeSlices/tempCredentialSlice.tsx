import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type initialStateType = {
    userEmail:string;
    userPassword:string;
}

const initialState : initialStateType = {
    userEmail:"",
    userPassword:""
}

const tempCredentialSlice = createSlice({
    name:"tempCredential",
    initialState,
    reducers:{
        storeTempCredential:(state,action:PayloadAction<initialStateType>)=>{
            state.userEmail = action.payload.userEmail;
            state.userPassword = action.payload.userPassword;
        },
        clearUserTempCredential:( state ) =>{
            state.userEmail = "";
            state.userPassword = ""
        }
    }
})

export const getTempCredentialUserEmail = (state:RootState) => state.tempCredential.userEmail;
export const getTempCredentialUserPassword = (state:RootState) => state.tempCredential.userPassword;

export const { storeTempCredential, clearUserTempCredential } = tempCredentialSlice.actions

export default tempCredentialSlice.reducer;