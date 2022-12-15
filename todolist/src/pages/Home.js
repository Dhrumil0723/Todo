import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./Home.css";
import {toast} from "react-toastify";
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://172.93.101.179:5000/api/get");
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
    }, []);

    const deleteContact = (id) => {
        if(window.confirm("are you sure you want to delete?")){
            axios.delete(`http://172.93.101.179:5000/api/remove/${id}`);
            toast.success("Deleted");
            setTimeout(() => loadData(), 500);
        }
    }
    return(
        <div style={{marginTop: '5%'}}>

            <Link to="/add">
                <button className='btn btn-contact'>Add</button>
            </Link>

            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: 'center'}}></th>
                        <th style={{textAlign: 'center'}}>No.</th>
                        <th style={{textAlign: 'center'}}>TODO List</th>
                        <th style={{textAlign: 'center'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return(
                            <tr key={item.id}>
                                <td><input type="checkbox" /></td>
                                <th scope='row'>{index+1}</th>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteContact(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home