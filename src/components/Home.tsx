import UserInfo from "./UserInfo";
import MainFeed from "./Mainfeed";
import FollowedFeed from "./FollowFeed";
import PostModal from "./PostModal";
import { useState } from "react";

const Home = () =>{

    const [ showPostModal, setShowPostModal ] = useState<boolean>(false);  

    return(
        <>
            <section className=" max-md:mb-20 px-10 max-md:flex max-md:flex-col max-sm:px-3 max-md:px-5 mt-7 md:grid md:grid-cols-[2fr_4fr] lg:grid-cols-[2fr_4fr_2fr] gap-5 max-md:gap-2  ">
                <div className=" min-w-[250px] ">
                    <UserInfo />
                </div>
                <div className="">
                    <MainFeed showPostModal={showPostModal} setShowPostModal={setShowPostModal} />
                </div>
                <div className=" max-lg:hidden  min-w-[230px] ">
                    <FollowedFeed />
                </div>
            </section>
            {
                showPostModal && 
                    <PostModal showPostModal={showPostModal} setShowPostModal={setShowPostModal} />
            }
        </>
    )
}

export default Home;