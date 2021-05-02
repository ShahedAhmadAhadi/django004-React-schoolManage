import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function DataFetch() {

    let history = useHistory()

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
        <tbody>
            {Array.isArray(data) &&
                        data.map((student) => {
                            return (
                                <tr
                                    className="row font-bold px-2 py-3"
                                    key={student.pk}
                                >
                                    <td>
                                        <img
                                            width="200px"
                                            src={
                                                "http://localhost:8000/studentImages/" +
                                                student.fields.s_image
                                            }
                                            alt=""
                                            className="w-11/12"
                                        />
                                    </td>
                                    <td className="grid grid-cols-2 m-1 gap-2 my-5 w-full">
                                        <div>Name: </div>
                                        <div>{student.fields.s_name}</div>
                                        <div>father Name: </div>
                                        <div>
                                            {student.fields.s_father_name}
                                        </div>
                                        <div>Date of Birth: </div>
                                        <div>{student.fields.s_birth}</div>
                                        <div>Phone: </div>
                                        <div>{student.fields.s_phone}</div>
                                        <div> E-mail: </div>
                                        <div>{student.fields.s_email}</div>
                                    </td>
                                    <td>
                                        <a
                                            href="#"
                                            onClick={() => {
                                                // closeDeleteModal(student.pk);
                                            }}
                                            className="inline-block bg-red-600 text-white px-6 py-1.5 rounded mx-3"
                                        >
                                            Delete
                                        </a>
                                        <a
                                            href="#"
                                            onClick={() => {
                                                // update(student.pk);
                                            }}
                                            className="inline-block bg-yellow-500 text-white px-6 py-1.5 rounded"
                                        >
                                            Update
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
            </tbody>
    )
}

export default DataFetch
