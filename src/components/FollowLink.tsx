import { useState } from "react";
import HashSvg from "./HashSvg";
import FollowBtnSpan from "./FollowBtnSpan";
import { roundedPlusSvg, tickSvg } from "../assets/images";

type propsType = {
    tagName:string
}

const FollowLink = ({tagName}:propsType) =>{

    const [ followTag, setFollowTag ] = useState<Boolean>(false);

    const followHandeler = () =>{
        setFollowTag(!followTag);
    }

    return(
        <>
            <div className=" flex items-center gap-2">
                <HashSvg />
                <div className=" flex flex-col items-center text-sm text-[#393939ba] dark:dark-mode-d-text font-bold ">
                    <span># {tagName}</span>
                    <button onClick={followHandeler} className="border-[2px] text-[#4a8ed1] transition duration-75 hover:bg-[#dcedff] hover:border-[3px] bg-white border-[#4a8ed1] rounded-full w-28 h-9 ">
                        {
                            followTag ? 
                                (
                                    <FollowBtnSpan label="Following" spanSvg={tickSvg} />
                                )
                                :
                                (
                                    <FollowBtnSpan label="Follow" spanSvg={roundedPlusSvg} />
                                )
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default FollowLink;