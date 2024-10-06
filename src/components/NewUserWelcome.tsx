import { ChangeEvent, useState, MouseEvent } from "react";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { storeUserDetails, storeUserProfession, updateUserProfileAction, updateUserProfileActionPayloadType } from "../storeSlices/userSlice";
import { auth } from "../config/firebase.config";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { DispatchType } from "../store/store";
import { arrowSvg } from "../assets/images";
import { welcomeToast } from "../utils/utils";


const NewUserWelcome = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch<DispatchType>();

    const [ userName, setUserName ] = useState<string>('');
    const [ userProfession, setUserProfession ] = useState<string>('');
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const [ showNextInput, setShowNextINput ] = useState<boolean>(false);
    
    const user = auth.currentUser;

    const userNameHandeler = (e:ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
    const userProfessionHandeler = (e:ChangeEvent<HTMLInputElement>) => setUserProfession(e.target.value);

    const NewUserHandeler = async (e:MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();

        if( !userName.trim() && !userProfession.trim()){
            toast(
                "Enter details to submit!",
                {
                  duration: 2000,
                }
            );
            return;
        }

        setIsLoading(true);
        
        if(user){
            try{
                await updateProfile(user,{
                    displayName:userName.trim()
                });

                const updateDBPayload:updateUserProfileActionPayloadType  = {
                    userUid: user.uid,
                    updatedDisplayName: userName,
                    userEmail: user.email!,
                    userProfession: userProfession.trim()
                }

                const updateUserDB = await dispatch(updateUserProfileAction(updateDBPayload)).unwrap();
                
                await user.reload();

                dispatch(storeUserDetails(user));
                
                dispatch(storeUserProfession(updateUserDB));

                navigate('/in/');

                toast.custom((t) => welcomeToast(t,user.displayName!,user.photoURL));

            }catch{
                toast("unable to update username, check your connection and please try again!",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                      duration:4000
                    }
                );
            }finally{
                setIsLoading(false);
                // navigate('/in/');
                // toast.custom((t) => welcomeToast(t,user.displayName!,user.photoURL));
            }
        }

        return;

    }

    const loadingElement = isLoading ? (
        <span className="block animate-spin -spin outline-1 dark:outline-white outline-double dark:border-white border-t-4 h-4 w-4 rounded-full dark:dark-mode-bg bg-slate-600 "></span>
    ) : <></>

    const nextInputHandeler = (e:MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setShowNextINput(true);
    }
    const previousInputHandeler = (e:MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setShowNextINput(false);
    }

    const backButton = (
        <button onClick={previousInputHandeler} className={showNextInput ? "new-user-navigate-btn" : "hidden"}>
            <img className="w-5 border-2 rounded-full border-[#475569] rotate-180 navigate-btn-svg " src={arrowSvg} alt="" />
            Back
        </button>
    )

    const nextButton = (
        <button onClick={nextInputHandeler} className={!showNextInput ? "new-user-navigate-btn animate-[fade-in_1s] " : "hidden"}>
            Next
            <img className="w-5 border-2 rounded-full border-[#475569] navigate-btn-svg " src={arrowSvg} alt="" />
        </button>
    )

    const submitButton = (
        <button onClick={NewUserHandeler} className={ userName.trim().length && userProfession.trim().length ? "new-user-btn opacity-100 transition animate-[pop-in_.3s] " : "new-user-btn opacity-0 hidden"}>
            { loadingElement }
            Submit
        </button>
    )

    return(
        <>
            <div className="flex flex-col gap-5 dark:dark-mode-text text-slate-600 items-center h-screen  ">
                <form className=" flex flex-col mt-[15vh] justify-center items-center gap-5 w-[35%] xl:w-[40%] lg:w-[55%] md:w-[65%] max-md:w-[80%] max-sm:px-4 max-sm:w-full">
                    <h1 className=" logo-font text-5xl max-sm:text-3xl text-center animate-[slide-in_1.5s] " >Hey!, Welcome to Hirely.</h1>
                    <div className="w-full flex  relative overflow-hidden ">
                        <div style={{
                            transform: showNextInput ? 'translateX(-100%)' : 'translateX(0)',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                        className="w-full flex">
                            <div className="absolute w-full">
                                <input autoFocus value={userName} onChange={userNameHandeler} placeholder="Type a username" className="new-user-input tracking-wide text-center w-full text-2xl focus-anim-inp pt-4 focus:outline-none border-b-2 border-slate-500  bg-transparent pop-in-delay opacity-0 animate-[pop-in_1.2s] " type="text" name="" id="" />
                                <span className=" block focus-anim-span bg-black "></span>
                            </div>
                            <div className=" translate-x-[100%] w-full">
                                <input value={userProfession} onChange={userProfessionHandeler} placeholder="Type your Profession" className="new-user-input tracking-wide text-center w-full text-2xl focus-anim-inp pt-4 focus:outline-none border-b-2 border-slate-500  bg-transparent pop-in-delay opacity-0 animate-[pop-in_1.2s] " type="text" name="" id="" />
                                <span className=" block focus-anim-span bg-black "></span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse borde r-2 w-[80%] justify-center items-center mt-5 gap-2.5">
                        {
                            userName.trim().length && userProfession.trim().length ? submitButton : <></>
                        }
                        {
                            showNextInput ? backButton : <></>
                        }
                        {
                            !showNextInput ? nextButton : <></>
                        }
                    </div>
                    
                </form>
                
            </div>
        </>
    )
}

export default NewUserWelcome;