import React from 'react'

function Paginator(props) {

    

    let pages_generator = () => {

        return (<div>returnd div</div>)
    }
    console.log(props.details)
    return (
        <tfoot>
            <tr>
                <td className="text-center" colSpan="3">
                    <span>First</span>
                    {pages_generator()}
                </td>
            </tr>
            
        </tfoot>
    )
}

export default Paginator
