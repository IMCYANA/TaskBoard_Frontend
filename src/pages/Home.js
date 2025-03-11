import React from 'react';
import { Link } from 'react-router-dom'; 

function Home() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <h1>Welcome To TaskBoard</h1>

                <div className="mb-3 mt-5">
                    <div className="d-flex justify-content-center">
                        <Link to="/create-tasks" className='btn btn-outline-primary mx-2'>
                            Create New Task
                        </Link>

                        <Link to="/Task" className='btn btn-outline-info mx-2'>
                            View Task
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
