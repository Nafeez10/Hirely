import { emailSvg } from "../assets/images";
import { Link } from "react-router-dom";

const EmailLoginBtn = () =>{

    return(
        <>
            <Link className="max-sm:w-full sm:w-[80%] md:w-[70%]" to={'/signin'}>
                <button className=" text-slate-600 dark:dark-mode-d-text w-full transition-none dark:dark-mode-bg dark-mode-hover-bg dark:hover:text-slate-400 hover:bg-slate-50 hover:text-slate-800 flex gap-2.5   border-slate-600 border-[3px] mt-3 justify-center items-center  py-4 rounded-full">
                    <img className="w-7" src={emailSvg} alt="" />
                    <span className="">
                        Sign in with Email
                    </span>
                </button>
            </Link>
        </>
    )
}

export default EmailLoginBtn;