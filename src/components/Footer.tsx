import { myLinks } from "../assets/images";

const Footer = () =>{

    const date = new Date();
    const currentYear = date.getFullYear();

    return(
        <>
            <section className="mt-5">
                <p className="text-sm text-neutral-500 text-center ">Developed By Mohamed Nafees</p>
                <div className=" flex justify-center gap-2.5 mt-2">
                    {
                        myLinks.map( link =>(
                            <a key={link.id} href={link.url} target="_blank" className=" dark:hover:brightness-100 brightness-50 hover:brightness-0 transition block w-5">
                                <img className="w-full" src={link.icon} alt="" />
                            </a>
                        ))
                    }
                </div>
                <p className=" mt-2 text-sm text-neutral-500 text-center ">&copy; Hirely · {currentYear}</p>
            </section>
        </>
    )
}

export default Footer;