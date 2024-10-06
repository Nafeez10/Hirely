import { loginHero } from "../assets/images";
import EmailLoginBtn from "./EmailLoginBtn";
import GoogleLoginBtn from "./GoogleLoginBtn";
import LoginNav from "./LoginNav";

const Login = () =>{

    return (
        <>
            <nav className=" border-b-2 gray-border">
                <LoginNav />
            </nav>
            <section className="relative h-[80vh] min-h-[500px]  md:px-10 ">
                <div className="max-md:h-full md:w-[50%] max-md:items-center max-md:flex-col max-md:flex max-md:justify-center mt-14">
                    <div className="max-md:h-full sm:h-full max-md:flex max-md:flex-col mb-10 max-md:justify-center max-md:items-center md:w-50% md:h-[90%] ">
                        <h1 className=" text-[#2977c9]  max-md:text-center md:w-[80%] max-md:text-xl  md:text-6xl font-sans font-light  tracking-tight">Welcome to your professional community</h1>
                        <div className=" md:w-[50%] max-sm:w-[100%] sm:w-[80%] h-full  md:absolute md:top-[50%] md:translate-y-[-60%] md:right-0 px-3 mt-5">
                            <img className="max-md:w-full h-full max-md:h-full md:w-[40vw] min-w-[300px] min-h-[300px]" src={loginHero} alt="" />
                        </div>
                    </div>


                    <div className="w-full max-md:px-4 md:mt-32 flex max-md:justify-center items-center flex-col md:items-start ">
                        <GoogleLoginBtn />
                        <EmailLoginBtn />
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login;