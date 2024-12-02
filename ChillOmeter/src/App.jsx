import { useState } from 'react'
import './App.css'
import chillGuy from "../src/assets/chillGuy.jpg";
import NavBar from './ui/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <div className='flex justify-center items-center h-[85vh]'>
        <div className="border-2 border-amber-800/20 w-[80vw] h-[80vh] rounded-3xl flex justify-between items-center p-14 gap-10 shadow-[-10px_-10px_30px_4px_rgba(171,130,97,0.1),_10px_10px_30px_4px_rgba(171,130,97,0.45)]">

          {/*Hero Text*/}
          <div className='w-[40vw] flex flex-col gap-5'>
            <h1 className="text-7xl font-fontChillOne">
              Are You Just A Chill Guy?
            </h1>
            <p className='font-fontChillTwo text-2xl font-semibold text-[#ab8261]'>
              <span>How Chill Are You?</span> Let’s Measure Your Chillness with the help of Chill O Meter!
            </p>
          </div>

          {/*Hero Img*/}
          <div>
            <img src={chillGuy} alt="chillguy" className='size-96 rounded-3xl' />
          </div>

        </div>
      </div>
    </>
  )
}

export default App
