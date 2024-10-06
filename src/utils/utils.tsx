import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase.config"
import toast, { Toast } from "react-hot-toast";
import { userSvg } from "../assets/images";

export const checkUserExistOrNot = async (email:string) =>{
    const userDocRef = doc(db,"usersEmail",email);

    const userDoc = await getDoc(userDocRef)

    const isExist = userDoc.exists();
    
    return isExist;
}

export const welcomeToast = (t:Toast,userName:string,userPhotoUrl:(string | null | undefined)) => (
    <div
        className={
            `${t.visible ? 'animate-enter' : 'animate-leave'}
            max-w-md w-full bg-[#ffffffc3] dark:bg-[#1d1d1dc3] backdrop-blur-sm dark:shadow-slate-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`
        }
    >
        <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={userPhotoUrl ? userPhotoUrl : userSvg}
                        alt=""
                    />
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:dark-mode-text">
                    {userName}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:dark-mode-d-text ">
                    Welocme to Hirely!
                    </p>
                </div>
            </div>
        </div>
        <div className="flex border-l border-gray-200 dark:dark-mode-border ">
            <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border hover:bg-[#e1f0ff] border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Close
            </button>
        </div>
    </div>
  )