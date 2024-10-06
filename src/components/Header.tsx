import { useDispatch, useSelector } from "react-redux";
import { searchIcon, darkModeSvg, lightModeSvg } from "../assets/images";
import NavBar from "./NavBar";
import SignOut from "./SignOut";
import { getUserPhotoURL } from "../storeSlices/userSlice";
import { getTheme } from "../storeSlices/themeSlice";
import { DispatchType } from "../store/store";
import { setTheme } from "../storeSlices/themeSlice";
import toast from "react-hot-toast";

const Header = () =>{

    const dispatch = useDispatch<DispatchType>();

    const userImgURL = useSelector(getUserPhotoURL);
    const theme = useSelector(getTheme);

    const themeHandeler = () =>{
        const setThemePayload = theme == "dark" ? "light" : "dark";
        dispatch(setTheme(setThemePayload));
        if( theme == "light"){
            toast('Dark mode!',
                {
                  icon: '👏',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }
            );
        }
    }

    return(
        <>
            <nav className="px-10 sticky top-0 z-[1] max-md:px-5 h-20 flex items-center justify-between bg-white dark:dark-mode-bg text-sm w-full ">
                <section className="flex gap-4 items-center ">
                    <h1 className="text-3xl logo-font text-[#2977c9] dark:text-[#e9e9e9] text-center">Hirely.</h1>
                    <div className="relative grow ">
                        <input placeholder="Search" className="border-none max-sm:w-[45vw] focus:outline-[#2977c9] bg-slate-200 dark:bg-slate-700 pl-10 py-1 text-lg rounded-sm  " type="text" />
                        <div className="absolute top-[50%] translate-y-[-50%] w-10 ">
                            <img className="mx-auto svg" src={searchIcon} alt="" />
                        </div>
                    </div>
                </section>
                <section className="flex h-full items-center gap-0">
                    <section className=" text-[.8rem]  bg-white dark:dark-mode-bg dark:dark-mode-text max-lg:justify-between max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full flex gap-1.5 max-lg:pt-1 ">
                        <NavBar />
                        <div className=" relative user-hover">
                            
                            <SignOut userImgURL={userImgURL} />
                        </div>
                    </section>
                    <div className="flex flex-col max-lg:items-end justify-center bord er-2 w-[5.1rem] h-full  items-center max-l g:hidden dark:border-neutral-700 lg:border-l-2  ">
                        <button onClick={themeHandeler} className="dark-mode-btn bg-black dark:bg-white ">
                            <img className="h-7" src={ theme == "dark" ? lightModeSvg : darkModeSvg} alt="" />
                        </button>
                    </div>
                </section>
            </nav>
        </>
    )
}

export default Header;