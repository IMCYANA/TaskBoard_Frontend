import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const fetchTask = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/tasks/${id}`);
                if (isMounted) {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                    setStatus(res.data.status);
                    setPriority(res.data.priority);
                    setDueDate(res.data.due_date ? new Date(res.data.due_date).toISOString().split("T")[0] : ""); 
                }
            } catch (error) {
                if (isMounted) {
                    setMessage("Error Fetching Task");
                }
            }
        };

        if (id) {
            fetchTask();
        }

        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting Data:", { title, description, status, priority, due_date: dueDate });

        try {
            await axios.put(`http://localhost:5000/update-tasks/${id}`, { 
                title, 
                description, 
                status, 
                priority, 
                due_date: dueDate ? new Date(dueDate).toISOString() : null 
            });
            navigate("/task");
        } catch (error) {
            setMessage("Error Updating Task. Please Try Again");
        }
    };

    return (
        <div className='container'>
            <h2>Update Task</h2>
            {message && <p className='text-danger'>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className='w-25 mb-3'>
                    <label className='form-label'>Title:</label>
                    <input
                        type='text'
                        className='form-control'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Description:</label>
                    <input
                        type='text'
                        className='form-control'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Status:</label>
                    <select
                        className='form-control'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="to_do">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="review">Review</option>
                    </select>
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Priority:</label>
                    <select
                        className='form-control'
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Due Date:</label>
                    <input
                        type='date'
                        className='form-control'
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    );
};

export default UpdateTask;
