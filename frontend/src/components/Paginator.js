import React, { useState, useEffect } from "react";

function Paginator(props) {
    const [paginatorCount, setPaginatorCount] = useState([]);
    const [paginatorFirst, setPaginatorFirst] = useState(false);
    const [paginatorLast, setPaginatorLast] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [allPages, setAllPages] = useState([]);
    let pagenator_spans = [];

    useEffect(() => {
        let pages_generator = () => {
            console.log(props.details);
            let dataLength = props.details.all_data_length;
            console.log(dataLength, "datail");
            if (dataLength > 4) {
                console.log("lsjflsdjlfsjdlfjlsjflsjd");
                let pagesCount = Math.ceil(dataLength / 4);
                let numberOfPage = Math.ceil(
                    props.details.data_last_position / 4
                );
                setPageNumber(numberOfPage);
                for (let i = 1; i <= pagesCount; i++) {
                    pagenator_spans.push(i);
                }
                setAllPages(pagenator_spans);
                if (props.details.data_first_position > 5) {
                    setPaginatorFirst(true);
                } else {
                    setPaginatorFirst(false);
                }

                if (props.details.data_last_position <= dataLength - 4) {
                    setPaginatorLast(true);
                } else {
                    setPaginatorLast(false);
                }
            } else {
                setPaginatorLast(false);
            }
            setPaginatorCount(
                pagenator_spans.length > 3
                    ? paginationPerfector(Math.ceil(dataLength / 4), pageNumber)
                    : pagenator_spans
            );
        };
        let paginationPerfector = (numberOfPages, activePage) => {
            console.log(numberOfPages, activePage);
            let paginationArray = [];
            if (activePage === 1) {
                paginationArray.push(activePage, activePage + 1);
            } else if (numberOfPages === activePage) {
                console.log(activePage, "length");
                paginationArray.push(activePage - 1, activePage);
            } else {
                paginationArray.push(
                    activePage - 1,
                    activePage,
                    activePage + 1
                );
            }
            if (activePage - 2 > 0) {
                paginationArray.unshift("...");
            }
            if (numberOfPages - activePage >= 2) {
                paginationArray.push("...");
            }
            return paginationArray;
        };
        pages_generator();
    }, [props]);

    let paginatorElementStyles =
        "bg-white px-3 py-1 mx-2 rounded text-blue-500 border font-semibold border-blue-500 cursor-pointer";
    let activePaginatorElementStyles =
        "bg-blue-500 px-3 py-1 mx-2 rounded text-white border-2 border-blue-500";
    return (
        <div className="text-center">
            {/* <span>First</span> */}
            {/* {pages_generator()} */}
            {paginatorFirst && (
                <span
                    onClick={() => props.requestOtherPages(1)}
                    className={`${paginatorElementStyles} hover:bg-blue-600 hover:text-white`}
                >
                    First
                </span>
            )}
            {console.log(paginatorCount)}
            {paginatorCount &&
                paginatorCount.map((items) => {
                    return (
                        <span
                            key={items + Math.random()}
                            onClick={
                                items === pageNumber ||
                                items !== parseInt(items)
                                    ? undefined
                                    : () => props.requestOtherPages(items)
                            }
                            className={
                                items == pageNumber
                                    ? `${activePaginatorElementStyles}`
                                    : `${paginatorElementStyles} hover:bg-blue-600 hover:text-white`
                            }
                        >
                            {items}
                        </span>
                    );
                })}
            {paginatorLast && (
                <span
                    onClick={() =>
                        props.requestOtherPages(allPages[allPages.length - 1])
                    }
                    className={`${paginatorElementStyles} hover:bg-blue-600 hover:text-white`}
                >
                    Last
                </span>
            )}
        </div>
    );
}

export default Paginator;
