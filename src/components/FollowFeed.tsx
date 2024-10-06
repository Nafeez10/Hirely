import { feedIcon, rightIcon, hirelyBanner } from "../assets/images";
import FollowLink from "./FollowLink";
import Footer from "./Footer";

const FollowedFeed = () => {

    return(
        <>
            <section className="">
                <section className=" bg-white dark:dark-mode-bg border-[#1919192b] border-2 rounded-lg ">
                    <div className=" px-4 py-4">
                        <div className=" flex justify-between">
                            <h2 className="text-[#393939ba] dark:dark-mode-text font-[700] font-sans ">Add to your feed</h2>
                            <img title="info" className="w-4 svg cursor-pointer" src={feedIcon} alt="" />
                        </div>
                        <div className=" mt-6 flex flex-col gap-4">
                            <FollowLink tagName="Hirely" />
                            <FollowLink tagName="Video" />
                        </div>
                    </div>
                    <a className="px-4 py-4 border-[#1919192b] dark:dark-mode-border border-t-2 text-[#4a8ed1] dark-mode-hover-bg hover:gray-bg text-sm max-xl:text-[0.8rem] justify-center font-[600] mt-4 flex gap-2 items-center cursor-pointer">
                        <h2 className="">View all recommendations</h2>
                        <img className="w-4" src={rightIcon} alt="" />
                    </a>
                </section>
                <section className="border-[#1919192b] border-2 rounded-lg mt-5 overflow-hidden">
                    <img className="w-full opacity-90" src={hirelyBanner} alt="" />
                </section>
                <Footer />
            </section>
        </>
    )
}

export default FollowedFeed;