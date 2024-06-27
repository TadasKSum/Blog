import React from 'react';
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const Post = ({post}) => {

    const {logged, setFavorites} = mainStore()

    const nav = useNavigate()

    function deletePost() {
        let deleteThis = {
            secretKey: "",
            id: ""
        }

        deleteThis.secretKey = localStorage.getItem("secret")
        deleteThis.id = post.id

        http.post("/deletepost", deleteThis)
            .then(res => {
                window.location.reload()
                nav("/")
            })
    }

    function userNav() {
        nav("/user/"+post.username)
    }

    function postNav() {
        nav("/post/"+post.username+"/"+post.id)
    }

    function stampToLT(timestamp) {
        // Create a Date object from the timestamp (in seconds)
        const date = new Date(timestamp); // Convert seconds to milliseconds

        // Options for formatting the date and time
        const options = {
            year: 'numeric', // 4-digit year (e.g., "2024")
            month: 'numeric', // numeric month
            day: 'numeric', // numeric day of the month (e.g., "26")
            hour: 'numeric', // numeric hour (e.g., "13" for 1 PM)
            minute: 'numeric', // numeric minute (e.g., "30")
            second: 'numeric', // numeric second (e.g., "45")
        };

        // Format the date according to the options
        const formattedDate = date.toLocaleString('lt-LT', options);

        return formattedDate;
    }

    function addFavorite() {
        let savedFaves = JSON.parse(localStorage.getItem("favorite"))
        let newFaves = []

        if (savedFaves === null) {
            newFaves.push(post)
            localStorage.setItem("favorite", JSON.stringify(newFaves))
            setFavorites(newFaves)
        } else {
            if (savedFaves.find(x => x.id === post.id) === undefined) {
                savedFaves.push(post)
                localStorage.setItem("favorite", JSON.stringify(savedFaves))
                setFavorites(savedFaves)
            } else {
                alert("Already in favorites")
            }
        }
    }

    return (
        <div className={"post"}>
            <div className={"image"}>
                <img src={post.image} alt=""/>
            </div>
            <div className={"title"} onClick={postNav}>{post.title}</div>
            <div className={"userLink"} onClick={userNav}>{post.username}</div>
            <div>{stampToLT(post.timestamp)}</div>
            {logged === post.username ? <button onClick={deletePost}>Delete</button> : ""}
            {logged && <button onClick={addFavorite}>Favorite</button>}
        </div>
    );
};

export default Post;