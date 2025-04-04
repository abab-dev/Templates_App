"use client"
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Clerk auth hook
import { SelectedElementContext } from "@/context/SelectedElementContext"
function Provider({ children }) {
  const { isSignedIn } = useUser(); // Check if user is authenticated

  const [dragElementLayout, setDragElementLayout] = useState();
  const [screenSize, setScreenSize] = useState("desktop");
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState()

  // Load emailTemplate from localStorage on initial mount (if authenticated)
  useEffect(() => {
    if (typeof window !== "undefined" && isSignedIn) {
      try {
    if (typeof window !== "undefined" && isSignedIn) {
      const storedTemplateString = localStorage.getItem("emailTemplate");
      if (storedTemplateString) {
        try {
          const storedTemplate = JSON.parse(storedTemplateString);
          setEmailTemplate(storedTemplate);
        } catch (error) {
          console.error("Error parsing emailTemplate from localStorage:", error);
          setEmailTemplate([]); // Set to empty array as a fallback
        }
      } else {
        setEmailTemplate([]); // If no template in localStorage, set to empty array
      }
    }
  }, [isSignedIn]);

  // Store emailTemplate in localStorage (only if authenticated)
  useEffect(() => {
    if (typeof window !== "undefined" && isSignedIn) {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate, isSignedIn]);
  useEffect(() => {
    if (selectedElement) {
      let updatedEmailTemplates = []
      emailTemplate.forEach((item, index) => {
        if (item?.id == selectedElement?.layout?.id) {
          updatedEmailTemplates?.push(selectedElement?.layout)

        }
        else {
          updatedEmailTemplates.push(item)
        }
      })
      setEmailTemplate(updatedEmailTemplates)
    }

  }, [selectedElement])

  return (
    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
      <DragDropLayoutElement.Provider value={{ dragElementLayout, setDragElementLayout }}>
        <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
          <SelectedElementContext.Provider value={{ selectedElement, setSelectedElement }}>
            {children}
          </SelectedElementContext.Provider>
        </EmailTemplateContext.Provider>
      </DragDropLayoutElement.Provider>
    </ScreenSizeContext.Provider>
  );
}

export default Provider;

// Custom hooks for consuming contexts
export const useDragElementLayout = () => useContext(DragDropLayoutElement);
export const useScreenSize = () => useContext(ScreenSizeContext);
export const useEmailTemplate = () => useContext(EmailTemplateContext);
export const useSelectedElement = () => useContext(SelectedElementContext);
