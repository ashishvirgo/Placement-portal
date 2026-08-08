import React from 'react'
import Login from '../components/Login'

const Home = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      {/* <div className='bg-red-500 flex w-1/2 h-screen items-center justify-center'>
      <h1>About</h1>
      </div> */}
      <div className='bg-red-900 flex w-full h-screen items-center justify-center'>
       <Login/>
      </div>
    </div>
  )
}

export default Home
