import { noPostSvg2 } from "../assets/images";
import UserPostFeed from "./UserPostFeed";
import { selectIds, selectAllUserPosts } from "../storeSlices/userPostsSlice";
import { useSelector } from "react-redux";

const UserPostContainer = () =>{

    const postIds = useSelector(selectIds);
    const userPosts = useSelector(selectAllUserPosts);

    const displayUserPosts = postIds.map( postId =>{
        const post = userPosts[postId];

        return(
            <UserPostFeed
                key={postId}
                postType={post.sharedData.type}
                userEmail={post.userDetails.email!}
                userName={post.userDetails.name!}
                userImageURL={post.userDetails.userPhotoUrl!}
                postDate={post.sharedData.date}
                postCaption={post.sharedData.description}    
                postImageURL={post.sharedData.image as string}
                postVideoURL={post.sharedData.videoURL}
                postNo={post.sharedData.postNo}
            />

        )
    });

    const noPostCont = (
        <section className="  bg-white dark:dark-mode-bg gray-border border-2 px-10  rounded-lg ">
            <div className="text-slate-600 flex flex-col items-center pt-10 justify-center">
                <h2 className=" text-[#4a8ed1] text-lg text-center">
                    Haven't created a post, create by clicking the start a post 
                </h2>
                <img className="w-[80%] mt-3 " src={noPostSvg2} alt="" />
                
            </div>
        </section>
    )

    return(
        <>
            <div  className="flex flex-col gap-5">
                {
                    postIds.length ? displayUserPosts : noPostCont
                }
            </div>
        </>
    )
}

export default UserPostContainer;