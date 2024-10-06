import { cardBg, photoIcon, widgetIcon, itemIcon, plusIcon, downArrowSvg } from "../assets/images";
import { useSelector } from "react-redux";
import { getUserDisplayName, getUserPhotoURL, getUserProfession } from "../storeSlices/userSlice";
import { useState } from "react";

const UserInfo = () =>{
    
    const userName = useSelector(getUserDisplayName);
    const userImage = useSelector(getUserPhotoURL);
    const userProfession = useSelector(getUserProfession);

    const [ showMore, setShowMore ] = useState<boolean>(false);

    const showMoreHandeler = () => setShowMore(!showMore);

    return(
        <>
            <div className=" md:mb-5 rounded-lg w-full overflow-hidden dark:dark-mode-bg bg-white border-[#1919192b]  border-2">
                <div className=" w-full h-20  relative">
                    <img className="w-full h-full" src={cardBg} alt="" />
                    <div className={ userImage ? " user-img-present" : "user-img-not" }>
                        <img className={ userImage ? " w-full h-full rounded-full" : "h-full" } src={ userImage ? userImage : photoIcon} alt="" />
                    </div>
                </div>
                <div className="mt-10 text-center pb-5 border-b-2 border-[#1919192b]">
                    <h3 className=" font-[600] font-sans ">Welcome, {userName}!</h3>
                    <p className="text-slate-600 dark:text-neutral-500 text-sm mt-2">{userProfession}</p>
                </div>
            </div>
            <section className={showMore ? "mt-3 md:block" : "hidden md:block " }>
                <div className="bg-white dark:dark-mode-bg rounded-lg gray-border border-2">
                    <div className="pt-3 pb-3  border-b-2 dark:dark-mode-border border-[#1919192b] ">
                        <div className=" cursor-pointer py-2 px-5 flex justify-between items-center hover:gray-bg ">
                            <div className="text-sm font-[700] font-sans ">
                                <p className="text-[#3939398c] dark:text-neutral-500">Connections</p>
                                <p>Grow your network</p>
                            </div>
                            <img className="w-5 cursor-pointer svg" src={widgetIcon} alt="" />
                        </div>
                    </div>
                    <div className="">
                        <a className="px-5 dark-mode-hover-bg py-5 hover:gray-bg flex gap-1 items-center cursor-pointer">
                            <img className=" w-5 opacity-55 svg" src={itemIcon} alt="" />
                            <span className="  font-[700] text-sm">My Items</span>
                        </a>
                    </div>
                </div>
                
                <div className="mt-2">
                    <div className="text-[.85rem] dark:text-[#0a66c2] font-[400] font-sans bg-white dark:dark-mode-bg rounded-lg border-[#1919192b]  border-2">
                        <div className=" flex flex-col gap-2 px-5 pt-5 pb-2 border-[#1919192b] dark:dark-mode-border border-b-2 ">
                            <a className=" hover:text-[#0a66c2] cursor-pointer" >Groups</a>
                            <a className="rotate-events  flex items-center justify-between hover:text-[#0a66c2] cursor-pointer">
                                <span>Events</span>
                                <img className=" w-5 rotate-plus transition svg" src={plusIcon} alt="" />
                            </a>
                            <a className="hover:text-[#0a66c2] cursor-pointer">Follow Hashtags</a>
                        </div>
                        <div className="">
                            <a className="px-5 py-5 hover:gray-bg dark-mode-hover-bg flex items-center cursor-pointer">
                                <span className="  text-[#3939398c] dark:dark-mode-text ">Discover more</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <button onClick={showMoreHandeler} className="w-full gap-1 dark:hover:bg-[#1b1f237c] dark:dark-mode-text flex items-end justify-center bg-transparent text-slate-600 text-sm tracking-wide font-sans font-[500] py-1 transition rounded-md mt-2 hover:gray-bg md:hidden ">
                {
                    showMore ? "Show less" : "Show more"
                }
                <img className={ showMore ? "w-4 rotate-180 svg" : "w-4 svg "} src={downArrowSvg} alt="" />
            </button>
        </>
    )
}

export default UserInfo;