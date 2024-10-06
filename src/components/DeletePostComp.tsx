import { useEffect, useRef, useState } from "react";
import { deleteSvg, eclipseSvg } from "../assets/images";
import { deletePostData, selectById } from "../storeSlices/userPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";

type propsType = {
    postNo:number;
}

const DeletePostComp = ({postNo}:propsType) =>{
    const postToDelete = useSelector( (state:RootState) => selectById(state,postNo));
    const dispatch = useDispatch<DispatchType>()

    const [ showDeleteDiv, setShowDeleteDiv ] = useState<Boolean>(false);
    const deleteDiv = useRef(null);

    useEffect(()=>{
        const eventFunction = (e:MouseEvent)=>{
            if(e.target !== deleteDiv.current){
                setShowDeleteDiv(false);
            }
        }
        
        window.addEventListener("click",eventFunction)

        return ()=>{
            window.removeEventListener("click",eventFunction);
        }
    },[])
    const showDeleteHandeler = () => setShowDeleteDiv(!showDeleteDiv);

    // i just made that button propagate to its parent on its showDeleteHandeler 
    // thus because i can avoid to write another line of code to make the dropdown go hidden.
    const deletePostHandeler = async () =>{
        await dispatch(deletePostData(postToDelete));        
    }

    return(
        <>
            <div onClick={showDeleteHandeler} className=" eclipse-element w-7 relative">
                <a  className="w-full  cursor-pointer">
                    <img ref={deleteDiv} className={ showDeleteDiv ? " w-full opacity-100 svg" :"svg w-full opacity-60 hover:opacity-100 " } src={eclipseSvg} alt="" />
                </a>
                <div className={showDeleteDiv ? "delete-element py-2 dark:dark-mode-bg bg-white shadow-lg animate-[pop-in_.1s] " : "hidden"}>
                    <button onClick={deletePostHandeler} className=" gap-2 flex items-center justify-center active:scale-[.9] transition duration-75 dark:dark-mode-bg bg-white px-8 py-1 text-nowrap hover:bg-slate-50 w-full h-[80%] bor der-none rounded-sm  opacity-85 hover:opacity-100" >
                        <img className="w-7" src={deleteSvg} alt="" />
                        Delete Post
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeletePostComp;