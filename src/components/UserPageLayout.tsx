import { Outlet } from "react-router";
import Header from "./Header";
import { useLocation } from "react-router";
import Footer from "./Footer";

const UserPageLayout = () =>{
    
    const location = useLocation();

    return(
        <>
            <main className="w-full">
                {
                    location.pathname !== "/in/welcome" ? <Header /> : <></>
                }
                <Outlet />
                <section className={ location.pathname !== "/in/" && location.pathname !== "/in"  ? "max-lg:mb-20 " : "max-lg:mb-20 lg:hidden" }>
                    <Footer />
                </section>
            </main>
           
        </>
    )
}

export default  UserPageLayout;