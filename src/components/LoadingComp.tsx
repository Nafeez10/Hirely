const LoadingComp = () =>{

    return(
        <>
            <section className=" flex flex-col items-center mt-20 mx-auto w-[35%] xl:w-[40%] lg:w-[55%] md:w-[65%] max-md:w-[80%] max-sm:w-full py-10 px-10 max-sm:px-0 rounded-md ">
                <h1 className="text-5xl logo-font dark:dark-mode-text text-[#117bec] text-center">Hirely.</h1>
                <div className="w-[50%] gray-bg dark:dark-mode-bg h-2 mt-5 rounded-full overflow-hidden">
                    <div className="bg-[#117bec] dark:bg-[#e9e9e9] w-[50%] rounded-full h-full translate-x-[100%] animate-[loadingAnim_.7s_ease-in-out_infinite_alternate]  "></div>
                </div>
            </section>

        </>
    )
}

export default LoadingComp;