import { auth } from "../config/firebase.config";
import { EmailAuthProvider, reauthenticateWithCredential, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { deleteUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { storeUserCredentials } from "../storeSlices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginNav from "./LoginNav";
import toast from "react-hot-toast";
import { DispatchType } from "../store/store";
import { clearUserTempCredential, getTempCredentialUserEmail, getTempCredentialUserPassword } from "../storeSlices/tempCredentialSlice";


const VerificationPage = ():JSX.Element =>{

    const navigate = useNavigate();

    const dispatch = useDispatch<DispatchType>();

    const [ changeEmailLoading, setChangeEmailLoading ] = useState(false);

    const tempUserCredentialEmail = useSelector( getTempCredentialUserEmail );
    const tempUserCredentialPassword = useSelector( getTempCredentialUserPassword );

    useEffect(()=>{
        if(!auth.currentUser){
            navigate('/signup')
        }
    },[])

    useEffect(()=>{
        const user = auth.currentUser;

        let timer = setInterval(async()=>{
            try{
                await user?.reload().catch(()=>{
                    toast("Error occured!, check your connection and reload the page",
                        {
                            icon: '😔',
                            style: {
                                borderRadius: '10px',
                                background: '#ffc6c6',
                                color: '#a21212',
                            },
                            duration: 5000
                        }
                    );
                    clearInterval(timer);
                }); 
            }catch{
                clearInterval(timer)
            }
            
            if(user?.emailVerified){
                try{
                    const credentialsPayload = {
                        user,
                        providerId:user.providerId
                    }

                    await dispatch(storeUserCredentials(credentialsPayload));

                    dispatch( clearUserTempCredential() );

                    navigate('/signup/welcome');
                    
                }catch{
                    toast("Error occured while saving user details, Please try reloading the page",
                        {
                            icon: '😔',
                            style: {
                            borderRadius: '10px',
                            background: '#ffc6c6',
                            color: '#a21212',
                            },
                        }
                    );

                    clearInterval(timer);
                }
            }
        },3000);
       
        return ()=>{
            clearInterval(timer);
        }
        
    },[])

    const emailId = auth.currentUser?.email;

    const changeEmailHandeler = async () =>{

        setChangeEmailLoading(true);

        try{
            if ( auth?.currentUser ){
                try{
                    const userCredential = EmailAuthProvider.credential(
                        tempUserCredentialEmail,
                        tempUserCredentialPassword
                    )
                    
                    await reauthenticateWithCredential(
                        auth.currentUser,
                        userCredential
                    )

                    await deleteUser(auth.currentUser)
                    
                }catch(err){
                    toast("Something went wrong!,check your connection and try again",
                        {
                            icon: '😔',
                            style: {
                                borderRadius: '10px',
                                background: '#ffc6c6',
                                color: '#a21212',
                            },
                        }
                    );

                    navigate('/signup');

                    return;
                }
            }

            await signOut(auth);
            
            dispatch( clearUserTempCredential() );

            navigate('/signup');
            
        }catch(err){
            toast("Something went wrong!,check your connection and try again",
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
            setChangeEmailLoading(false);
            // navigate('/signup');
        }
    }

    const loadingSpinner = (
        <span className="bg-transparent border-[3px] border-t-[#2955db] border-[#8fc0ff] animate-spin b h-5 w-5 inline-block rounded-full"></span>
    )

    return(
        <>
            <nav className="h-auto border-b-2 gray-border max-sm:bg-white dark:max-sm:bg-transparent  ">
                <LoginNav />
            </nav>
            <section className="mx-auto flex flex-col mt-10 gap-5 items-center bg-white dark:dark-mode-bg w-[35%] xl:w-[40%] lg:w-[55%] md:w-[65%] max-md:w-[80%] max-sm:w-[95%] border-2 gray-border py-10 px-10 max-sm:px-5 rounded-md max-sm:border-none">
                <h1 className="text-slate-700 dark:dark-mode-text text-center text-lg">
                    Open the mail sent to your email <span>{`(${emailId})`}</span>, and click the link to verify yourself.
                </h1>
                <button onClick={changeEmailHandeler} className=" flex items-center gap-2 px-4 py-2 bg-[#c0dbff] text-[#2955db] rounded-md active:scale-[.9] transition duration-75">
                    {
                        changeEmailLoading ?
                            loadingSpinner
                            :
                            ''
                    }
                    Change Email
                </button>
            </section>
        </>
    )
}

export default VerificationPage;