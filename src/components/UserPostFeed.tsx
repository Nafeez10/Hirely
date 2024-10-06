import { userSvg, likeSm, heartSm, clapSm, interactPostBtns } from "../assets/images";
import InteractBtn from "./InteractBtn";
import { postMediaType } from "./PostModal";
import PostImageComp from "./PostImageComp";
import PostVideoComp from "./PostVideoComp";
import DeletePostComp from "./DeletePostComp";
import TimeAgo from "./TimeAgo";
import { memo } from "react";


type propsType = {
    postType:postMediaType
    userName:string;
    userEmail:string;
    userImageURL:string | null;
    postDate:number;
    postCaption:string;
    postImageURL?:string;
    postVideoURL?:string;
    postLikes?:number;
    postNo:number
}

const UserPostFeed = ({ postType, userName, userEmail, userImageURL,  postDate, postCaption, postImageURL, postVideoURL, postNo}:propsType) =>{


    return (
        <>
            <section className="bg-white dark:dark-mode-bg rounded-lg border-2 gray-border">
                <div className="p-4 ">
                    <div className=" flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                            <div className="w-14 h-14 ">
                                <img className="w-full h-full" src={userImageURL ? userImageURL : userSvg} alt="user image" />
                            </div>
                            <div className=" flex flex-col justify-center text-[.8rem] m-0 gray-text dark:dark-mode-d-text font-[600] h-14 ">
                                <span>{userName}</span>
                                <span>{userEmail}</span>
                                <TimeAgo postDate={postDate} />
                                {/* <span>{postDate}</span> */}
                            </div>
                        </div>
                        <DeletePostComp postNo={postNo}  />
                    </div>
                    <div className="text-sm mt-4">
                        <p>{postCaption}</p>
                    </div>
                </div>
                {
                    postType == 'image' && postImageURL ? <PostImageComp postImageURL={postImageURL} /> : <></>
                }
                {
                    postType == 'youtubeVideo' && postVideoURL ? <PostVideoComp postVideoURL={postVideoURL} /> : <></>
                }
                <div className="px-5 mt-2  ">
                    <div className="border-b-2 gray-border flex items-center py-2">
                        <div className="flex items-center   h-6 ">
                            <div className="w-6 bg-white p-[0.1rem] rounded-full ">
                                <img className=" w-full h-full p-[.01rem] " src={likeSm} alt="" />
                            </div>
                            <div className="w-6 bg-white p-[0.1rem] rounded-full -translate-x-2">
                                <img className="w-full h-full p-[.01rem]  " src={heartSm} alt="" />
                            </div>
                            <div className="w-6 bg-white p-[0.1rem] rounded-full -translate-x-4">
                                <img className="w-full h-full p-[.01rem]  " src={clapSm} alt="" />
                            </div>
                        </div>
                        <a className="text-sm gray-text dark:dark-mode-d-text hover:in-blue-text hover:underline underline-offset-3 cursor-pointer">Mohamed Nafees and 31 others</a>
                    </div>
                </div>
                <div className="py-4 px-10 max-sm:px-2 max-xl:px-5 flex justify-between">
                    {
                        interactPostBtns.map( item => (
                            <InteractBtn key={item.label} btnLabel={item.label} btnImg={item.img} />
                        ))
                    }
                    
                </div>
            </section>
        </>
    )
}

const memoizedUserPostFeed = memo(UserPostFeed);

export default memoizedUserPostFeed;