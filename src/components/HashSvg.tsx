import { followHash } from "../assets/images";

const HashSvg = () =>{

    return(
        <>
            <div className=" p-[0.10rem] border-[#9db0c0] w-16 rounded-full border-4  ">
                <div className="w-full bg-[#ecf2f9] rounded-full">
                    <img className="w-full opacity-70" src={followHash} alt="" />
                </div>
            </div>
        </>
    )
}

export default HashSvg;