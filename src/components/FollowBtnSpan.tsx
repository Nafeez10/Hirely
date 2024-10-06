type propsType = {
    label: string,
    spanSvg: string
}

const FollowBtnSpan = ({ label, spanSvg }:propsType) =>{

    return(
        <>
            <span className="flex items-center justify-center gap-1">
                <span className="w-5">
                    <img className="w-full" src={spanSvg} alt="" />
                </span>
                <span>
                    {label}
                </span>
            </span>
        </>
    )
}

export default FollowBtnSpan;