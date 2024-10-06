import { useState } from "react";
import { navLinks } from "../assets/images";
import NavElements from "./NavElements";
import { useLocation } from "react-router";

const NavBar = () =>{
    
    const location = useLocation();

    const [activeNav, setActiveNav] = useState(location.pathname);

    return(
        <>
            {
                navLinks.map( item => (
                    <NavElements key={item.label} activeNav={activeNav} setActiveNav={setActiveNav} path={item.path} label={item.label} navImg={item.img} />
                ))
            }
        </>
    )
}

export default NavBar;