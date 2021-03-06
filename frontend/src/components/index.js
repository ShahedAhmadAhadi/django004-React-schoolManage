import React, { useState, useEffect } from "react";
import AddStudent from "./addStudent";
import Update from "./update";
// import form from './addStudent'
import { BrowserRouter, useHistory } from "react-router-dom";
import DataFetch from "./dataFetch_dataView";
import Paginator from "./Paginator";

function Index() {
    let history = useHistory();

    const [data, setData] = useState("");
    const [dataLengthDetails, setDataLengthDetails] = useState("");

    useEffect(() => {
        allData();
    }, []);

    let allData = async function () {
        let data = await fetch("http://localhost:8000/page=1", {
            headers: {
                Head: document.cookie,
            },
        });
        let allData = await data.json();
        console.log(allData);
        let lengthDetailOfData = allData.length_details_and_records_positions;
        setDataLengthDetails(lengthDetailOfData);
        if (allData.data) {
            let parsed_data = await JSON.parse(allData.data);
            setData(parsed_data);
            console.log(parsed_data);
        } else {
            history.push("/login");
        }
    };

    let allDataRequestFromPaginator = async function (page_num, search) {
        let data = undefined;
        if (value && search) {
            console.log("object");
            data = await fetch(
                `http://localhost:8000/search/${search}/?page=${page_num}`,
                {
                    headers: {
                        Head: document.cookie,
                    },
                }
            );
        } else {
            data = await fetch(`http://localhost:8000/page=${page_num}`, {
                headers: {
                    Head: document.cookie,
                },
            });
        }
        let allData = await data.json();
        console.log(allData);
        let lengthDetailOfData = allData.length_details_and_records_positions;
        setDataLengthDetails(lengthDetailOfData);
        if (allData.data) {
            let parsed_data = await JSON.parse(allData.data);
            setData(parsed_data);
            console.log(parsed_data);
        } else {
            history.push("/login");
        }
    };

    const [value, setValue] = useState("");
    let search = async function () {
        let searchValue = value;
        if (searchValue) {
            console.log(value);
            let data = await fetch(
                `http://localhost:8000/search/${searchValue}/?page=1`,
                {
                    headers: {
                        Head: document.cookie,
                    },
                }
            );
            let load_data = await data.json();
            setDataLengthDetails(
                load_data.length_details_and_records_positions
            );
            if (load_data.data) {
                let all_parsed_data = await JSON.parse(load_data.data);
                setData(all_parsed_data);
                console.log(all_parsed_data);
            } else {
                history.push("/login");
            }
        } else {
            allData();
        }
    };

    let logout = () => {
        let token = document.cookie;
        let splited = token.split(";");
        let splitEqual = {};
        for (const i in splited) {
            let splitArr = splited[i].split("=");
            splitEqual[splitArr[0].trim()] = splitArr[1].trim();
        }
        console.log(splitEqual);
        if (splitEqual["token"]) {
            const request = new Request(`http://localhost:8000/logout/`, {
                headers: { "Content-type": "application/json" },
            });
            fetch(request, {
                method: "POST",
                body: splitEqual.token,
            });
            history.push("/login");
        } else {
            document.cookie = `token=`;
            document.cookie = `username=`;
            document.cookie = `ip=`;
            history.push("/login");
        }
    };

    const [delId, setDelId] = useState(null);
    const [visibleDel, setVisibleDel] = useState(false);

    let closeDeleteModal = (id) => {
        if (id) {
            setDelId(id);
            setVisibleDel(true);
        } else {
            setDelId(null);
            setVisibleDel(false);
        }
    };

    let del = (delId) => {
        console.log(delId);
        const request = new Request(
            `http://localhost:8000/delete/?text=${delId}`,
            {
                headers: {
                    "Content-type": "application/json",
                    Head: document.cookie,
                },
            }
        );
        fetch(request, {
            method: "POST",
            body: JSON.stringify({
                cookie: document.cookie,
            }),
        });
        window.location.reload();
    };

    const [updateData, setUpdateData] = useState("");
    const [updateModal, setUpdateModal] = useState(false);

    let update = async (id) => {
        fetch(`http://localhost:8000/update/?text=${id}`, {
            headers: { Head: document.cookie },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    const data = JSON.parse(res.student);
                    setUpdateData(data);
                    if (updateData) {
                        updateShow();
                    }
                } else {
                    history.push("/login");
                }
            });
    };

    let updateShow = () => {
        setUpdateModal(!updateModal);
        console.log(updateModal);
    };

    const [visible, setVisible] = useState(false);

    let show = function () {
        setVisible(!visible);
    };
    return (
        <div className="main">
            <header className="flex bg-green-600 p-3 text-white justify-between">
                <p className="text-3xl font-bold">Students</p>
                <input
                    type="search"
                    placeholder="Search"
                    className="w-1/3 text-gray-600 rounded px-3"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyUp={() => search()}
                />
                <div className="m-2">
                    <a
                        href="#"
                        onClick={() => logout()}
                        className="px-6 bg-yellow-400 py-1.5 font-semibold rounded"
                    >
                        Logout
                    </a>
                </div>
            </header>
            <div className="text-right px-10 pt-5">
                <a
                    href="#"
                    className="bg-blue-600 px-6 py-1.5 font-semibold text-white rounded"
                    onClick={() => show()}
                >
                    Add student
                </a>
            </div>
            <table className="overflow-hidden rounded-lg m-5 box-border">
                <thead>
                    <tr className="bg-green-600 rounded-t-lg text-white font-bold text-2xl shadow-lg">
                        <td className="w-96 px-3 py-5 ">Name</td>
                        <td className="w-96">Details</td>
                        <td className="w-96">Actions</td>
                    </tr>
                </thead>
                <DataFetch
                    data={data}
                    delete={(id) => closeDeleteModal(id)}
                    update={(id) => update(id)}
                />
            </table>
            {dataLengthDetails && (
                <Paginator
                    details={dataLengthDetails}
                    requestOtherPages={(page_num) =>
                        allDataRequestFromPaginator(page_num, value)
                    }
                />
            )}
            <div className="border-t m-5 p-5 text-gray-500">
                Created-by : Shahed Ahmad Ahadi
            </div>

            {data.length < 1 && (
                <div className="text-purple-200 font-bold text-4xl mt-36 h-96 text-center">
                    No Result
                </div>
            )}
            {visible && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    {visible && <AddStudent visible={() => show()} />}
                </div>
            )}
            {updateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    {updateModal && (
                        <Update
                            visible={() => updateShow()}
                            data={updateData}
                        />
                    )}
                </div>
            )}
            {visibleDel && (
                <div
                    onClick={() => closeDeleteModal()}
                    className="fixed flex inset-0 bg-black bg-opacity-30 items-center justify-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white p-8 rounded text-center"
                    >
                        <p className="mb-7">
                            Are you sure you want to delete this record?
                        </p>
                        <div className="flex justify-around">
                            <a
                                href="#"
                                className="bg-yellow-500 px-6 py-1.5 rounded text-white font-semibold"
                                onClick={() => del(delId)}
                            >
                                Delete
                            </a>
                            <a
                                href="#"
                                className="bg-red-600 px-6 py-1.5 rounded text-white font-semibold"
                                onClick={() => closeDeleteModal()}
                            >
                                Back
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Index;
