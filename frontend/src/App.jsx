import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import TodoList from './TodoList';
export default function App() {
 
  return (
    <div className="container mx-auto p-4  flex justify-center items-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
<TodoList/>
      </div>
    </div>
  );
}
