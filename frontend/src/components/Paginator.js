import React, {useState, useEffect} from 'react'

function Paginator(props) {

    const [paginatorCount, setPaginatorCount] = useState([])
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
                // if (props.details.data_first_position === 0) {
                    
                // } else if (props.details.data_first_position !== 0) {
                    
                // }{
                    
                // }
            } else {
                
            }
            setPaginatorCount(pagenator_spans)
        }
        pages_generator()
    }, [])

    
    return (
        <div className="text-center">
                {/* <span>First</span> */}
                {/* {pages_generator()} */}
                {paginatorCount && paginatorCount.map(items => {return <span className="bg-blue-500 px-4 py-2 mx-2 rounded text-white">{items}</span>})}
                {console.log(paginatorCount)}
        </div>
    )
}

export default Paginator
