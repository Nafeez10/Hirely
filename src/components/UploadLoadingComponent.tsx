import { useSelector } from "react-redux";
import { getPostLoadingStatus } from "../storeSlices/userPostsSlice";
import PostLoadingBar from "./PostLoadingBar";

type propsType = {
    userDisplayImage:string
}

const UploadLoadingComponent = ({userDisplayImage}:propsType) =>{

    const postUploadingStatus = useSelector(getPostLoadingStatus);

    const loadingElement = (
        <>
            <section className=" mt-5 bg-white dark:dark-mode-bg rounded-lg border-2 gray-border px-5 py-4">
                <div className=" w-full flex gap-2.5 items-center">
                    <div className="w-10 bo rder-2 ">
                        <img className="w-full rounded-full" src={userDisplayImage} alt="" />
                    </div>
                    <div className=" transition duration-75 bord er-2 grow">
                        <PostLoadingBar />
                    </div>
                </div>
                        
            </section>  
        </>
    )

    const displayLoadingBar = postUploadingStatus == 'pending' ? loadingElement : <></>;

    return(
        <>
            {
                displayLoadingBar
            } 
        </>
    )
}

export default UploadLoadingComponent;