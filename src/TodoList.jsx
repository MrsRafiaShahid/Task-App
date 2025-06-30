import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaCheck } from 'react-icons/fa6'
import { MdDeleteForever } from 'react-icons/md'

const TodoList = ({
data,handleCheckedBtn,handleEditBtn,handleDeleteBtn,checked,curTask
}) => {
  return (
    <>
     <li
                  
                  className="w-full px-8   py-2 rounded-4xl gap-10 grid grid-cols-2 justify-start items-center bg-white"
                >
                  <span
                    className={`text-base text-[#1c2833]   ${
                      checked ? "line-through" : ""
                    }`}
                  >
                    {data}
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
    
    
    </>
  )
}

export default TodoList