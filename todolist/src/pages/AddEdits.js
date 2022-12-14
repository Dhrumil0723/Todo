import React, {useState, useEffect} from 'react';
import {useHistory ,useParams, Link} from 'react-router-dom';
import "./AddEdit.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    name: ""
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {name} = state;

    const history = useHistory();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({...resp.data[0]}))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name){
            toast.error("Please provide value into input filed");
        } else {
            if(!id) {
                axios.post("http://localhost:5000/api/post", {
                name
                }).then(() => {
                    setState({ name: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Todo added");
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                name
                }).then(() => {
                    setState({ name: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Todo updated");
            }
            
            setTimeout(() => history.push("/"),500);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }
    return (
        <div>
            <form style={{
                margin: "10% auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor='name'>Name: </label>
                <input type="text" id="name" placeholder='Name' name="name" value={name || ""} onChange={handleInputChange} />
                <input type="submit" value={id ? "Update" : "Save"} />
                <Link to="/">
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit