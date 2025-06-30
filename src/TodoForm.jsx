const TodoForm = ({
  onAddTodo,
  editId,
  onUpdate,
  inputValue,
  setInputValue,
}) => {
  const handleInputChange = (value) => {
    setInputValue({ id: value, text: value, checked: false });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onAddTodo(inputValue);
    setInputValue({ id: "", text: "", checked: false });
  };
  const handleUpdateTask = (event) => {
    event.preventDefault();
    onUpdate(inputValue);
    setInputValue({ id: "", text: "", checked: false });
  };

  return (
    <>
      <section className="form">
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
              value={inputValue.text || ""}
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
      </section>
    </>
  );
};

export default TodoForm;
