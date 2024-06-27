import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import http from "../plugins/http";
import Post from "../components/Post";

const UserPage = () => {

    const {username} = useParams()

    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        getUserPosts()
    }, []);

    function getUserPosts() {
        http.get("/getuserposts/" + username)
            .then(res => {
                setUserPosts(res.data)
            })
    }

    return (
        <div className={"container"}>
            {userPosts.map(post => <Post key={post.id} post={post} />)}
        </div>
    );
};

export default UserPage;