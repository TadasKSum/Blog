import React from 'react';
import mainStore from "../store/mainStore";
import {useNavigate} from "react-router-dom";

const SinglePost = ({post}) => {

    const {logged, setUpdatePost} = mainStore()

    const nav = useNavigate()

    function stampToLT(timestamp) {
        // Create a Date object from the timestamp (in seconds)
        const date = new Date(timestamp); // Convert seconds to milliseconds

        // Options for formatting the date and time
        const options = {
            year: 'numeric', // 4-digit year (e.g., "2024")
            month: 'long', // full month name (e.g., "June")
            day: 'numeric', // numeric day of the month (e.g., "26")
            hour: 'numeric', // numeric hour (e.g., "13" for 1 PM)
            minute: 'numeric', // numeric minute (e.g., "30")
            second: 'numeric', // numeric second (e.g., "45")
        };

        // Format the date according to the options
        const formattedDate = date.toLocaleString('lt-LT', options);

        return formattedDate;
    }

    function userNav() {
        nav("/user/"+post.username)
    }

    function updateNav(item) {
        let update = {
            title: "",
            image: "",
            description: ""
        }

        update.title = item.title
        update.image = item.image
        update.description = item.description

        setUpdatePost(update)
        nav("/update/"+post.id)
    }

    return (
        <div className={"singlePost"}>
            <div className={"postBox"}>
                <img src={post.image} alt="img"/>
            </div>
            <div className={"postBox"}>
                <h3>{post.title}</h3>
                <div className={"userLink"} onClick={userNav}>{post.username}</div>
                <div>{stampToLT(post.timestamp)}</div>
                <div>{post.description}</div>
                {post.username === logged ? <div className={"navButton"} onClick={()=> updateNav(post)}>Update</div> : ""}
            </div>
        </div>
    );
};

export default SinglePost;