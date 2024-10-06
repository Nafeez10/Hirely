type propsType = {
    postLabel: string,
    postSvg: string,
    showPostModal:boolean,
    canPost: boolean
    setShowPostModal:React.Dispatch<React.SetStateAction<boolean>>
}

const PostBtn = ({ postLabel, postSvg, setShowPostModal, canPost }:propsType) =>{

    return(
        <>
            <button disabled={!canPost} onClick={()=> setShowPostModal(true)} className=" flex items-center gap-2.5 max-xl:gap-1 text-slate-600 dark:dark-mode-d-text transition duration-100 font-[600] text-sm hover:gray-bg dark-mode-hover-bg px-4 py-2 max-xl:px-2 rounded-sm ">
                <img className="w-7 lg:w-6 xl:w-7" src={postSvg} alt="" />
                <span className=" max-xl:text-[0.82rem] max-md:block ">{postLabel}</span>
            </button>
        </>
    )
}

export default PostBtn;