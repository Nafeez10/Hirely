import { BadGatewaySvg } from "../assets/images";
import { auth } from "../config/firebase.config";
import Header from "./Header";
import LoginNav from "./LoginNav";

const Missing = () =>{

    return(
        <>
            {
                auth.currentUser ? <Header /> : <LoginNav />
            }
            <section className="m-auto w-[35%] xl:w-[40%] lg:w-[55%] md:w-[65%] max-md:w-[80%] max-sm:w-full mt-[10vh] ">
                <h2 className="text-center text-3xl text-slate-700 dark:dark-mode-text  ">This page doesn't exist</h2>
                <p className="text-center text-md text-slate-700 dark:dark-mode-d-text mt-2 ">Please check your URL or return to Hirely home.</p>
                <img src={BadGatewaySvg} alt="" />
            </section>
        </>
    )
}

export default Missing;