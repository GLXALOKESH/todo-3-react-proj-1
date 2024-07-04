import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'

function App() {
  const [count, setCount] = useState(0)

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
              <input type="text " className='h-full w-[calc(100%-50px)] rounded-l-full outline-none pl-[10px] bg-[#343A40] border text-white border-[rgba(0,0,0,0.3)] focus:border-[rgb(255,215,0,0.5)] border-r-0 text-[14px]' />
              <button className="add h-full w-[50px] rounded-r-full  bg-[#ff4080] flex justify-center items-center uppercase font-semibold text-white border-[1px] border-[rgba(0,0,0,0.5)] border-l-0 ">add</button>
            </div>

            <div className="todos w-full h-[calc(100%-52px)]  flex flex-col gap-[10px] overflow-y-scroll">
              <div className="todo w-full h-[40px]  flex rounded-full hover:bg-[rgb(52,58,64,0.5)] ">
                <div className="checkbox  w-[35px] h-full flex justify-center items-center relative select-none">
                  <div className="box  h-[15px] rounded-[3px] bg-[#5f6770] cursor-pointer aspect-square shadow-custom1 absolute left-[8px] "></div>
                  <img src="src/images/tick.svg" alt="" className='h-[25px] absolute top-[3px] right-[2px] cursor-pointer' />
                </div>
                <div className="name h-full w-[calc(100%-70px)] flex items-center font-sans capitalize font-semibold overflow-hidden text-[16px] text-white"><p className='text-ellipsis w-full overflow-hidden'>todo1</p></div>
                <div className="edit  w-[35px] h-full select-none flex justify-center items-center">
                  <img src="src/images/edit.svg" alt="" className='h-[20px] cursor-pointer' />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
