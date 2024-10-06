import { useEffect } from "react"
import toast from "react-hot-toast"

type propsType = {
    message:string
}

const FeatureToDev = ({message="Feature needs to be delveloped."}:propsType) =>{

    useEffect(()=>{
        toast(
            "Feature yet needs to be developed!",
            {
              duration: 2000,
            }
        );
    },[message])

    return(
        <>
            <section className=" mx-auto mt-[10vh] dark:dark-mode-bg bg-white w-[35%] xl:w-[40%] lg:w-[55%] md:w-[65%] max-md:w-[80%] max-sm:w-[95%] border-2 gray-border px-10 pb-10 max-sm:px-4 rounded-md max-sm:border-none">
                <div className=" flex flex-col items-center justify-center">
                    <iframe src="https://lottie.host/embed/5ca3d996-24a3-4667-85a2-6580186215cf/p1qfEcS7Ux.json"></iframe>
                    <h1 className="text-center">
                        The&nbsp;
                        <span className="dark-blue-text">
                            {message}
                        </span>&nbsp;section feature needs to be developed. 
                    </h1>
                </div>
            </section>
        </>
    )
}

export default FeatureToDev;