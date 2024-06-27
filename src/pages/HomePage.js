import React, {useEffect} from 'react';
import http from "../plugins/http";
import mainStore from "../store/mainStore";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";

const HomePage = () => {

    // Zustand state storage
    const {data, setData, setPages, pageStart, pageEnd, setLogged, setFavorites, logged, setFilter} = mainStore()

    useEffect(() => {
        getAllPosts()
        checkLogin()
        loadFavorites()
        setFilter(false)
        if (data !== null) countPages(data)
    }, []);

    function getAllPosts() {
        http.get("/getallposts")
            .then(res => {
                setData(res.data)
                countPages(res.data)
            })
    }

    function checkLogin() {
        let username = localStorage.getItem("username")
        if (username !== undefined) {
            setLogged(username)
        }
    }

    function loadFavorites() {
        let faves = JSON.parse(localStorage.getItem("favorite"))
        if(faves !== null) {
            setFavorites(faves)
        } else {
            setFavorites([])
        }
    }

    function countPages(array) {
        let pagesCount = Math.ceil(array.length / 10)
        setPages(pagesCount)
    }

    return (
        <div>
            {logged && <Filter/>}
            <div className="container">
                {data && data.slice(pageStart, pageEnd).map(post => <Post key={post.id} post={post} />)}
            </div>
            <Pagination/>
        </div>
    );
};

export default HomePage;