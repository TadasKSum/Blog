import React, {useRef} from 'react';
import mainStore from "../store/mainStore";
import http from "../plugins/http";

const Filter = () => {

    const {data, setData, setPages, filter, setFilter} = mainStore()

    const refs = {
        username: useRef(),
        title: useRef(),
        dateFrom: useRef(),
        dateTo: useRef()
    }

    function postsFilter() {
        // Check if filter is applied
        if (filter) return
        // Get copy of data
        let allPosts = [...data]
        // Set filter parameters
        const params = {
            username: refs.username.current.value,
            title: refs.title.current.value,
            dateFrom: refs.dateFrom.current.valueAsNumber,
            dateTo: refs.dateTo.current.valueAsNumber
        }
        // Set filter conditions
        if(params.username) {
            allPosts = allPosts.filter(x => x.username.toLowerCase().includes(String(params.username.toLowerCase())))
        }
        if(params.title) {
            allPosts = allPosts.filter(x => x.title.toLowerCase().includes(String(params.title.toLowerCase())))
        }
        if(params.dateFrom) {
            allPosts = allPosts.filter(x => x.timestamp >= params.dateFrom)
        }
        if(params.dateTo) {
            allPosts = allPosts.filter(x => x.timestamp <= params.dateTo)
        }

        // Apply filter
        setFilter(true)
        countPages(allPosts)
        setData(allPosts)
    }

    function clearFilter() {
        refs.username.current.value = ""
        refs.title.current.value = ""
        refs.dateFrom.current.valueAsNumber = undefined
        refs.dateTo.current.valueAsNumber = undefined

        http.get("/getallposts")
            .then(res => {
                setData(res.data)
                countPages(res.data)
                setFilter(false)
            })
    }

    function countPages(array) {
        let pagesCount = Math.ceil(array.length / 10)
        setPages(pagesCount)
    }

    return (
        <div className={"filter"}>
            <input ref={refs.username} type="text" placeholder={"Username"}/>
            <input ref={refs.title} type="text" placeholder={"Title"}/>
            <input ref={refs.dateFrom} type="date" min="2020-11-30"/>
            <input ref={refs.dateTo} type="date"/>
            <div className="navButton" onClick={postsFilter}>Filter</div>
            <div className="navButton" onClick={clearFilter}>Clear</div>
        </div>
    );
};

export default Filter;