import { useEffect, useState, useRef } from 'react';
import './App.css';
import Nav from './components/Nav';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [change, setChange] = useState("add");
  const [currentID, setCurrentID] = useState(null);
  const inp = useRef();

  // Retrieve todos from local storage on initial render
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        const parsedTodos = JSON.parse(stored);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          console.error("Stored todos is not an array");
        }
      } catch (error) {
        console.error("Error parsing stored todos:", error);
      }
    } else {
      console.log("No todos found in local storage");
    }
  }, []);

  // Update local storage whenever todos state changes
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to local storage:", error);
    }
  }, [todos]);

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleEdit(item) {
    setChange("edit");
    setCurrentID(item.id);
    setTodo(item.todo);
    inp.current.focus();
  }

  function handleDelete(id) {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
  }

  function handleAdd() {
    if (change === "add") {
      if (todo.trim() !== "") {
        const random = Math.random();
        setTodos([...todos, { todo, isCompleted: false, id: random }]);
        setTodo("");
      }
    } else {
      const updatedTodos = todos.map(item =>
        item.id === currentID ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setTodo("");
      setCurrentID(null);
      setChange("add");
    }
  }

  return (
    <>
      <Nav />
      <div className="container w-[100vw] h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="todoscont rounded-lg overflow-hidden w-[40vw] h-[80vh] bg-[#3C424A]">
          <div className="innheader flex h-[40px] justify-center items-center text-white font-semibold shadow shadow-[rgb(0,0,0,0.3)] flex-col relative">
            <div className="line h-[3px] w-[70px] rounded-full bg-[#ff4080] absolute bottom-0"></div>
            TODO
          </div>
          <div className="innmaincont w-full h-[calc(100%-40px)] px-[60px] py-[80px] flex flex-col">
            <div className="inp w-full h-[32px] flex mb-[20px]">
              <input onChange={handleChange} value={todo} ref={inp} type="text" className='h-full w-[calc(100%-50px)] rounded-l-full outline-none pl-[10px] bg-[#343A40] border text-white border-[rgba(0,0,0,0.3)] focus:border-[rgb(255,215,0,0.5)] border-r-0 text-[14px]' />
              <button onClick={handleAdd} className="add h-full w-[50px] rounded-r-full bg-[#ff4080] flex justify-center items-center uppercase font-semibold text-white border-[1px] border-[rgba(0,0,0,0.5)] border-l-0 ">{change}</button>
            </div>

            <div className="todos w-full h-[calc(100%-52px)] flex flex-col gap-[10px] overflow-y-scroll pr-[5px]">
              {todos.map((item) => (
                <div className="todo w-full min-h-[40px] flex rounded-full hover:bg-[rgb(52,58,64,0.5)]" key={item.id}>
                  <div className="checkbox w-[35px] h-full flex justify-center items-center relative select-none">
                    <div className="box h-[15px] rounded-[3px] bg-[#5f6770] cursor-pointer aspect-square shadow-custom1 absolute left-[8px]" onClick={() => { item.isCompleted = !item.isCompleted; setTodos([...todos]); }}></div>
                    <img src="src/images/tick.svg" alt="" className={item.isCompleted ? 'h-[25px] absolute top-[3px] right-[2px] cursor-pointer' : 'h-[25px] absolute top-[3px] right-[2px] cursor-pointer hidden'} onClick={() => { item.isCompleted = !item.isCompleted; setTodos([...todos]); }} />
                  </div>
                  <div className="name h-full w-[calc(100%-80px)] flex items-center font-sans capitalize font-semibold overflow-hidden text-[16px] text-white">
                    <p className={item.isCompleted ? 'text-ellipsis w-full overflow-hidden line-through decoration-black' : 'text-ellipsis w-full overflow-hidden'}>{item.todo}</p>
                  </div>
                  <div className="functions w-[45px] h-full select-none flex justify-center items-center gap-[5px]">
                    <img src="src/images/edit.svg" alt="" className='h-[18px] cursor-pointer' onClick={() => { handleEdit(item) }} />
                    <img src="src/images/delete.svg" onClick={() => { handleDelete(item.id) }} alt="" className='h-[18px] cursor-pointer' />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
