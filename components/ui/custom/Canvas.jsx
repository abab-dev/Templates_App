"use client"
import { useState } from 'react'
import { useDragElementLayout, useEmailTemplate, useScreenSize } from '@/app/provider'
import ColumnLayout from './LayoutElements/ColumnLayout'
import { getLayoutOrPageModule } from 'next/dist/server/lib/app-dir-module'
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
      console.log(dragElementLayout?.dragLayout) // Log the whole object being dropped
      setEmailTemplate(prev => [...prev, dragElementLayout?.dragLayout]) // Use the correct object
    }
  }
  const getLayoutComponet = (layout) => {
    if (layout?.type == 'column') {
      return <ColumnLayout layout={layout}></ColumnLayout>
    }
  }
  return (
    <div className='mt-20 flex justify-center'>
      <div className={`bg-white p-6 w-full 
      ${screenSize == 'desktop' ? 'max-w-2xl' : 'max-w-md'} 
      ${dragOver && 'bg-purple-100 p-4'} `} // Added min-h-[200px]

        onDragOver={onDragOver}
        onDrop={() => onDropHandle()}
      >
        {emailTemplate?.length ? emailTemplate?.map((layout, index) => (
          <div key={index}>
            {/* Column {index + 1} */}
            {getLayoutComponet(layout)}
          </div>
        ))
          : <p className='p-4 text-center bg-grey-100  border border-dash '>Add Your Layout Here</p>
        }



      </div>
    </div  >
  )
}

