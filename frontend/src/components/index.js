import React, {useState, useEffect} from 'react'
import AddStudent from './addStudent'
import Update from './update'
// import form from './addStudent'
import {BrowserRouter,useHistory} from 'react-router-dom'


function Index() {
    let history = useHistory()
    // let history=useHistory()

    // window.setInterval(()=>{
    //     let userEntry=0
    //     let token = ''
    //     // localStorage.setItem('token', '')
    //     token=localStorage.getItem("token")
    //     if (token.length < 1){
    //         userEntry+=1
    //         if(userEntry===1){
    //         history.push("/")
    //     }
    //     }
    // },5)
    const [data, setData] = useState('')

    useEffect(() => {
        all_data()
    }, [])

    let all_data = async function () { 
        fetch('http://localhost:8000/',{
            headers: {
                'Head': document.cookie
            }
        })
        .then(res => res.json())
        .then(response => JSON.parse(response.data))
        .then(all_data => {
            setData(all_data)
            console.log(all_data);
        })
    }
    

    const [value, setValue] = useState('')

    let search = async function (e) {
        let searchValue = value;
        if (searchValue) {
            console.log(value); 
            fetch(`http://localhost:8000/search/${searchValue}`,{
                headers: {
                    'Head': document.cookie
                }
            })
            .then(res => res.json())
            .then(response => JSON.parse(response.data))
            .then(all_data => {
                // if (all_data == 'false' || all_data == 'wrong_request') {
                //     history.push('/login')
                // }
                setData(all_data)
                console.log(all_data);
            })
        } else{
            all_data()
        }
        
    }

    let logout = () => {
        let token = document.cookie
        let splited = token.split(';')
        let splitEqual = {}
        for (const i in splited) {
            let splitArr = splited[i].split('=')
            splitEqual[splitArr[0].trim()] = splitArr[1].trim()
        }
        console.log(splitEqual)
        if (splitEqual['token']) {
            const request = new Request(`http://localhost:8000/logout/`,
                {headers: {'Content-type': 'application/json'}})
            fetch(request, {
                method: "POST",
                body: splitEqual.token
            })
            history.push('/login')
        }else{
            document.cookie = `token=`;
            document.cookie = `username=`;
            document.cookie = `ip=`;
            history.push('/login')
        }
        
    }

    const [delId, setDelId] = useState(null)
    const [visibleDel, setVisibleDel] = useState(false)

    let deleteModal = (id) => {
        if (id) {
            setDelId(id)
            setVisibleDel(true)
        }
        else{
            setDelId(null)
            setVisibleDel(false)
        }
    }



    let del = (delId) => { 
        console.log(delId)
        const request = new Request(`http://localhost:8000/delete/?text=${delId}`,
        {headers: {'Content-type': 'application/json',
                    'Head': document.cookie}})
            fetch(request, {
                method: "POST",
                body: JSON.stringify({
                    'cookie': document.cookie
                }),
            })
     }

    const [updateData, setUpdateData] = useState('')
    const [updateModal, setUpdateModal] = useState(false)



    let update = async (id) => {
        fetch(`http://localhost:8000/update/?text=${id}`,
        {headers: {'Head': document.cookie}})
        .then(response => response.json())
        .then(res => {
            if (res){
            const data = JSON.parse(res.student)
            setUpdateData(data);
            if(updateData){
                updateShow()
            }
        } else {
            history.push('/login')
        }})             
    }

    let updateShow = () => {
        setUpdateModal(!updateModal)
        console.log(updateModal)
    }

    const [visible, setVisible] = useState(false)

    let show = function () {
        setVisible(!visible)
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
                        href="#"
                        onClick={() => logout()}
                        className="px-6 bg-yellow-400 py-1.5 font-semibold rounded"
                        >Logout</a
                    >
                </div>
            </header>
            <div className="text-right px-10 pt-5">
                <a className="bg-blue-600 px-6 py-1.5 font-semibold text-white rounded" onClick={() => show()}>
                    Add student
                </a>
            </div>
            <table className="overflow-hidden rounded-lg m-5 box-border">
                <thead>
                    <tr className="bg-green-600 rounded-t-lg text-white font-bold text-2xl shadow-lg">
                        <td className="w-1/3 px-3 py-5 ">Name</td>
                        <td className="w-1/3">Details</td>
                        <td className="w-1/3">Actions</td>
                    </tr>
                </thead>
                    <tbody>
                        {Array.isArray(data) && data.map(student => {
                        return (
                            <tr className="row font-bold px-2 py-3" key={student.pk}>
                                <td>
                                    <img width="200px" src={'http://localhost:8000/studentImages/'+student.fields.s_image} alt="" className="w-11/12"/>
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
                                    <a href="#" onClick={() => {deleteModal(student.pk)}} className="inline-block bg-red-600 text-white px-6 py-1.5 rounded mx-3">Delete</a>
                                    <a href="#" onClick={() => {update(student.pk)}} className="inline-block bg-yellow-500 text-white px-6 py-1.5 rounded">Update</a>
                                </td>
                            </tr>  
                        )
                    })}
                    </tbody>
                </table>
                {data.length < 1 && <div className="">No Result</div>}
                {visible && <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    {visible && <AddStudent visible={() => show()} />}
                </div>}
                {updateModal && <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    {updateModal && <Update visible={() => updateShow()} data={updateData} />}
                </div>}
                {visibleDel && <div>
                    <p>
                        Are you sure you want to delete this record?
                    </p>
                    <a href="#"  onClick={() => del(delId)}>submit</a>
                </div>}
            </div>
    )
}

export default Index
