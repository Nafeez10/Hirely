import { createSlice, createAsyncThunk, createEntityAdapter, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { storage, db } from "../config/firebase.config";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { RootState } from "../store/store";
import toast from "react-hot-toast";


export type commentsType = {
    uid:string,
    commentData:string
}

export type userPostType = {
    userDetails: {
        name: string | null | undefined;
        email: string | null | undefined;
        userPhotoUrl: string | null | undefined ;
        uid:string
    };
    sharedData: {
        type: "image" | "youtubeVideo" | "article";
        image?:File | string;
        imageFormat?:string;
        videoURL?:string;
        description: any;
        date: number;
        likes: number;
        comments: commentsType[];
        totalComments: number;
        postNo:number
    };
}

type initialStateType =  EntityState<userPostType, number> & {
    loadingStatus: 'idle' | 'pending' | 'uploaded' | 'fulfilled' | 'rejected' ;
    loadingPercentage: number ;
    isError: string;
}

export const postUserPostData = createAsyncThunk("userPosts/postUserPostData",
    async (payload:userPostType, { dispatch })=>{
        
        const userUid = payload.userDetails.uid;
        const shareContentType = payload.sharedData.type;
        const userPostNo = payload.sharedData.postNo;

        if(shareContentType == 'image'){
            const userPostImageExt = payload.sharedData.imageFormat;
            const userPostImageFile = payload.sharedData.image;
            
            const storageRef = ref(storage, `images/${userUid}/post-${userPostNo}.${userPostImageExt}`);

            const uploadUserPost = uploadBytesResumable(storageRef,userPostImageFile as File);

            dispatch(setLoadingStatus('pending') );

            uploadUserPost.on("state_changed",
                (snapshot) =>{
                    const downloadPerncentage = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100 ;
                    
                    dispatch( setLoadingPercent(downloadPerncentage) );
                },
                ()=>{
                    dispatch(setLoadingStatus('rejected'))
                    
                    toast("Error uploading image",
                        {
                          icon: '😔',
                          style: {
                            borderRadius: '10px',
                            background: '#ffc6c6',
                            color: '#a21212',
                          },
                        }
                    );
                },
                async ()=>{

                    dispatch(setLoadingStatus('uploaded'));

                    const downloadImageUrl = await getDownloadURL(uploadUserPost.snapshot.ref)
                    
                    const payloadToDB = {
                        userDetails:payload.userDetails,
                        sharedData:{
                            ...payload.sharedData,
                            image:downloadImageUrl
                        }
                    }

                    const userPostData = {
                        userPosts:arrayUnion(payloadToDB)
                    }
                    
                    try{
                        const collectionRef = doc(db,"users",userUid);

                        await updateDoc( collectionRef, userPostData ).catch(()=>{
                            
                            toast("Error occured while saving data",
                                {
                                  icon: '😔',
                                  style: {
                                    borderRadius: '10px',
                                    background: '#ffc6c6',
                                    color: '#a21212',
                                  },
                                }
                            );

                            dispatch(setLoadingStatus('rejected'));

                        });

                        dispatch(setLoadingStatus('fulfilled'));
                    }catch{
                        toast("Error occured while saving data",
                            {
                              icon: '😔',
                              style: {
                                borderRadius: '10px',
                                background: '#ffc6c6',
                                color: '#a21212',
                              },
                            }
                        );

                        dispatch(setLoadingStatus('rejected'));

                    }finally{
                        const getuserPayload = {
                            uid:userUid!
                        }
    
                        try {
                            await dispatch(getUserPostsData(getuserPayload))
                            
                        }catch{
                            toast("Unable to retreive data,Please reload the page",
                                {
                                  icon: '😔',
                                  style: {
                                    borderRadius: '10px',
                                    background: '#ffc6c6',
                                    color: '#a21212',
                                  },
                                }
                            );
                        }
                    }
                }
            )
        }

        if(shareContentType == 'youtubeVideo'){
            dispatch(setLoadingStatus('pending'));

            // i have just kept the percent to 50 because we cant track a non-file(not an image) type data percentage being uploaded
            // so to give an illusion of seeing the percentage i gave it.
            dispatch(setLoadingPercent(70));

            try{
                const docRef = doc(db,"users",userUid);

                const userPosts = {
                    userPosts:arrayUnion(payload)
                }

                await updateDoc(docRef,userPosts);

                dispatch(setLoadingStatus('fulfilled'));

            }catch{
                toast("Error occured while saving data",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                    }
                );

                dispatch(setLoadingStatus('rejected'));
                
            }finally{
                const getuserPayload = {
                    uid:userUid!
                }
    
                try{
                    await dispatch(getUserPostsData(getuserPayload))
                }catch{
                    toast("Unable to retreive data,Please reload the page",
                        {
                          icon: '😔',
                          style: {
                            borderRadius: '10px',
                            background: '#ffc6c6',
                            color: '#a21212',
                          },
                        }
                    );
                }
            }
        }
        
        if(shareContentType == 'article'){

            dispatch(setLoadingStatus('pending'));

            // i have just kept the percent to 80 because we cant track a non-file(not an image) type data percentage being uploaded
            // so to give an illusion of seeing the percentage i gave it.
            dispatch(setLoadingPercent(80));

            try{
                const docRef = doc(db,"users",userUid);

                const userPosts = {
                    userPosts:arrayUnion(payload)
                }
                await updateDoc(docRef,userPosts)
                dispatch(setLoadingStatus('fulfilled'));
            }catch{
                toast("Error occured while saving data",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                    }
                );

                dispatch(setLoadingStatus('rejected'));
                
            }finally{
                const getuserPayload = {
                    uid:userUid!
                }
    
                try{
                    await dispatch(getUserPostsData(getuserPayload))
                }catch{
                    toast("Unable to retreive data,Please reload the page",
                        {
                          icon: '😔',
                          style: {
                            borderRadius: '10px',
                            background: '#ffc6c6',
                            color: '#a21212',
                          },
                        }
                    );
                }
            }
        }
    }
)

