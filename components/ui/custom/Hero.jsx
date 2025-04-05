import { Button } from '../button'
import Image from 'next/image'
import React from 'react'
function Hero() {
  return (
    // Increased vertical padding (mt), adjusted horizontal padding for different screens
    <div className='px-6 md:px-20 lg:px-32 xl:px-48 flex flex-col items-center mt-28 md:mt-32'>
       {/* Slightly smaller, less bold heading, increased bottom margin */}
      <h2 className='text-bold text-4xl md:text-5xl text-center mb-6'>AI Powered <span className='text-primary'>Email Templates</span></h2>
       {/* Use a slightly lighter text color for description, increased max-width */}
      <p className='text-center text-muted-foreground mt-4 max-w-xl md:max-w-2xl'>
        Effortlessly create stunning email templates with our AI-powered design tool. Customize layouts, add content, and generate HTML code in minutes.
      </p>
       {/* Increased margin top for buttons */}
      <div className='flex gap-4 mt-8'>
         {/* Subtle button hints - final style depends on button.jsx */}
        <Button variant={'outline'} size="lg" asChild>
          <Link href="/editor/demo">Try Demo</Link>
        </Button>
        <Button size="lg">Get Started</Button>
      </div>
       {/* Increased margin top for image, maybe add subtle rounded corners */}
      <Image src="/vercel.svg"
        width={1000}
        height={1000}
        alt="hero-image"
        className="mt-16 md:mt-20 rounded-lg" // Added subtle rounding
        >

      </Image>
    </div>
  )
}
export default Hero

