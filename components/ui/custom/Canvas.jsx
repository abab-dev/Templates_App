"use client"
import { useState } from 'react'
import { useDragElementLayout, useEmailTemplate, useScreenSize } from '@/app/provider'
import ColumnLayout from './LayoutElements/ColumnLayout'

export default function Canvas() {
  const { screenSize } = useScreenSize()
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout()
  const { emailTemplate, setEmailTemplate } = useEmailTemplate()
  const [dragOver, setDragOver] = useState(false)

  const onDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => {
    setDragOver(false)
  }

  const onDropHandle = () => {
    setDragOver(false)
    if (dragElementLayout) {
      console.log(dragElementLayout?.dragLayout) // Log the dropped object
      setEmailTemplate(prev => [...prev, dragElementLayout?.dragLayout])
    }
  }

  const getLayoutComponent = (layout) => {
    if (layout?.type === 'column') {
      return <ColumnLayout layout={layout} />
    }
  }

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={`bg-white p-6 w-full transition-all duration-200 
          ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'}
          ${dragOver ? 'bg-purple-100 p-8' : 'p-6'}`
        } 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave} 
        onDrop={onDropHandle}
      >
        {emailTemplate?.length ? (
          emailTemplate.map((layout, index) => (
            <div key={index}>{getLayoutComponent(layout)}</div>
          ))
        ) : (
          <p className="p-4 text-center bg-gray-100 border border-dashed">
            Add Your Layout Here
          </p>
        )}
      </div>
    </div>
  )
}
