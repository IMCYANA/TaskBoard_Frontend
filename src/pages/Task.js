import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment'; 

class Task extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:5000/tasks");
    
            const sortedData = result.data.sort((a, b) => a.id - b.id);
    
            this.setState({ data: sortedData, loading: false });
        } catch (err) {
            console.error("Error fetching data", err);
            this.setState({ error: "Failed to load tasks", loading: false });
        }
    };
    
    deleteTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await axios.delete(`http://localhost:5000/delete-tasks/${id}`);
                this.fetchData();
            } catch (error) {
                console.error("Error deleting task: " + error);
                alert("Failed to delete task");
            }
        }
    };

    formatDate = (dateString) => {
        if (!dateString) return "-"; 
        return moment(dateString).format("YYYY-MM-DD"); 
    };

    render() {
        const { data, loading, error } = this.state;

        return (
            <>
                <div className='container text-center'>
                    <h1>Task List</h1>

                    {loading && <p>Loading tasks...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Due-Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <th>{item.id}</th>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.status}</td>
                                        <td>{item.priority}</td>
                                        <td>{this.formatDate(item.due_date)}</td>
                                        <td>
                                            <Link to={`/edit-tasks/${item.id}`} className="btn btn-outline-warning">
                                                Edit
                                            </Link>
                                            {" "}
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => this.deleteTask(item.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </>
        );
    }
}

export default Task;
