import { google } from "../assets/images";
import { googleProvider } from "../config/firebase.config";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../config/firebase.config';
import { storeUserDetails, storeUserCredentials } from "../storeSlices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { DispatchType } from "../store/store";
import toast from "react-hot-toast";
import { checkUserExistOrNot } from "../utils/utils";
import { welcomeToast } from "../utils/utils";


type propsType = {
    btnType? : string
}

const GoogleLoginBtn = ({ btnType = "home" }:propsType) =>{

    const dispatch = useDispatch<DispatchType>();

    const navigate = useNavigate();

    const btnClass = btnType == "login" ? true : false;
 
    const googleSignIn = async ()=>{
        try{

            const googelUser = await signInWithPopup(auth,googleProvider);

            try{
                const isUserExist = await checkUserExistOrNot(googelUser.user.email!);
            
                if(isUserExist){
                    dispatch(storeUserDetails(googelUser.user));

                    navigate('/in/')
    
                    toast.custom((t) => welcomeToast(t,googelUser.user.displayName!,googelUser.user.photoURL));
                }else{
                    try{
                        const storeCredentials = {
                            user:googelUser.user,
                            providerId:googelUser.providerId
                        }

                        await dispatch(storeUserCredentials(storeCredentials)).unwrap();

                        navigate('/signup/welcome');
                    }catch{
                        toast("unable to store user details,please try signUp again",
                            {
                              icon: '😔',
                              style: {
                                borderRadius: '10px',
                                background: '#ffc6c6',
                                color: '#a21212',
                              },
                            }
                        );
                        await signOut(auth);  

                        return;     
                    }
                    
                }
            }catch {
                toast("unable find user exist or not,please try signUp again",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                    }
                );

                await signOut(auth);

                return;
            }
        }catch(err){
            toast("Check your connection and try signIn again",
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


    return(
        <>
            <button onClick={googleSignIn} className={ btnClass ? "google-btn-login" : "google-btn-home"}>
                <img className="w-7" src={google} alt="" />
                <span className="">
                    Sign in with Google
                </span>
            </button>
        </>
    )
}

export default GoogleLoginBtn;