import ReactPlayer from "react-player";

type propsType = {
    postVideoURL:string;
}

const PostVideoComp = ({postVideoURL}:propsType) =>{

    return(
        <>
            <div className="w-full max-sm:h-60 h-96 ">
                <ReactPlayer height={'100%'} width={'100%'} url={postVideoURL} controls={true} />
            </div>
        </>
    )
}

export default PostVideoComp;