export const deletePostData = createAsyncThunk("userPosts/deletePostData",
    async (payload:userPostType, { dispatch }) =>{

        const userUid = payload.userDetails.uid;
        const userPostNo = payload.sharedData.postNo;
        const userPostImageExt = payload.sharedData.imageFormat;
        const postType = payload.sharedData.type;

        const userDocRefernece = doc(db,"users",userUid);
        
        const postToDelete = {
            userPosts: arrayRemove(payload)
        }

        // im throwing this error in a catch block because just in case the toast
        // unable to catch the error.
        const deleteHandeler = async () =>{
            try{
                await updateDoc(userDocRefernece,postToDelete);

                if(postType == 'image'){
                    const deleteImageRef = ref(storage,`images/${userUid}/post-${userPostNo}.${userPostImageExt}`);

                    await deleteObject(deleteImageRef);
                }
            }catch{
                throw new Error('cannot delete post retry again!');
            }
        }
 
        await toast.promise(
            deleteHandeler(),
            {
               loading: 'Deleting Post...',
               success: <b>Post Deleted!</b>,
               error: <b>Could not delete the post, try again.</b>,
            }
        );
        
        const getUserPayload = {
            uid:userUid!
        }

        await dispatch(getUserPostsData(getUserPayload));
    }
)

type getUserPostsPayloadType = {
    uid:string;
}

export const getUserPostsData = createAsyncThunk("userPosts/getUserPostsData",
    async (payload:getUserPostsPayloadType)=>{

        const userUid = payload.uid;
        const docRef = doc(db,"users",userUid);
        
        const getPosts = await getDoc(docRef);

        if(getPosts.exists()){
            const userPosts = getPosts.data();
            return userPosts.userPosts;
        }
    }
)

const userPostsAdapter = createEntityAdapter({
    selectId: (entity:userPostType) => entity.sharedData.postNo,
    sortComparer:(a,b) => b.sharedData.postNo - a.sharedData.postNo
})

const initialState:initialStateType = userPostsAdapter.getInitialState({
    loadingStatus:'idle',
    loadingPercentage:0,
    isError:''
})

const userPostsSlice = createSlice({
    name:'userPosts',
    initialState,
    reducers:{
        clearAllDataToSignOut(state){
            userPostsAdapter.removeAll(state)
        },
        setLoadingStatus(state,action:PayloadAction<'idle' | 'pending' | 'uploaded' | 'fulfilled' | 'rejected'>){
            state.loadingStatus = action.payload;
        },
        setLoadingPercent(state,action){
            state.loadingPercentage = action.payload
        }
    },
    extraReducers(builder){
        builder
            .addCase(getUserPostsData.fulfilled, (state, action)=>{
                if(action.payload){
                    
                    userPostsAdapter.setAll(state,action.payload)
                    
                }
            })
            .addCase(getUserPostsData.rejected,(state)=>{
                state.isError = "Error Occured while getting Data"
                toast("Error Occured while retrieving Data",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                    }
                );
            })
            .addCase(postUserPostData.rejected,()=>{
                toast("Something went wrong, check your connection and post again",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                    }
                );
            })
    }
})

export const {
    selectAll,
    selectById,
    selectTotal,
    selectEntities : selectAllUserPosts,
    selectIds
} = userPostsAdapter.getSelectors( (state:RootState) => state.userPostsData );

export const getPostLoadingPercentage = (state:RootState) => state.userPostsData.loadingPercentage;
export const getPostLoadingStatus = (state:RootState) => state.userPostsData.loadingStatus;

export const { clearAllDataToSignOut, setLoadingPercent, setLoadingStatus } = userPostsSlice.actions;

export default userPostsSlice.reducer;