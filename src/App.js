import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import Task from "./pages/Task";
import CreateTask from "./pages/CreateTask"; 
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="task" element={<Task />} />
          <Route path="create-tasks" element={<CreateTask />} />
          <Route path="edit-tasks/:id" element={<UpdateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;