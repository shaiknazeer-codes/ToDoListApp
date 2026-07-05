import React from 'react'

const Navbar = () => {
  return (
<nav className=' flex justify-around bg-blue-800 text-white py-2'>
    <div className=' font-bold  text-2xl'>
        <span className='mx-8'>iTask</span>
    </div>
    <ul className=' flex gap-10'>
        <li className='cursor-pointer hover:font-bold'>Home</li>
        <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
    </ul>
</nav>
  )
}

export default Navbar
