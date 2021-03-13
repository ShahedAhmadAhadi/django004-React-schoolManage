import React, {useState, useEffect} from 'react'

function Index() {

    const [data, setData] = useState('')

    useEffect(() => {
        async function data () { 
            fetch('http://localhost:8000/').then(res => res.json())
            .then(response => JSON.parse(response.data))
            .then(all_data => {
                setData(all_data)
                // console.log(all_data[0])
            })
         }
         data()
    }, [])

    // if (Array.isArray(data)) {
    //     console.log(data)
    //     data.forEach(element => {
    //         console.log(element);
    //     });
    // }


    return (
        <div className='main'>
            <header class="flex bg-green-600 p-3 text-white justify-between">
                <p class="text-3xl font-bold">Students</p>
                <input
                    type="search"
                    id="search"
                    autocomplete="off"
                    placeholder="Search"
                    class="w-1/3 text-gray-600 rounded px-3"
                />
                <div class="m-2">
                    <a
                        href="{% url 'logout' %}"
                        class="px-6 bg-yellow-400 py-1.5 font-semibold rounded"
                        >Logout</a
                    >
                </div>
                <a
                    href="{% url 'login' %}"
                    class="px-6 bg-yellow-400 py-1.5 font-semibold rounded"
                    >Login</a
                >
            </header>
            <div class="text-right px-10 pt-5">
                <a href="{% url 'add' %}" class=""
                ><button class="bg-blue-600 px-6 py-1.5 font-semibold text-white rounded">
                    Add student
                </button></a
            >
            </div>
            <div>
            <div class="bg-green-600 border-gray-200 border-t-2 px-3 py-5 rounded-t-lg text-white font-bold text-2xl">
                    <span class="w-1/6  inline-block">Name</span>
                    <span class="w-1/6 inline-block">Father Name</span>
                    <span>Phone</span>
                </div>
                {Array.isArray(data) && data.map(student => {
                    return( <a href="#" className="hover:bg-gray-100">
                    <div className="font-bold border-t-2 border-gray-200 px-2 py-3">
                        <span className="w-1/6 ml-2 inline-block"> {student.fields.s_name} </span>
                        <span className="w-1/6 inline-block"> {student.fields.s_father_name} </span>
                        <span className="w-1/6 inline-block">(+93) - {student.fields.s_phone}</span>
                    </div>
                    </a>)
                })}
            </div>
        </div>        
    )
}

export default Index
