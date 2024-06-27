import React, {useEffect, useRef, useState} from 'react';
import mainStore from "../store/mainStore";
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugins/http";

const UpdatePostPage = () => {

    const title = useRef()
    const image = useRef()
    const description = useRef()

    const {updatePost} = mainStore()
    const {id} = useParams()
    const nav = useNavigate()

    const [error, setError] = useState("")

    useEffect(() => {
        fetchPostData()
    }, []);

    function updateThis() {
        let options = {
            secretKey: "",
            title: "",
            image: "",
            description: "",
            id: ""
        }

        if(!validURL(image.current.value)) {
            setError("Invalid image URL")
            return
        }

        options.secretKey = localStorage.getItem("secret")
        options.title = title.current.value
        options.image = image.current.value
        options.description = description.current.value
        options.id = id

        http.post("/updatepost", options)
            .then(res => {
                if (res.success) {
                    nav("/")
                } else {
                    setError(res.message)
                }
            })
    }

    function fetchPostData() {
        title.current.value = updatePost.title
        image.current.value = updatePost.image
        description.current.value = updatePost.description
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
            <h2>Update Post</h2>
            <input ref={title} type="text" placeholder={"Title"}/>
            <input ref={image} type="text" placeholder={"Image URL"}/>
            <textarea ref={description} name="Description" id="desc" cols="30" rows="10" placeholder={"Description"}></textarea>
            <div>{error}</div>
            <div className="navButton" onClick={updateThis}>Submit</div>
        </div>
    );
};

export default UpdatePostPage;