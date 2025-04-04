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
     // Add padding around the canvas area itself
    <div className="py-10 px-4 flex justify-center bg-muted/40 min-h-screen">
      <div
         // Use a subtle border for drag-over, adjust padding
        className={`bg-white shadow-sm rounded-lg w-full transition-all duration-200 
          ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'}
          ${dragOver ? 'border-2 border-dashed border-primary' : 'border border-transparent'} p-4 md:p-6`
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
           {/* Minimal placeholder style */}
          <div className="p-10 text-center border border-dashed border-border rounded-md text-muted-foreground">
            <p>Drag and drop layouts or elements here</p>
          </div>
        )}
      </div>
      <ViewCodeDialog openDialog={viewHTMLCode} htmlCode={htmlCode} closeDialog={closeDialog}></ViewCodeDialog>
    </div>
  )
}
