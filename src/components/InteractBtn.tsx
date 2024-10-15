type propsType = {
    btnLabel:string,
    btnImg:string
}

const InteractBtn = ({ btnLabel, btnImg }:propsType) =>{

    return(
        <>
            <button className=" dark-mode-hover-bg flex items-center gap-1 hover:gray-bg max-xl:px-3 px-6 py-3 rounded-sm transition">
                <img className="w-5 svg" src={btnImg} alt="" />
                <span className="text-[.8rem] font-sans max-sm:hidden ">
                    {btnLabel}
                </span>
            </button>
        </>
    )
}

export default InteractBtn;