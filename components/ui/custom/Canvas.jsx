"use client"
import { useEffect, useRef, useState } from 'react'
import { useDragElementLayout, useEmailTemplate, useScreenSize } from '@/app/provider'
import ColumnLayout from './LayoutElements/ColumnLayout'
import ViewCodeDialog from './ViewHtmlDialog'

export default function Canvas({ viewHTMLCode, closeDialog }) {
  const htmlRef = useRef()
  const { screenSize } = useScreenSize()
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout()
  const { emailTemplate, setEmailTemplate } = useEmailTemplate()
  const [dragOver, setDragOver] = useState(false)
  const [htmlCode, setHtmlCode] = useState()

  const onDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => {
    setDragOver(false)
  }

  const onDropHandle = () => {
    setDragOver(false);
    if (dragElementLayout) {
      console.log("Dropped layout:", dragElementLayout?.dragLayout);
      setEmailTemplate(prev => [...prev, dragElementLayout?.dragLayout]);
    }
  };

  const getLayoutComponent = (layout) => {
    if (layout?.type === 'column') {
      return <ColumnLayout layout={layout} key={layout.id} />;
    }
    return null;
  };
  useEffect(() => {
    if (viewHTMLCode) {
      getHTMLCode()
    }
  }, [viewHTMLCode])
  const getHTMLCode = () => {
    if (htmlRef.current) {
      const htmlContent = htmlRef.current.innerHTML
      console.log(htmlContent)
      setHtmlCode(htmlContent)

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
        ref={htmlRef}
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
      <ViewCodeDialog openDialog={viewHTMLCode} htmlCode={htmlCode} closeDialog={closeDialog}></ViewCodeDialog>
    </div>
  )
}
