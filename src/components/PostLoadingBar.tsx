import { useSelector } from "react-redux";
import { getPostLoadingPercentage, getPostLoadingStatus } from "../storeSlices/userPostsSlice";
import { uploadTickSvg } from "../assets/images";


const PostLoadingBar = () =>{
    
    const postUploadingPercentage = useSelector(getPostLoadingPercentage);
    const uploadStatus = useSelector(getPostLoadingStatus);

    const displayLoadingPercentage = Math.round(postUploadingPercentage);

    const numberPercentageElement = (
        <h2 className="m-0  p-0 leading-none tracking-wide text-slate-700 dark:dark-mode-d-text " >
            Uploading Post {displayLoadingPercentage}% ...
        </h2>
    );

    const savingPostElement = (
        <span className="flex items-center gap-2.5">
            <h1 className="m-0  p-0 leading-none tracking-wide text-slate-700 dark:dark-mode-d-text ">Saving Post...</h1>
            <img className="w-6" src={uploadTickSvg} alt="" />
        </span>
    );

    const displayUploadStatus = (
        uploadStatus == 'uploaded' ? savingPostElement : uploadStatus == 'pending' ? numberPercentageElement : <></>
    );

    return(
        <>
            {
                displayUploadStatus
            }
            <span className="h-1 block rounded-full grow mt-2 gray-bg dark:bg-black transition duration-75 ">
                <span style={{width:`${displayLoadingPercentage}%`,transition:'.3s'}} className='blue-bg rounded-full block h-full'></span>
            </span>
        </>
    )
}

export default PostLoadingBar;