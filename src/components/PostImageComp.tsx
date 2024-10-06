type propsType = {
    postImageURL:string
}

const PostImageComp = ({postImageURL}:propsType) =>{

    return(
        <>
            <div className="w-full max-h-96 max -sm:h-56 max -md:h -64 max -lg:h -80 h-96 ">
                <img loading="lazy" className=" w-full h-full object-cov er max-lg:obje ct-contain object-scale-down " src={postImageURL} alt="" />
            </div>
        </>
    )
}

export default PostImageComp;