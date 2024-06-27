import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import mainStore from "../store/mainStore";

const FavoritePost = ({post}) => {

    const nav = useNavigate()

    const {setFavorites} = mainStore()

    function userNav() {
        nav("/user/"+post.username)
    }

    function postNav() {
        nav("/post/"+post.username+"/"+post.id)
    }

    function stampToLT(timestamp) {
        // Create a Date object from the timestamp (in seconds)
        const date = new Date(timestamp);

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

    function removeFavorite() {
        let getFaves = JSON.parse(localStorage.getItem("favorite"))
        getFaves = getFaves.filter(x => x.id !== post.id)
        localStorage.setItem("favorite", JSON.stringify(getFaves))
        setFavorites(getFaves)
    }

    return (
        <div className={"post"}>
            <div className={"image"}>
                <img src={post.image} alt=""/>
            </div>
            <div className={"title"} onClick={postNav}>{post.title}</div>
            <div className={"userLink"} onClick={userNav}>{post.username}</div>
            <div>{stampToLT(post.timestamp)}</div>
            <button onClick={removeFavorite}>Remove</button>
        </div>
    );
};

export default FavoritePost;