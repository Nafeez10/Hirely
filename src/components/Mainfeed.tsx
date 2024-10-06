import { userSvg, postButtons, triangeSvg } from "../assets/images";
import PostBtn from "./PostBtn";
import { useSelector } from "react-redux";
import { getPostLoadingStatus } from "../storeSlices/userPostsSlice";
import { getUserPhotoURL } from "../storeSlices/userSlice";
import UploadLoadingComponent from "./UploadLoadingComponent";
import UserPostContainer from "./UserPostsContainer";

type propsType = {
    showPostModal:boolean,
    setShowPostModal:React.Dispatch<React.SetStateAction<boolean>>
}

const MainFeed = ({ setShowPostModal, showPostModal }:propsType) =>{

    const userImageUrl = useSelector(getUserPhotoURL);
    const userPostStatus = useSelector(getPostLoadingStatus);

    const canPost = userPostStatus == 'pending' || userPostStatus == "uploaded" ? false : true;

    const postModalHandeler = () =>{
        setShowPostModal(!showPostModal)
    }

    const userDisplayImage = userImageUrl ? userImageUrl : userSvg;

    return(
        <>
            <main className="mb-20 max-lg:mb-0">
                <section className=" bg-white dark:dark-mode-bg dark:dark-mode-text rounded-lg border-2 gray-border px-5 py-4">
                    <div className=" flex gap-4 items-center">
                        <div className="w-14 h-14 rounded-full overflow-hidden">
                            <img className="w-full" src={userImageUrl ? userImageUrl : userSvg} alt="" />
                        </div>
                        <div className=" relative flex-grow">
                            <button disabled={!canPost} onClick={postModalHandeler} className=" hover:gray-bg dark-mode-hover-bg transition duration-75 text-lg text-left w-full px-6 h-14 gray-text dark:dark-mode-d-text font-[600] dark:dark-mode-border gray-border border-2 rounded-full ">
                                Start a post
                            </button>
                            <div className="absolute left-[10%] top-[120%] animate-[bounce-in_4s_forwards]">
                                <div className=" relative">
                                    <div className="  bg-[#c4dcff] text-[#1858b8] px-5 py-2 rounded-full ">
                                        <h2>Try clicking this to create a post</h2>
                                    </div>
                                    <img className="w-20 absolute bottom-[95%] rotate-[-20deg]  " src={triangeSvg} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" flex items-center justify-between mt-5">
                        {
                            postButtons.map( item =>(
                                <PostBtn key={item.label} postLabel={item.label} postSvg={item.svg} showPostModal={showPostModal} setShowPostModal={setShowPostModal} canPost={canPost} />
                            ))
                        }
                    </div>
                </section>
                <UploadLoadingComponent userDisplayImage={userDisplayImage} />
                <section className=" mt-5 ">
                    <UserPostContainer />
                </section>

            </main>
        </>
    )
}

export default MainFeed;