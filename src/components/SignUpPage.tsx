import { useState, MouseEvent } from "react";
import EmailLoginPage from "./EmailLoginPage";
import { useNavigate } from "react-router";
import LoginNav from "./LoginNav";
import { useDispatch } from "react-redux";
import { userSignUpAction } from "../storeSlices/userSlice";
import LoadingComp from "./LoadingComp";
import toast from "react-hot-toast";
import { DispatchType } from "../store/store";
import { checkUserExistOrNot } from "../utils/utils";
import { storeTempCredential } from "../storeSlices/tempCredentialSlice";

const SignUpPage = () =>{

    const navigate = useNavigate();

    const dispatch = useDispatch<DispatchType>();

    const [ signUpEmail, setSignUpEmail ] = useState<string>('');
    const [ signUpPassword, setSignUpPassword ] = useState<string>('');
    const [ signUpLoading, setSignUpLoading ] = useState(false);

    const resetForm = () =>{
        setSignUpLoading(false);
        setSignUpEmail('');
        setSignUpPassword('');
    }

    const signUpBtnHandeler = async (e:MouseEvent<HTMLButtonElement,MouseEvent>) =>{
        e.preventDefault();

        if(!signUpEmail.trim()){
            toast(
                "Type Email and Password",
                {
                  duration: 2000,
                }
            );
            return;
        }
        
        setSignUpLoading(true);
       
        try{
            try{
               const isUserExist = await checkUserExistOrNot(signUpEmail);
                
                if(isUserExist){
                    toast("user already Exist!",
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
                toast("unable find user exist or not, try signUp again",
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

            const signUpPayload = {
                signUpEmail,
                signUpPassword
            }
            
            await dispatch(userSignUpAction(signUpPayload)).unwrap();
            
            dispatch(
                storeTempCredential({
                    userEmail: signUpEmail,
                    userPassword: signUpPassword
                })
            );
            
            navigate('verification');

        }catch(err){
            toast("Error Occured during signup",
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

    const signUpPageComp = (
        <>
            <nav className="h-auto border-b-2 gray-border max-sm:b g-white ">
                <LoginNav />
            </nav>
            <EmailLoginPage
                loginType="signup"
                email={signUpEmail}
                setEmail={setSignUpEmail}
                password={signUpPassword}
                setPassword={setSignUpPassword}
                btnClickHandeler={signUpBtnHandeler}
            />
        </>
    )

    return(
        <>
            {
                signUpLoading ? <LoadingComp /> : signUpPageComp
            }
        </>
    )
}

export default SignUpPage;