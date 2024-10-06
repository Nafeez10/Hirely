import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db, } from "../config/firebase.config";
import { RootState } from "../store/store";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

type userInfoType = {
    displayName:string | null,
    email:string | null,
    emailVerified:boolean,
    isAnonymous:boolean,
    phoneNumber:string | null,
    photoURL:string | null,
    uid:string,
    userProfession?:string
}

type initialStateType = {
    user:userInfoType | null,
    userProfession:null | string,
    loading:'idle'|'loading'|'fulfilled'|'rejected',
    error:string
}

const initialState:initialStateType = {
    user:null,
    userProfession:null,
    loading:'idle',
    error:''
}

export type updateUserProfileActionPayloadType = {
    userUid:string;
    updatedDisplayName:string;
    userEmail:string;
    userProfession:string
}

export const updateUserProfileAction = createAsyncThunk("user/updateUserProfile",
    async (payload:updateUserProfileActionPayloadType) =>{
        
        const updatedName = payload.updatedDisplayName;
        const userEmail = payload.userEmail;
        const userProfession = payload.userProfession;

        const userDocRef = doc(db,"users",payload.userUid);
        const userEmailDocRef = doc(db,"usersEmail",userEmail);

        await updateDoc(userDocRef,{
            "userInfo.displayName":updatedName,
            "userInfo.userProfession":userProfession
        })
        await updateDoc(userEmailDocRef,{
            userProfession
        })

        const getUserProfession = await getDoc(userEmailDocRef);

        if( getUserProfession.exists()){

            const returnData:string = getUserProfession.data().userProfession;

            return returnData;
        }

    }
)

type credentialsPayloadType = {
    user:userInfoType,
    providerId:string|null;
}

export const storeUserCredentials = createAsyncThunk("user/storeUserCredentials",
    async (payload:credentialsPayloadType)=>{
        
        const userInformation = payload.user;
        const userUid = payload.user.uid!;
        const userEmail = payload.user.email!;
        const providerId = payload.providerId;

        const userDocRef = doc(db,"users",userUid);

        const checkUserExistInfo = await getDoc(userDocRef);

        if(!checkUserExistInfo.exists()){
            const uploadUserDocRef = doc(db,"users",userUid);

            const uploadUserEmailDocRef = doc(db,"usersEmail",userEmail);

            type uploadUserInfoType = {
                userInfo:userInfoType
            }

            const uploadUserInfoData:uploadUserInfoType = {
                userInfo:{
                    uid: payload.user.uid!,
                    displayName: payload.user.displayName!,
                    email: payload.user.email!,
                    emailVerified: payload.user.emailVerified!,
                    isAnonymous: payload.user.isAnonymous!,
                    phoneNumber: payload.user.phoneNumber!,
                    photoURL: payload.user.photoURL!,
                }
            }

            const uploadUserEmailAndProviderId = {
                providerId
            }

            await setDoc(uploadUserDocRef,uploadUserInfoData);

            await setDoc(uploadUserEmailDocRef,uploadUserEmailAndProviderId);
            
        } 

        return userInformation;
    }
)

type signUpPayloadType = {
    signUpEmail:string,
    signUpPassword:string
}

export const userSignUpAction = createAsyncThunk("user/userSignUpAction",
    async (payload:signUpPayloadType)=>{
        const signUpEmail = payload.signUpEmail;
        const signUpPassword = payload.signUpPassword;

        const response = await createUserWithEmailAndPassword(auth,signUpEmail,signUpPassword);

        await sendEmailVerification(response.user);

        return response;
    }
)

type singInArg = {
    email:string,
    password:string
}

export const signInUserWithEmailAction = createAsyncThunk('user/signInWithEmailAction', async (signInInfo:singInArg)=>{
    const { email, password } = signInInfo;

    const user = await signInWithEmailAndPassword(auth,email,password);
    
    const userInformation = user.user;
    return userInformation
})

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        storeUserDetails(state,action){
            state.user = action.payload
            

        },
        storeUserProfession(state,action){
            state.userProfession = action.payload;
        },
        deleteUserDetails(state){
            state.user = null
            
        }

    },
    extraReducers(builder) {
        builder
            .addCase( signInUserWithEmailAction.pending, (state)=>{
                state.loading = 'loading'
            })
            .addCase( signInUserWithEmailAction.fulfilled, (state,action:PayloadAction<userInfoType | null>)=>{
                state.loading = 'fulfilled'
                state.user = action.payload
                state.error = '';
            })
            .addCase(signInUserWithEmailAction.rejected,(state)=>{
                state.loading = 'rejected';
                state.error = "Something Went Wrong!";
            })
            .addCase(storeUserCredentials.fulfilled, (state,action)=>{
                state.user = action.payload;
            })
    },
})

export const getUserError = (state:RootState) => state.user.error; 
export const getUserDetails = (state:RootState) => state.user.user;
export const getUserLoading = (state:RootState) => state.user.loading;
export const getUserDisplayName = (state:RootState) => state.user.user?.displayName;
export const getUserEmail = (state:RootState) => state.user.user?.email;
export const getUserEmailVerifiedStatus = (state:RootState) => state.user.user?.emailVerified;
export const getUserPhotoURL = (state:RootState) => state.user.user?.photoURL;
export const getUserUid = (state:RootState) => state.user.user?.uid;
export const getUserPhoneNumber = (state:RootState) => state.user.user?.phoneNumber;
export const getUserProfession = (state:RootState) => state.user.userProfession;


export const { storeUserDetails, deleteUserDetails, storeUserProfession } = userSlice.actions;

export default userSlice.reducer;