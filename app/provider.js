"use client"
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { useContext } from "react";
import { useState } from "react";
function Provider({ children }) {

  const [dragElementLayout, setDragElementLayout] = useState()
  const [screenSize, setScreenSize] = useState('desktop')
  const [emailTemplate, setEmailTemplate] = useState([])

  return (
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      < DragDropLayoutElement.Provider value={{ dragElementLayout, setDragElementLayout }
      }>
        <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
          {children}
        </EmailTemplateContext.Provider>
      </DragDropLayoutElement.Provider >
    </ScreenSizeContext.Provider >
  )
}
export default Provider

export const useDragElementLayout = () => {
  return useContext(DragDropLayoutElement)
}
export const useScreenSize = () => {
  return useContext(ScreenSizeContext)
}
export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext)
}
