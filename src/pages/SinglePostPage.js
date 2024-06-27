import React, {useEffect, useState} from 'react';
import SinglePost from "../components/SinglePost";
import {useParams} from "react-router-dom";
import http from "../plugins/http";

const SinglePostPage = () => {

    const {username, id} = useParams()

    const [thePost, setThePost] = useState(null)

    useEffect(() => {
        getSinglePost()
    }, []);

    function getSinglePost() {
        http.get("/getsinglepost/"+username+"/"+id)
            .then(res => {
                console.log(res)
                setThePost(res.data)
            })
    }

    return (
        <div>
            {thePost && <SinglePost key={thePost.id} post={thePost} />}
        </div>
    );
};

export default SinglePostPage;