import { auth } from "../config/firebase.config";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUserDetails } from "../storeSlices/userSlice";
import toast from "react-hot-toast";
import { clearAllDataToSignOut } from "../storeSlices/userPostsSlice";
import { DispatchType } from "../store/store";
import { logoutSvg, userSvg, downIcon } from "../assets/images";
import { useEffect, useRef, useState } from "react";

type propsType = { 
    userImgURL:string | null | undefined
}

const SignOut = ({userImgURL}:propsType) =>{

    const navigate = useNavigate();

    const dispatch = useDispatch<DispatchType>();

    const [ showLogOut, setShowLogOut ] = useState<Boolean>(false);

    const logOutDiv = useRef(null);

    useEffect(()=>{
        const clickEvent = (e:MouseEvent) =>{
            if(e.target !== logOutDiv.current ){
                
                setShowLogOut(false);
            }   
        }

        window.addEventListener("click",clickEvent);
        
        return ()=>{
            window.removeEventListener("click",clickEvent);
        }
        
    },[])
   
    const signOutHandeler = async() =>{
        try{
            await signOut(auth);
            
            dispatch(deleteUserDetails());
            dispatch(clearAllDataToSignOut());
            
            navigate('/');

            toast('Logout Successfull!',
                {
                  icon: '✅',
                  style: {
                    borderRadius: '10px',
                    background: '#caf1c1',
                    color: '#285d1e',
                  },
                }
            );
        }catch(err){
            toast("Error occuered during logout!",
                {
                  icon: '😔',
                  style: {
                    borderRadius: '10px',
                    background: '#ffc6c6',
                    color: '#a21212',
                  },
                }
            );
        }
    }

    const ShowLogOutHandeler = () => setShowLogOut(!showLogOut);

    return(
        <>
            <div  className=" relative w-[5.1rem] max-sm:w-[4.1rem]  gap-1 flex flex-col items-center   ">
                <img className="rounded-full h-6 " src={userImgURL ? userImgURL : userSvg} alt="" />
                <div className="flex items-center cursor-pointer ">
                    <span>
                        Me
                    </span>
                    <div className="w-4 ">
                        <img className=" w-full brightness-0 dark:brightness-100 " src={downIcon} alt="" />

                    </div>
                </div>
                <div ref={logOutDiv} onClick={ShowLogOutHandeler} className=" bg-transparent cursor-pointer absolute w-full h-full"></div>
            </div>
            <div className={showLogOut ? "animate-[pop-in_.1s]" : "hidden"}>
                <div className=" dark:dark-mode-bg  absolute lg:top-[105%] max-lg:-top-12 shadow-lg border-slate-200 dark:dark-mode-border border-[1px]  w-28 flex justify-center items-center max-lg:left-[20%] left-[50%] h-12 bg-white translate-x-[-50%] rounded-md ">
                    <button onClick={signOutHandeler} className=" flex gap-1 items-center justify-center dark:dark-mode-bg bg-white hover:bg-slate-50 w-full h-[80%] border-none rounded-sm  opacity-85 hover:opacity-100">
                        <img className="w-6" src={logoutSvg} alt="" />
                        SignOut
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignOut;