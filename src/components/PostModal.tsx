import { useState,MouseEvent, ChangeEvent } from "react";
import { cancelSvg, modalPicSvg, userSvg, youtubeSvg, modalMsgSvg, darkModalPicSvg } from "../assets/images";
import { useSelector, useDispatch } from "react-redux";
import { getUserDisplayName, getUserEmail, getUserUid } from "../storeSlices/userSlice";
import { getUserPhotoURL } from "../storeSlices/userSlice";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { DispatchType } from "../store/store";
import { userPostType, selectIds, postUserPostData } from "../storeSlices/userPostsSlice";
import { getTheme } from "../storeSlices/themeSlice";


type propsType = {
    showPostModal:boolean,
    setShowPostModal:React.Dispatch<React.SetStateAction<boolean>>
}

export type postMediaType = "image" | "youtubeVideo" | "article" | null;

const PostModal = ({showPostModal, setShowPostModal}:propsType) =>{

    const dispatch = useDispatch<DispatchType>();

    const userName = useSelector(getUserDisplayName);
    const userPhotoUrl = useSelector(getUserPhotoURL);
    const userEmail = useSelector(getUserEmail);
    const userUid = useSelector(getUserUid);
    const userPostsNos = useSelector(selectIds);
    const theme = useSelector(getTheme);

    const [ postCaptionInput, setPostCaptionInput ] = useState<string>("");
    const [ inputFileImage, setInputFileImage ] = useState<File | null>(null);
    const [ showVideoUrlInput, setShowVideoUrlInput ] = useState<boolean>(false);
    const [ videoURL, setVideoUrl ] = useState<string>("");
    const [ showVideoPlayerVideo, setShowVideoPlayerVideo ] = useState<string>('');
    const [ postMediaType, setPostMediaType ] = useState<postMediaType>(null);
    const [ showImageCont, setShowImageCont ] = useState<Boolean>(false);

    const postModalHandeler = (e:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>{
        // e.preventDefault();

        if(e.target !== e.currentTarget){
            return;
        }

        setShowPostModal(!showPostModal);
    }

    const postModalHandelerButton = () =>{
        setShowPostModal(!showPostModal);
    }

    const resetPostInputsAndCloseModal = () =>{
        setPostCaptionInput('');
        setInputFileImage(null);
        setShowVideoUrlInput(false);
        setVideoUrl('');
        setShowVideoPlayerVideo('');
        setPostMediaType(null);
        setShowImageCont(false);
    }
    
    const acceptedFormats = [
        {
            type:"image/jpeg",
            extension:'jpeg'
        },
        {
            type :"image/gif",
            extension:'gif'
        },
        {
            type:"image/png",
            extension:'png'
        },
        {
            type:"image/heif",
            extension:'heif'
        },
        {
            type:"image/jpg",
            extension:'jpg'
        }
    ];

    const checkFormatAcceptedForImage = (imageType:string) =>{
        const isValidImage = acceptedFormats.find( format => format.type == imageType )
        return isValidImage;
    }


    const inputFileHandeler = (e:ChangeEvent<HTMLInputElement>) =>{

        setShowImageCont(true);

        if(e.target.files == null || e.target.files == undefined ){
            return;
        }

        if(e.target.files[0] == null || e.target.files[0] == undefined ){
            return;
        }

        setPostMediaType('image');
        
        const imageType = e.target.files[0].type;

        const isValidImage = checkFormatAcceptedForImage(imageType)
        
        if(!isValidImage){
            toast('Only supports jpeg, gif, heif, jpg, png formats ', {
                icon: '⚠️',
            });
            return;
        }

        const inputImage: File = e.target.files[0];
        
        setInputFileImage(inputImage);
    }

    const clearInputImageHandeler = () =>{
        setPostMediaType(null);
        setShowImageCont(false);
    }

    const showVideoURLInputHandeler = () =>{
        if(showImageCont){
            toast(
                "Can only post video or image not both at the same time!",
                {
                  duration: 4000,
                }
            );
            return;
        }

        setPostMediaType('youtubeVideo');
        setShowVideoUrlInput(true);
    }

    const clearInputUrlHandeler = (e:MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setPostMediaType(null);
        setVideoUrl('')
        setShowVideoUrlInput(false);
        setShowVideoPlayerVideo('');
    }

    const getVideoHandeler = (e:MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        
        if(!ReactPlayer.canPlay(videoURL)){
            toast("Invalid Video URL! (only Youtube video links)",
                {
                  icon: '😔',
                  style: {
                    borderRadius: '10px',
                    background: '#ffc6c6',
                    color: '#a21212',
                  },
                }
            );

            setShowVideoPlayerVideo('');

            return;
        }

        setShowVideoPlayerVideo(videoURL);
    }

    const imageToastWarn = () =>{
        if( showVideoUrlInput){
            toast(
                "Can only post video or image not both at the same time!",
                {
                  duration: 4000,
                }
            );
        }
    }

    const fileInputClickHandeler = () =>{
        if(showVideoPlayerVideo){
            return;
        }

        setShowImageCont(true);
    }

    const imagePostHandeler = async () =>{
        if(inputFileImage == null){
            return;
        }

        const maxSize = 5000000 ; //5.0 MB in bytes

        const inputImageSize = inputFileImage.size; //in bytes

        if( inputImageSize > maxSize ){
            toast(
                "The maximum Image size is upto 5 MB",
                {
                  duration: 4000,
                }
            );
            return;
        }
        
        const imageType = inputFileImage.type;
        const imageFormat = checkFormatAcceptedForImage(imageType)!;

        const postNo = userPostsNos.length ? userPostsNos[0] + 1 : 1;

        const payloadData:userPostType = {
            userDetails : {
                name:userName,
                email:userEmail,
                userPhotoUrl,
                uid:userUid!
            },
            sharedData:{
                type:"image",
                image:inputFileImage,
                imageFormat: imageFormat.extension,
                description:postCaptionInput.trim(),
                date:Date.now(),
                likes:0,
                comments:[],
                totalComments:0,
                postNo
            }
        }
        
        try{
            await dispatch(postUserPostData(payloadData)).unwrap();
           
            
        }
        catch{
            toast("Error occured while posting data",
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

    const videoPostHandeler = async () =>{

        const postNo = userPostsNos.length ? userPostsNos[0] + 1 : 1;

        const payloadData:userPostType = {
            userDetails : {
                name:userName,
                email:userEmail,
                userPhotoUrl,
                uid:userUid!
            },
            sharedData:{
                type:'youtubeVideo',
                videoURL,
                description:postCaptionInput.trim(),
                date:Date.now(),
                likes:0,
                comments:[],
                totalComments:0,
                postNo
            }
        }

        try{
            await dispatch(postUserPostData(payloadData)).unwrap()
        }catch{
            toast("Error while uploading post!. please try again",
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

    const articlePostHandeler = async () =>{

        const postNo = userPostsNos.length ? userPostsNos[0] + 1 : 1;

        const payloadData:userPostType = {
            userDetails : {
                name:userName,
                email:userEmail,
                userPhotoUrl,
                uid:userUid!
            },
            sharedData:{
                type:'article',
                description:postCaptionInput.trim(),
                date:Date.now(),
                likes:0,
                comments:[],
                totalComments:0,
                postNo
            }
        }

        try{
            await dispatch(postUserPostData(payloadData)).unwrap()
        }catch{
            toast("Error while uploading post!",
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

    const postHandeler = async () =>{

        const postUploadType = postMediaType ? postMediaType : 'article';

        if(postUploadType == "image"){
            setShowPostModal(false);

            imagePostHandeler();
        }

        if(postUploadType == 'youtubeVideo'){
            if(postUploadType == "youtubeVideo" && !ReactPlayer.canPlay(videoURL)){
                
                toast("provide a valid yougtube video link to post!",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                    }
                );

                return;
            }

            setShowPostModal(false);
            videoPostHandeler();
        }

        if(postUploadType == 'article'){
        
            if(!postCaptionInput.length){

                // i know this will not get executed thus because we already done it for the post button 
                // but i still done that because of future developement.
                
                toast("Provide an article caption",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                    }
                );
                
                return;
            }

            setShowPostModal(false);
            articlePostHandeler();
        }

        resetPostInputsAndCloseModal();
    }

    const videoURLHandeler = (e:ChangeEvent<HTMLInputElement>) => setVideoUrl(e.target.value); 

    const postCaptionInputHandeler = (e:ChangeEvent<HTMLTextAreaElement>) => setPostCaptionInput(e.target.value);

    const canPost = postCaptionInput.trim().length ? true : false;

    const inputVideoPlayer = (
        <div className=" w-full mt-5 ">
            <ReactPlayer width={"100%"} url={showVideoPlayerVideo} controls={true} />
        </div>
    )

    return(
        <>
            <main onClick={postModalHandeler} className=" fixed h-full w-full top-0 bottom-0 right-0 left-0  bg-[#000000a4] z-10 animate-[pop-in_.1s_ease-in-out] ">
                <section className="post-modal-box">
                    <div className=" px-5 py-3 border-b-2 gray-border flex justify-between items-center ">
                        <h1 className="font-[600] gray-text dark:dark-mode-text text-xl">Create a post</h1>
                        <button onClick={postModalHandelerButton} className=" hover:bg-[#e3e3e3] dark-mode-hover-bg transition duration-75 p-2 rounded-full ">
                            <img className="w-8 svg" src={cancelSvg} alt="" />
                        </button>
                    </div>
                    <div className=" px-8 py-5 ">
                        <div className=" flex items-center font-[600] font-sans text-slate-700 dark:dark-mode-text gap-2.5 overflow-hidden ">
                            <img className="w-10 rounded-full" src={ userPhotoUrl ? userPhotoUrl : userSvg} alt="" />
                            <h2>{userName}</h2>
                        </div>
                        <textarea autoFocus value={postCaptionInput} onChange={postCaptionInputHandeler} rows={4} className="b tracking-wider bg-transparent focus:border-none focus:outline-none lea resize-none w-full text-sm mt-5 " placeholder="What do you want to talk about?" name="" id=""></textarea>
                    </div>
                    <div className="px-5 flex items-center h-10 gap-5 ">
                        <div className="flex items-center h-full gap-3 ">

                            <div className={ showImageCont ? "img-modal-container opacity-100 " :"img-modal-container opacity-60"}>
                                <div className=" absolute left-0 right-0 top-0 bottom-0 ">
                                    <input disabled={showVideoUrlInput ? true : false} onClick={fileInputClickHandeler} onChange={inputFileHandeler} accept=".gif, .jpeg, .png, .jpg, .heif" title="Select an image" className=" file:hidden file-btn cursor-pointer  w-full h-full " type="file" />
                                </div>
                                <button onClick={imageToastWarn} className={ showVideoUrlInput ? " file-btn-image-cont z-10 " : " file-btn-image-cont " }>
                                    <img className=" h-full cursor-pointer " src={ theme == "dark" ? darkModalPicSvg : modalPicSvg} alt="" />
                                </button>
                            </div>
                            <button title="select to paste video url" onClick={showVideoURLInputHandeler} className={ showVideoUrlInput ? "opacity-100 h-6 hover:opacity-100 " :"opacity-60 h-6 hover:opacity-100 "}>
                                <img className="h-full svg " src={youtubeSvg} alt="" />
                            </button>
                        </div>
                        <div className=" grow border-l-2 dark:dark-mode-border h-full pl-5 flex items-center justify-between">
                            <button className="flex items-center gap-2 opacity-60 text-[.75rem] tracking-wide ">
                                <img className="w-5 svg" src={modalMsgSvg} alt="" />
                                Anyone
                            </button>
                            <button onClick={postHandeler} disabled={!canPost} className=" hover:dark-blue-bg blue-bg text-white px-5 transition duration-[50ms] py-2 rounded-full disabled:dark-gray-bg cursor-pointer ">
                                Post
                            </button>
                        </div>
                    </div>
                    <form className={ showVideoUrlInput ? "relative px-5 mt-5" : "hidden" }>
                        <input value={videoURL} onChange={videoURLHandeler} placeholder="Paste your URL here." className="w-full mt-10 text-center focus:outline-none bg-transparent focus:border-none " type="text" name="" id="" />
                        <button onClick={getVideoHandeler} disabled={videoURL.length ? false : true} className=" disabled:dark-gray-bg w-full mt-5 blue-bg hover:dark-blue-bg transition duration-[50ms] text-white rounded-sm py-2">
                            Get the Video
                        </button>
                        <button title="close url input" onClick={clearInputUrlHandeler} className="cursor-pointer absolute top-0 w-8 right-5 hover:bg-[#e3e3e392] transition duration-75 rounded-md">
                            <img className="w-full dark:hover:brightness-0" src={cancelSvg} alt="" />
                        </button>
                        {
                            showVideoPlayerVideo.length ? inputVideoPlayer : ''
                        }
                    </form>
                    <div className={ showImageCont ? "input-img-cont " : "hidden" }>
                        <img className={inputFileImage ? "h-auto max-h-full  object-contain " : "hidden"} src={inputFileImage ? URL.createObjectURL(inputFileImage) : ''} alt="" />
                        <p className={!inputFileImage ? " absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-lg tracking-wider gray-text " : "hidden" }>Select an Image</p>
                        <button title="Remove image" onClick={clearInputImageHandeler} className=" absolute w-8 right-5 hover:bg-[#e3e3e382] transition duration-75 rounded-md">
                            <img className="w-full dark:hover:brightness-0" src={cancelSvg} alt="" />
                        </button>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PostModal;