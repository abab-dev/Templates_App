"use client"
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Clerk auth hook
import { SelectedElementContext } from "@/context/SelectedElementContext"
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/convex-client-provider";
function Provider({ children }) {
  const { isSignedIn } = useUser(); // Check if user is authenticated

  const [dragElementLayout, setDragElementLayout] = useState();
  const [screenSize, setScreenSize] = useState("desktop");
  const [emailTemplate, setEmailTemplate] = useState('[]');
  const [selectedElement, setSelectedElement] = useState()
  useEffect(() => {
    if (typeof window !== undefined && isSignedIn) {
      const storedTemplate = JSON.parse(localStorage.getItem("emailTemplate") ?? "[]")
      if (storedTemplate) {
        setEmailTemplate(storedTemplate)
      }
    }
  }, [isSignedIn])
  useEffect(() => {
    if (typeof window !== "undefined" && isSignedIn) {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate, isSignedIn]);

  useEffect(() => {
    if (selectedElement) {
      const updatedEmailTemplates = []
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
    <ConvexClientProvider>
      <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
        <DragDropLayoutElement.Provider value={{ dragElementLayout, setDragElementLayout }}>
          <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
            <SelectedElementContext.Provider value={{ selectedElement, setSelectedElement }}>
              {children}
            </SelectedElementContext.Provider>
          </EmailTemplateContext.Provider>
        </DragDropLayoutElement.Provider>
      </ScreenSizeContext.Provider>
    </ConvexClientProvider>
  );
}

export default Provider;

// Custom hooks for consuming contexts
export const useDragElementLayout = () => useContext(DragDropLayoutElement);
export const useScreenSize = () => useContext(ScreenSizeContext);
export const useEmailTemplate = () => useContext(EmailTemplateContext);
export const useSelectedElement = () => useContext(SelectedElementContext);
