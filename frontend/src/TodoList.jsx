import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import axios from "axios";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [taskstatus, setTaskstatus] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [nameedit, setNameEdit] = useState('');

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleeditname = (e) => {
    setNameEdit(e.target.value);
  }

  const handleAddTodo = async () => {
    if (todoText) {
      try {
        await axios.post(`http://localhost:3000/v1/tasks/`, {
          name: todoText,
          completed: taskstatus
        });
        fetchData();
        setTodoText('');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          console.log(error);
        }
      }
    }
  };

  const checkedbutton = () => {
    setTaskstatus(!taskstatus);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/v1/tasks");
      const { getdata } = response.data;
      setTodos(getdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/v1/tasks/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  const updateData = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/v1/tasks/${id}`, {
        name: nameedit,
        completed: taskstatus,
      });
      fetchData();
      closeModal();
    } catch (error) {
      console.log(error)
    }
  }

  const openModal = (task) => {
    setIsOpen(true);
    setTaskId(task._id);
    setNameEdit(task.name);
    setTaskstatus(task.completed);
  };

  const handleSave = () => {
    updateData(taskId);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-md mr-2"
          placeholder="Enter Task Name"
          value={todoText}
          onChange={handleInputChange}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Add
        </button>
        <input
          type="checkbox"
          onChange={checkedbutton}
          checked={taskstatus}
          className="ml-2 mr-1"
        />
        <label htmlFor="">Completed Home</label>
      </div>

      <div>
        {todos.map((task) => (
          <div key={task._id} className="flex items-center justify-between mb-4 bg-purple-100 rounded-md p-4">
            <div>
              {task.completed ? <s>{task.name}</s> : task.name}
            </div>
            <div>
              <button
                onClick={() => deleteData(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600 transition duration-300 ease-in-out"
              >
                <MdDelete />
              </button>
              <button
                onClick={() => openModal(task)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out"
              >
                <CiEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Edit Name</h3>
                    <div className="mt-2 flex gap-2 align-items-center">
                      <input
                        type="text"
                        className="w-full py-2 px-3 border border-gray-300 rounded-md"
                        placeholder="Enter Name of the task"
                        value={nameedit}
                        onChange={handleeditname}
                      />

                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          onChange={checkedbutton} // Toggle task status when radio button is clicked
                          checked={taskstatus} // Bind the checked state to the task status
                        />
                        <label className='align-middle ml-2'>Completed</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
