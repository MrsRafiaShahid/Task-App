import React, { useEffect, useState } from "react";
import { getLocalDataStorage, setLocalDataStorage } from "./LocalStorage";
import DateTime from "./DateTime";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  const [editId, setEditId] = useState(null);
  const [inputValue, setInputValue] = useState({
    id: "",
    text:"",
    checked:false,
  });
  const [task, setTask] = useState(() => getLocalDataStorage());

  const handleFormSubmit = (inputValue) => {
    const { id, text, checked } = inputValue;

    if (!text) return;
    const TodoMatched = task.some((t) => t.text === text);
    if (TodoMatched) return;
    setTask((prevTask) => [...prevTask, { id, text, checked }]);
  };
useEffect(()=>{

  setLocalDataStorage(task);
},[task])

  const handleEditBtn = (curTask) => {
    setEditId(curTask.id);
    setInputValue({
      id: curTask.id,
      text: curTask.text,
      checked: curTask.checked,
    });
  };
  const handleUpdateTask = (inputValue) => {
    const { text } = inputValue;
    if (!text) return;
    setTask((prevTask) =>
      prevTask.map((t) => (t.id === editId ? { ...t, text } : t))
    );
    setEditId(null);
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
          <DateTime />
        </header>
        <TodoForm
          onAddTodo={handleFormSubmit}
          onUpdate={handleUpdateTask}
          editId={editId}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <section>
          <ul className="mt-10 max-w-5xl w-2xs md:w-full flex flex-col items-center gap-5 justify-center">
            {task.map((curTask) => {
              return (
               <TodoList
               key={curTask.id} 
               curTask={curTask}
               data={curTask.text}
               handleEditBtn={handleEditBtn}
               handleCheckedBtn={handleCheckedBtn}
               handleDeleteBtn={handleDeleteBtn}
               checked={curTask.checked}
               />
              );
            })}
          </ul>
        </section>
        <section>
            <button
              className="bg-violet-700 px-5 py-2  mt-5 rounded-2xl hover:bg-violet-600 hover:transition hover:ease-in-out hover:border-2 hover:border-slate-950"
              onClick={handleClearBtn}
            >
              Clear All
            </button>

        </section>
      </section>
    </>
  );
};

export default Todo;
