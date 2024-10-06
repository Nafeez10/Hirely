import './App.css'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import Home from './components/Home'
import { Route, Routes } from 'react-router'
import SignUpLayout from './components/SignUpLayout'
import VerificationPage from './components/VerifictionPage'
import SignInPage from './components/SignInPage'
import SignUpPage from './components/SignUpPage'
import { onAuthStateChanged, Unsubscribe } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { storeUserDetails } from './storeSlices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './config/firebase.config'
import LoadingComp from './components/LoadingComp'
import UserPageLayout from './components/UserPageLayout'
import FeatureToDev from './components/FeatureToDev'
import NewUserWelcome from './components/NewUserWelcome'
import { useLocation } from 'react-router'
import { getUserPostsData } from './storeSlices/userPostsSlice'
import { DispatchType } from './store/store'
import { getDoc } from 'firebase/firestore'
import { db } from './config/firebase.config'
import { doc } from 'firebase/firestore'
import { getTheme, themeType } from './storeSlices/themeSlice'
import Missing from './components/Missing'


function App() {
    const navigate = useNavigate();

    const dispatch = useDispatch<DispatchType>();

    const location = useLocation();

    const theme : themeType = useSelector(getTheme);

    const [ userLoading, setUserLoading ] = useState(false);

    useEffect(()=>{
        if (theme == "dark"){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        } 
    },[theme]);

    useEffect(()=>{
        setUserLoading(true);

        let unSubscribe:Unsubscribe;

        try{
            unSubscribe =
                onAuthStateChanged(auth,async (user)=>{
                    if(user){
                        const userDocRef = doc(db,"users",user.uid);

                        try{
                            const userDoc = await getDoc(userDocRef);
                            const docExist = userDoc.exists();

                            if(user?.emailVerified && user?.displayName && docExist ){
                                dispatch(storeUserDetails(user))
            
                                const getDataPayload = {
                                    uid:user.uid
                                }

                                await dispatch(getUserPostsData(getDataPayload));

                                if(location.pathname.includes("/in/")){
                                    navigate(location.pathname)
                                }
                                else{

                                    // toast.custom((t) => welcomeToast(t,user.displayName!,user.photoURL));
                                    
                                    navigate('/in/');
                                }
                            }
                            
                            else if(user?.emailVerified == false){
                                navigate('/signup/verification');
                                console.log("broooooo! iam")
                            }
                        
                            else if(!user?.displayName?.length || docExist ){
                                navigate('/signup/welcome');
                            }
                        }catch{
                            setUserLoading(false);

                            navigate('/');

                            toast.error('Something went wrong!')
                        }
                    }else{
                        const pathCheck = location.pathname.includes('/in/') || location.pathname.includes('/in');

                        if(!pathCheck){
                            navigate(location.pathname);
                        }else{
                            navigate('/')
                        }
                    }

                    setUserLoading(false);
                })
                
        }catch(err){
            toast.error('Something went wrong!');
        }

        return ()=>{
            unSubscribe();
        }

    },[])

    const appRoutingMechanism = (
        <>
            <Routes>
                <Route index element={<Login />} />
                <Route path='/signup' element={<SignUpLayout />} >
                    <Route index element={<SignUpPage />} />
                    <Route path='verification' element={<VerificationPage />} />
                    <Route path='welcome' element={<NewUserWelcome />} />
                </Route>
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/in' element={<UserPageLayout />} >
                    <Route index element={<Home />} />
                    <Route path='mynetwork'
                        element={
                            <FeatureToDev message='My Network' />
                        }
                    />
                    <Route path='jobs'
                        element={
                            <FeatureToDev message='Jobs' />
                        }
                    />
                    <Route path='messaging'
                        element={
                            <FeatureToDev message='Messaging' />
                        }
                    />
                    <Route path='notification'
                        element={
                            <FeatureToDev message='Notification' />
                        }
                    />
                </Route>
                <Route path='*' element={<Missing />} />
            </Routes>
        </>
    )

    return (
        <>
            <main>
                <Toaster />
                {
                    userLoading ? 
                        <LoadingComp /> : appRoutingMechanism
                }
            </main>
        </>
    )
}

export default App;