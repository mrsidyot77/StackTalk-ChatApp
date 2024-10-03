import React from 'react'
import Lottie from "react-lottie"
import { animationDefaultOptions } from '@/lib/utils'

function EmptyChatContainer() {
  return (
    <div className='flex-1 bg-[#1c1d25] md:bg-[#1c1d25] flex flex-col justify-center items-center hidden md:flex transition-all duration-1000'>
      <div className='w-[70%] max-w-[200px]'>
        <Lottie
          isClickToPauseDisabled={true}
          options={animationDefaultOptions}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className='text-opacity-80 text-white flex flex-col items-center mt-10 gap-5 lg:text-4xl text-3xl transition-all duration-300 text-center'>
        <h3 className='poppins-medium'>
          Hi<span className='text-purple-500'>! </span>Welcome to
          <span className='text-purple-500'> SpiceChat </span>App
          <span className='text-purple-500'>...</span>
        </h3>
      </div>
    </div>
  )
}

export default EmptyChatContainer
