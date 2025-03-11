import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("to_do");
    const [priority, setPriority] = useState("low");
    const [dueDate, setDueDate] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/create-tasks", { title, description, status, priority, dueDate });
            navigate('/'); 

        } catch (error) {
            setMessage("Error creating, please try again");
        }
    }

    return (
        <div className='container'>
            <h1>Create Task</h1>
            {message && <p className='text-danger'>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="w-25 p-3">
                    <label className='form-label'>Title: {title}</label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>Description: {description}</label>
                    <input type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="to_do">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="review">Review</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Priority:</label>
                    <select
                        className="form-control"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Due Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-success">Create Task</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTask;