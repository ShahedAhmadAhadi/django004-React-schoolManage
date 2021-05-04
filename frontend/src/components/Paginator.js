import React, {useState, useEffect} from 'react'

function Paginator(props) {

    const [paginatorCount, setPaginatorCount] = useState([])
    const [paginatorFirst, setPaginatorFirst] = useState()
    const [paginatorLast, setPaginatorLast] = useState()
    let pagenator_spans = [];

    useEffect(() => {
        let pages_generator = () => {
            console.log(props.details)
            if (props.details.all_data_length > 4) {
                let pages_count = Math.ceil(props.details.all_data_length / 4)
                console.log(pages_count)
                for (let i = 1; i <= pages_count; i++) {
                    pagenator_spans.push(i)
                }
                // console.log(props.details.all_data_length)
                if (props.details.data_first_position !== 0) {
                    setPaginatorFirst(true)
                }
                if (props.details.data_last_position !== props.details.all_data_length) {
                    setPaginatorLast(true)
                }
            } else {
                
            }
            setPaginatorCount(pagenator_spans)
        }
        pages_generator()
    }, [])

    let paginatorElementStyles = "bg-white px-3 py-1 mx-2 rounded text-blue-500 border font-semibold border-blue-500"
    let activePaginatorElementStyles = "bg-blue-500 px-3 py-1 mx-2 rounded text-white border-2 border-blue-500"
    return (
        <div className="text-center">
                {/* <span>First</span> */}
                {/* {pages_generator()} */}
                {paginatorFirst && <span className={`${paginatorElementStyles} hover:bg-blue-500 hover:text-white`}>First</span>}
                {paginatorCount && paginatorCount.map(items => {return <span className={`${paginatorElementStyles} hover:bg-blue-500 hover:text-white`}>{items}</span>})}
                {paginatorLast && <span className={`${paginatorElementStyles} hover:bg-blue-500 hover:text-white`}>Last</span>}

        </div>
    )
}

export default Paginator
