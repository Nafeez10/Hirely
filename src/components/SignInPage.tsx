import EmailLoginPage from "./EmailLoginPage";
import LoginNav from "./LoginNav";
import { useState, MouseEvent } from "react";
import { signInUserWithEmailAction } from "../storeSlices/userSlice";
import { useDispatch } from "react-redux";
import { DispatchType } from "../store/store";
import { useNavigate } from "react-router";
import LoadingComp from "./LoadingComp";
import toast from "react-hot-toast";
import { checkUserExistOrNot } from "../utils/utils";
import { welcomeToast } from "../utils/utils";


const SignInPage = () =>{

    const dispatch = useDispatch<DispatchType>();

    const navigate = useNavigate();

    const [ signInLoading, setSignInLoading] = useState<boolean>(false);
    const [ signInEmail, setSignInEmail ] = useState<string>('');
    const [ signInPassword, setSignInPassoword ] = useState<string>('');

    const resetForm = () =>{
        setSignInLoading(false);
        setSignInEmail('');
        setSignInPassoword('');
    }

    const signInBtnHandeler = async (e:MouseEvent<HTMLButtonElement,MouseEvent>) =>{
        e.preventDefault();

        if(!signInEmail.trim()){
            toast(
                "Type Email and Password",
                {
                  duration: 2000,
                }
            );

            return;
        }

        setSignInLoading(true);
        
        try{
            try{
                const isUserExist = await checkUserExistOrNot(signInEmail);
                
                if(isUserExist == false){
                    
                    toast("user doesn't exist!",
                        {
                          icon: '😔',
                          style: {
                            borderRadius: '10px',
                            background: '#ffc6c6',
                            color: '#a21212',
                          },
                        }
                    );

                    return;
                }
            }catch{
                toast("unable find user exist or not, try signIn again",
                    {
                      icon: '😔',
                      style: {
                        borderRadius: '10px',
                        background: '#ffc6c6',
                        color: '#a21212',
                      },
                    }
                );

                return;
            }
           
            const info = {
                email:signInEmail,
                password:signInPassword
            }
            
            const response = await dispatch(signInUserWithEmailAction(info)).unwrap();
           
            navigate('/in/')
        
            toast.custom((t) => welcomeToast(t,response.displayName!,response.photoURL));
           
        }catch(err){
           toast("Error Occured during Login!",
                {
                  icon: '😔',
                  style: {
                    borderRadius: '10px',
                    background: '#ffc6c6',
                    color: '#a21212',
                  },
                }
            );
        }finally{
            resetForm();
        }
    }

    const signInPageComponent = (
        <>
            <nav className="h-auto border-b-2 gray-border max-s m:bg-white">
                <LoginNav />
            </nav>
            <EmailLoginPage
                loginType="signin"
                email={signInEmail}
                setEmail={setSignInEmail}
                password={signInPassword}
                setPassword={setSignInPassoword}
                btnClickHandeler={signInBtnHandeler}
            />
        </>
    )
    
    return(
        <>
            {
                signInLoading ?
                    <LoadingComp />
                    :
                    signInPageComponent 
            }

        </>
    )
}

export default SignInPage;