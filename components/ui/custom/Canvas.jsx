"use client"
import { useState } from 'react'
import { useDragElementLayout, useEmailTemplate, useScreenSize } from '@/app/provider'
export default function Canvas() {

  const { screenSize, setScreenSize } = useScreenSize()
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout()
  const { emailTemplate, setEmailTemplate } = useEmailTemplate()
  const [dragOver, setDragOver] = useState(false)
  const onDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
    console.log("over jj   ")
  }
  const onDropHandle = () => {
    setDragOver(false)
    if (dragElementLayout) {
      console.log(dragElementLayout) // Log the whole object being dropped
      setEmailTemplate(prev => [...prev, dragElementLayout]) // Use the correct object
    }
    // console.log(dragElementLayout?.dragLayout) // Remove or keep for debugging if needed
  }
  return (
    <div className='mt-20 flex justify-center'>
      <div className={`bg-white p-6 w-full ${screenSize == 'desktop' ? 'max-w-2xl' : 'max-w-md'} 
      ${dragOver && 'bg-purple-100  p-4'} `}

        onDragOver={onDragOver}
        onDrop={() => onDropHandle()}
      ></div>
    </div  >
  )
}

