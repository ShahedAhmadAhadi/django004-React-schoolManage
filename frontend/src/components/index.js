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
            <table class="overflow-hidden rounded-lg m-5 box-border">
                <tr class="bg-green-600 rounded-t-lg text-white font-bold text-2xl shadow-lg">
                    <td class="w-1/3 px-3 py-5 ">Name</td>
                    <td class="w-1/3">Details</td>
                    <td class="w-1/3">Actions</td>
                </tr>
                {Array.isArray(data) && data.map(student => {
                    return (
                        <tr className="row font-bold px-2 py-3">
                            <td>
                                <img src={'http://localhost:8000/studentImages/'+student.fields.s_image} alt="" className="w-11/12"/>
                            </td>
                            <td className="grid grid-cols-2 m-1 gap-2 my-5 w-full">
                                <div>Name: </div>
                                <div>{student.fields.s_name}</div>
                                <div>father Name: </div>
                                <div>{student.fields.s_father_name}</div>
                                <div>Date of Birth: </div>
                                <div>{student.fields.s_birth}</div>
                                <div>Phone: </div>
                                <div>{student.fields.s_phone}</div>
                                <div> E-mail: </div>
                                <div>{student.fields.s_email}</div>
                            </td>
                            <td>
                                <a href="/delete/{{all_item.s_roll}}/" className="inline-block bg-red-600 text-white px-6 py-1.5 rounded mx-3">Delete</a>
                                <a href="/update/{{all_item.s_roll}}/" className="inline-block bg-yellow-500 text-white px-6 py-1.5 rounded">Update</a>
                            </td>
                        </tr>
                        
                    )
                })}
                </table>
                {data.length < 1 && <div className="">No Result</div>}
            </div>
    )
}

export default Index

