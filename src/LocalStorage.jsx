const todoKey = "todoList";

export const getLocalDataStorage = () => {
  const rawData = localStorage.getItem(todoKey);

  if (!rawData) return [];

  return JSON.parse(rawData);
};


export const setLocalDataStorage =(task)=>{
    localStorage.setItem(todoKey,JSON.stringify(task))
}