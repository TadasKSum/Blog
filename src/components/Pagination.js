import React, {useEffect, useRef} from 'react';
import mainStore from "../store/mainStore";

const Pagination = () => {

    const {pages, setPageStart, setPageEnd, currentPage, setCurrentPage} = mainStore()

    const thePage = useRef()

    useEffect(() => {
        pageNav()
    }, [currentPage]);

    function pageNav() {
        let current = Number(thePage.current.value)
        let end = current * 10
        let start = end - 10
        setCurrentPage(current)
        setPageStart(start)
        setPageEnd(end)
    }

    function arrowNav(direction) {
        if(direction === "right") {
            // Return if at the end of available pages
            if(thePage.current.value === `${pages}`) return
            // Change page
            let number = Number(thePage.current.value)
            number += 1
            thePage.current.value = number
            // Call pageNav function to refresh page
            pageNav()
        } else {
            // Return if at the 1st page
            if(thePage.current.value === "1") return
            // Change page
            let number = Number(thePage.current.value)
            number -= 1
            thePage.current.value = number
            // Call pageNav function to refresh page
            pageNav()
        }
    }

    return (
        <div className={"pagination"}>
            <div className={"arrow"} onClick={() => arrowNav("left")}>&#x21D0;</div>
            <div>
                <input ref={thePage} type="number" defaultValue={1} onInput={pageNav} min={1} max={pages}/>
            </div>
            <div> of {pages && pages}</div>
            <div className={"arrow"} onClick={() => arrowNav("right")}>&#x21D2;</div>
        </div>
    );
};

export default Pagination;