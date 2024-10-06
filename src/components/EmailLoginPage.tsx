import { ChangeEvent, MouseEvent } from "react";
import GoogleLoginBtn from "./GoogleLoginBtn";
import { Link } from "react-router-dom";

type propsType = {
    loginType? : string,
    email:string,
    setEmail: React.Dispatch<React.SetStateAction<string>>, 
    password:string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    btnClickHandeler(e:MouseEvent<HTMLButtonElement,MouseEvent>):void
}

const EmailLoginPage = ({ loginType = "signup", email, password, setEmail, setPassword, btnClickHandeler }:propsType) =>{

    const signinType = loginType == "signin" ? true : false; 

    const emailHandeler = (e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const passwordHandeler = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);


    return(
        <>
            <section className="h-[90vh]  flex justify-center items-center  max-sm:bg-w hite dark:m ax-sm:bg-black ">
                <div className="bg-white dark:dark-mode-bg  w-[35%] xl:w-[40%] lg:w-[55%] md:w-[65%] max-md:w-[80%] max-sm:w-[95%] border-2 gray-border py-10 px-10 max-sm:px-0 rounded-md max-sm:border-none ">
                    <h1 className="text-2xl max-sm:text-xl text-center font-[600] font-sans text-slate-800 dark:dark-mode-text ">Make the most of your professional life</h1>
                    <h2 className="text-xl mt-5 text-center tracking-wide">
                        {
                            signinType ? "Sign in" : "Join Hirely."
                        }
                    </h2>
                    <div className="px-10">
                        <form>
                            <div className="flex flex-col gap-2 mt-5">
                                <label htmlFor="email" className="font-sans font-[600] dark:dark-mode-text text-slate-700">Email</label>
                                <input value={email} onChange={emailHandeler} id="email" placeholder="Enter your email" className="dark:bg-slate-700 rouned-md border-none focus:outline-[#2977c9] bg-slate-200 px-5 py-2 text-lg rounded-sm  " type="text" />

                            </div>
                            <div className="flex flex-col gap-2 mt-5">
                                <label htmlFor="password" className="font-sans font-[600] dark:dark-mode-text text-slate-700">Password</label>
                                <input value={password} onChange={passwordHandeler} id="password" placeholder="Enter your password" className="dark:bg-slate-700 rouned-md border-none focus:outline-[#2977c9] bg-slate-200 px-5 py-2 text-lg rounded-sm  " type="password" />

                            </div>
                            <p className=" mt-5 text-[.75rem] text-center font-sans font-[400]">
                                {
                                    signinType ? 
                                        (
                                            <span>
                                                Dont't have an account? , then&nbsp; 
                                                <Link className="dark-blue-text hover:underline" to={'/signup'}>
                                                    create one.
                                                </Link>
                                            </span>
                                        )
                                        :
                                        (
                                            <span>
                                                By clicking Agree & Join or Continue, you agree to the Hirely <a className="text-[#2977c9]">User <br /> Agreement, Privacy Policy,</a> and <a className="text-[#2977c9]">Cookie Policy</a>.
                                            </span>
                                        )
                                }
                            </p>
                            <button onClick={(e:any)=>btnClickHandeler(e)} className="blue-bg hover:dark-blue-bg transition duration-100 text-white w-full rounded-full py-[.85rem] mt-5">
                                {
                                    signinType ? "Sign In" : "Agree & Join"  
                                }
                            </button>
                        </form>
                        <span className="h-[1px] border-t-[1.6px] dark:dark-mode-border gray-border w-full block mt-5 relative">
                            <span className="text-slate-600 absolute top-[50%] left-[50%] -translate-y-[60%] -translate-x-[50%] bg-white dark:dark-mode-bg px-4 py-0 ">or</span>
                        </span>
                        <div className="mt-5">
                            <GoogleLoginBtn btnType="login" />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default EmailLoginPage;