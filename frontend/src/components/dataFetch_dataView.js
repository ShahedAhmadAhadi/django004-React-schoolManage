import React, {useState} from 'react'

function DataFetch() {

    const [data, setData] = useState("");

    useEffect(() => {
        all_data();
    }, []);

    let all_data = async function () {
        let data = await fetch("http://localhost:8000/", {
            headers: {
                Head: document.cookie,
            },
        });
        let all_data = await data.json();
        if (all_data.data) {
            let parsed_data = await JSON.parse(all_data.data);
            setData(parsed_data);
            console.log(parsed_data);
        } else {
            history.push("/login");
        }
    };
    
    return (
        <div>
            
        </div>
    )
}

export default DataFetch
