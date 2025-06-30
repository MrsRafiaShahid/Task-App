import React, {  useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { getLocalDataStorage, setLocalDataStorage } from "./LocalStorage";
import DateTime from "./DateTime";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [task, setTask] = useState(()=>getLocalDataStorage())
 

  const handleInputChange = (value) => {
    setInputValue(value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    if (task.some((t) => t.text === inputValue)) {
      return setInputValue("");
    }
    setTask((prevTask) => [
      ...prevTask,
      { id: Date.now(), text: inputValue, checked: false },
    ]);
    setInputValue("");
  };
  setLocalDataStorage(task)

  const handleEditBtn = (curTask) => {
    setEditId(curTask.id);
    setInputValue(curTask.text);
  };

  const handleUpdateTask = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    setTask((prevTask) =>
      prevTask.map((t) => (t.id === editId ? { ...t, text: inputValue } : t))
    );
    setEditId(null);
    setInputValue("");
  };
  const handleDeleteBtn = (value) => {
    const deleteTask = task.filter((curTask) => curTask.id !== value.id);
    setTask(deleteTask);
  };

  const handleCheckedBtn = (value) => {
    const checkedTask = task.map((curTask) =>
      curTask.id === value.id
        ? { ...curTask, checked: !curTask.checked }
        : curTask
    );
    setTask(checkedTask);
  };

  const handleClearBtn = () => {
    setTask([]);
  };

  return (
    <>
      <section className=" w-screen md:w-full flex flex-col items-center  justify-center mt-10 ">
        <header className="mb-5 text-center flex flex-col gap-2 items-center justify-center">
          <h1 className="text-4xl text-violet-400 font-extrabold">
            Task Management
          </h1>
          <DateTime/>
        </header>
        <form
          className="flex justify-between"
          onSubmit={editId ? handleUpdateTask : handleFormSubmit}
        >
          <div className="input w-1/2">
            <input
              type="text"
              id="todo"
              className=" bg-[#f2f3f4] max-w-2xs  px-4.5 py-1.5 text-xl font-light outline-none border-none rounded-bl-2xl rounded-tl-2xl"
              autoComplete="off"
              value={inputValue}
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`${
                editId
                  ? "bg-indigo-500  hover:bg-indigo-400 hover:transition hover:ease-in-out"
                  : "bg-violet-500  hover:bg-violet-400 hover:transition hover:ease-in-out"
              } text-white border-none py-1.5 px-2.5 flex items-center h-full  rounded-br-2xl rounded-tr-2xl`}
            >
              {editId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
        <section>
          <ul className="mt-10 max-w-5xl w-2xs md:w-full flex flex-col items-center gap-5 justify-center">
            {task.map((curTask) => {
              return (
                <li
                  key={curTask.id}
                  className="w-full px-8   py-2 rounded-4xl gap-10 grid grid-cols-2 justify-start items-center bg-white"
                >
                  <span
                    className={`text-base text-[#1c2833]   ${
                      curTask.checked ? "line-through" : ""
                    }`}
                  >
                    {curTask.text}
                  </span>
                  <div className="flex md:gap-3 gap-2">
                    <button
                      onClick={() => handleEditBtn(curTask)}
                      className="bg-blue-400 p-2 rounded-2xl  hover:bg-blue-300 hover:transition hover:ease-in-out"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => handleCheckedBtn(curTask)}
                      className="bg-green-500 p-2 rounded-2xl hover:bg-green-400 hover:transition hover:ease-in-out"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeleteBtn(curTask)}
                      className="bg-red-600 p-2 rounded-2xl  hover:bg-red-500 hover:transition hover:ease-in-out"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </li>
              );
            })}
            <button
              className="bg-violet-700 px-5 py-2 rounded-2xl hover:bg-violet-600 hover:transition hover:ease-in-out hover:border-2 hover:border-slate-950"
              onClick={handleClearBtn}
            >
              Clear All
            </button>
          </ul>
        </section>
      </section>
    </>
  );
};

export default Todo;
