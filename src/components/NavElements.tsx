import { Link } from "react-router-dom";

type propsType = {
    navImg:string,
    label:string,
    path:string,
    activeNav:string,
    setActiveNav:React.Dispatch<React.SetStateAction<string>>
}

const NavElements = ( { label, navImg, path, activeNav, setActiveNav }:propsType ) =>{

    const navChangeHandeler = () =>{
        if (activeNav == path){
            return;
        }
        setActiveNav(path);
    }
    
    return(
        <>  
            <Link onClick={navChangeHandeler} className={ activeNav == path ? "nav opacity-100 active-nav relative" : "nav opacity-55 hover:opacity-75"} to={path}>
                    <img className="w-6" src={navImg} alt="" />
                    <span className="text-nowrap   ">
                        {label}
                    </span>
            </Link>
        </>
    )
}

export default NavElements;