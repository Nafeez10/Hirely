import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

type propsType ={
    postDate:number
}

const TimeAgo = ({postDate}:propsType) =>{

    const [ postTimeAgo, setpostTimeAgo ] = useState<string>(); 

    useEffect(()=>{
        let currentAgo = formatDistanceToNow(postDate);
            
        setpostTimeAgo(currentAgo);

        let timer = setInterval(()=>{
            let currentAgo = formatDistanceToNow(postDate);
            
            setpostTimeAgo(currentAgo);
        },30000)

        return ()=>{
            clearInterval(timer);
        }

    },[postDate])

    return(
        <>
            <span>{postTimeAgo} Ago</span>
        </>
    )
}

export default TimeAgo;