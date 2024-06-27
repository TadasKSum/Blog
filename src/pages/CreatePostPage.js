import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const CreatePostPage = () => {

    const [error, setError] = useState("")

    const title = useRef()
    const image = useRef()
    const description = useRef()

    const nav = useNavigate()

    function createPost() {

        let newPost = {
            secretKey: "",
            title: "",
            image: "",
            description: ""
        }

        // Check if image url is valid url
        if (!validURL(image.current.value)) {
            setError("Invalid image URL")
            return
        }

        newPost.secretKey = localStorage.getItem("secret")
        newPost.title = title.current.value
        newPost.image = image.current.value
        newPost.description = description.current.value

        http.post("/createpost", newPost)
            .then(res => {
                setError(res.message)
                if (res.success) {
                    nav("/")
                }
            })
    }

    function validURL(string) {
        try {
            new URL(string)
            return true
        } catch (err) {
            return false
        }
    }

    return (
        <div className={"createPost"}>
            <h2>Create Post</h2>
            <input ref={title} type="text" placeholder={"Title"}/>
            <input ref={image} type="text" placeholder={"Image URL"}/>
            <textarea ref={description} name="Description" id="desc" cols="30" rows="10" placeholder={"Description"}></textarea>
            <div>{error}</div>
            <div className="navButton" onClick={createPost}>Submit</div>
        </div>
    );
};

export default CreatePostPage;