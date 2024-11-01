import React from 'react'
import Add from '../Components/Add'
import List from '../Components/List'

const Home = () => {
  return (
    <div className='bg-gray-200 flex p-4 max-h-full min-h-screen'>
      
      <List/> 
      <Add/>

    </div>
  )
}

export default Home
