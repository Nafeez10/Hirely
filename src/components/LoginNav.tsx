import { Link } from "react-router-dom";

const LoginNav = () =>{

    return(
        <>
            <section className="p-3 md:px-10 flex items-center justify-between dark:dark-mode-bg ">
                <div>
                    <h1 className="text-3xl logo-font text-[#2977c9] text-center">Hirely.</h1>
                </div>
                <div className="flex flex-nowrap text-nowrap">
                    <Link className="flex items-center justify-center" to={'/signup'}>
                        <button className="text-lg tracking-wide font-[300] text-slate-500 max-sm:mr-4 mr-10 hover:text-slate-600">
                            Join now
                        </button>
                    </Link>
                    <Link className="flex items-center justify-center" to={'/signin'}>
                        <button className=" hover:bg-blue-50 signIn-border font-semibold border-none text-[#0a66c2] px-7 py-2 rounded-full">
                            Sign in
                        </button>
                    </Link>
                </div>
            </section> 
        </>
    )
}

export default LoginNav;