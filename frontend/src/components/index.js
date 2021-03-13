import React, {useState} from 'react'

function Index() {
    let data = async function () { 
        fetch('http://localhost:8000/').then(res => res.json()).then(response => JSON.parse(response.data))
        .then(all_data => console.log(all_data))
     }
    
    

    const [j, setData] = useState(data)

    

    return (
        <div>
           {/* {j} */}
        </div>
    )
}

export default Index
