import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


 useEffect(() => {
  const savedTodos = localStorage.getItem("todos")

  if (savedTodos) {
    setTodos(JSON.parse(savedTodos))
  }
}, [])

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])
  useEffect(() => {
    console.log("Todos:", todos);
  }, [todos]);

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)

  }

 const handleAdd = () => {
  console.log("Button clicked");
  console.log("Todo:", todo);

  if (todo.trim() === "") return;

  setTodos((prevTodos) => [
    ...prevTodos,
    {
      id: uuidv4(),
      todo: todo,
      isCompleted: false,
    },
  ]);

  setTodo("");
};
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

  }
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 min-h-[85vh] md:w-[40%] bg-blue-50">
        <h1 className=' text-center font-bold text-2xl '>iTask - Manage your tasks at one place</h1>
        <h2 className='font-bold my-3'>Add a to do</h2>
        <div className=' flex'>

          <input onChange={handleChange} value={todo} type="text" placeholder='Enter Your Task' className=' w-full rounded-full px-5 py-1 border-2 border-black my-4' />
        </div>
        <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white w-full'>Save</button>
        <div className=' my-4'>
          <input id='show' onChange={toggleFinished} type="checkbox" htmlFor="show" checked={showFinished} /> Show Finished
          <div className='h-[2px]  bg-gray-800 opacity-15 w-[90%] mx-auto my-2'></div>
        </div>

        <div className=' font-bold text-xl mx-3 '>Your Todos </div>
        {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
        {todos.map(item => {

          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteOutline />
              </button>
            </div>
          </div>
        })}

      </div>
    </>
  )
}

export default App
