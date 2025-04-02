import { Button } from '../button'
import Image from 'next/image'
import React from 'react'
function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col items-center mt-24'>
      <h2 className='text-extrabold text-5xl'>AI Powered <span className='text-primary'>Email Templates</span></h2>
      <p className='text-center mt-4'>Your super amazing application description
        Your super amazing application description
        Your super amazing application description
        Your super amazing application description
        Your super amazing application description
        Your super amazing application description
        Your super amazing application description
      </p>
      <div className='flex gap-5 mt-6'>
        <Button variant={'outline'} > Try Demo</Button>
        <Button>Get Started</Button>
      </div>
      <Image src="/vercel.svg"
        width={1000}
        height={1000}
        alt="hero-image">

      </Image>
    </div>
  )
}
export default Hero

