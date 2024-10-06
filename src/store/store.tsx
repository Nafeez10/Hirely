import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../storeSlices/userSlice";
import userPostsSlice from "../storeSlices/userPostsSlice";
import themeSlice from "../storeSlices/themeSlice";
import tempCredentialSlice from "../storeSlices/tempCredentialSlice";

export const store = configureStore({
    reducer:{
        user:userSlice,
        userPostsData:userPostsSlice,
        theme:themeSlice,
        tempCredential:tempCredentialSlice
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/userDetails','userPosts/postUserPostData'],
                ignoredActionPaths: ['meta.arg', 'meta.arg.sharedData.image','payload.sharedData.image','payload'],
                ignoredPaths: ['user.user',]
            },
        })
})

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;