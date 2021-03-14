import React, {useState, useEffect} from 'react'
import AddStudent from './addStudent'

function Index() {

    const [data, setData] = useState('')

    useEffect(() => {
        all_data()
    }, [])

    let all_data = async function () { 
        fetch('http://localhost:8000/').then(res => res.json())
            .then(response => JSON.parse(response.data))
            .then(all_data => {
                setData(all_data)
                console.log(all_data);
            })
    }

        let formData = function() {

            // fetch('http://localhost:8000/add/').then(res => res.json())
            // // .then(response => JSON.parse(response.data))
            // .then(addStudentData => {
            //     console.log(addStudentData);
            //     // FormData
            // } )
         }
    const [addStudent, setAddStudent] = useState()

    function a(e) {
        
    }

    const [value, setValue] = useState('')

    let search = async function (e) {
        let searchValue = value;
        if (searchValue) {
            console.log(value); 
            fetch(`http://localhost:8000/search/${searchValue}`).then(res => res.json())
            .then(response => JSON.parse(response.data))
            .then(all_data => {
                setData(all_data)
                console.log(all_data);
            })
        } else{
            all_data()
        }
        
    }


    return (
        <div className='main'>
            <header className="flex bg-green-600 p-3 text-white justify-between">
                <p className="text-3xl font-bold">Students</p>
                <input
                    type="search"
                    placeholder="Search"
                    className="w-1/3 text-gray-600 rounded px-3"
                    value = {value}
                    onChange = {(e) => setValue(e.target.value)}
                    onKeyUp={() => search()}
                />
                <div className="m-2">
                    <a
                        href="{% url 'logout' %}"
                        className="px-6 bg-yellow-400 py-1.5 font-semibold rounded"
                        >Logout</a
                    >
                </div>
                <a
                    href="{% url 'login' %}"
                    className="px-6 bg-yellow-400 py-1.5 font-semibold rounded"
                    >Login</a
                >
            </header>
            <div className="text-right px-10 pt-5">
                <a href="" className=""
                ><button className="bg-blue-600 px-6 py-1.5 font-semibold text-white rounded" onClick={() => setAddStudent(<AddStudent />)}>
                    Add student
                </button></a
            >
            </div>
            <div>
            <div className="bg-green-600 border-gray-200 border-t-2 px-3 py-5 rounded-t-lg text-white font-bold text-2xl">
                    <span className="w-1/6  inline-block">Name</span>
                    <span className="w-1/6 inline-block">Father Name</span>
                    <span>Phone</span>
                </div>
                {Array.isArray(data) && data.map(student => {
                    return( <a href="#" className="hover:bg-gray-100" key={student.pk}>
                    <div className="font-bold border-t-2 border-gray-200 px-2 py-3">
                        <span><img src={'http://localhost:8000/studentImages/'+student.fields.s_image} /></span>
                        <span className="w-1/6 ml-2 inline-block"> {student.fields.s_name} </span>
                        <span className="w-1/6 inline-block"> {student.fields.s_father_name} </span>
                        <span className="w-1/6 inline-block">(+93) - {student.fields.s_phone}</span>
                    </div>
                    </a>)
                })}
                {data.length < 1 && <div className="">No Result</div>}
            </div>
        </div>        
    )
}

export default Index
