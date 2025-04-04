"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../button'
import { Code, Monitor, Smartphone } from 'lucide-react'
import { useEmailTemplate, useScreenSize } from '@/app/provider'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
function EditorHeader({ viewHTMLCode }) {
  const { screenSize, setScreenSize } = useScreenSize()
  const { templateId } = useParams()
  const updateEmailTemplate = useMutation(api.emailTemplate.UpdateTemplateDesign)
  const { emailTemplate, setEmailTemplate } = useEmailTemplate()
  const onSaveTemplate = async () => {
    const designData = emailTemplate.map(layout => {
      // Ensure that layout is defined and has the necessary properties
      if (layout && layout.id && layout.type) {
        // Deeply serialize the layout object
        const serializedLayout = JSON.parse(JSON.stringify(layout));
        return serializedLayout;
      } else {
        // Handle the case where layout or its properties are undefined
        console.warn("Skipping layout due to undefined properties:", layout);
        return null; // Or return a default object, or handle it as needed
      }
    }).filter(item => item !== null);

    await updateEmailTemplate({
      tId: templateId,
      design: designData, // Pass the serializable data
    });
    toast('Email template saved successfully');
  };
  return (
    // Remove shadow, add bottom border for separation, adjust padding
    <div className='flex border-b justify-between items-center p-4'>
       {/* Slightly smaller logo */}
      <Image src="/logo.png" alt='logo' width={40} height={64}></Image>

      <div className="flex gap-2">
         {/* More subtle active state */}
        <Button variant="ghost" onClick={() => setScreenSize('desktop')} className={` ${screenSize == 'desktop' ? 'bg-muted' : ''}`}><Monitor className="mr-2 h-4 w-4" />Desktop</Button>
        <Button variant="ghost" onClick={() => setScreenSize('mobile')} className={` ${screenSize == 'mobile' ? 'bg-muted' : ''}`}><Smartphone className="mr-2 h-4 w-4" />Mobile</Button>

      </div >
       {/* Adjust spacing and button variants */}
      <div className="flex gap-2 items-center">

         {/* Use ghost variant, ensure consistent hover */}
        <Button variant={'ghost'} size="icon"
          onClick={() => viewHTMLCode(true)}
          aria-label="View Code"
        ><Code className="h-4 w-4" /></Button>
        <Link href={'/dashboard'}>
           {/* Use ghost variant for less emphasis */}
          <Button variant={"ghost"}>Dashboard</Button>
        </Link>
         {/* Use default/primary variant for the main action */}
        <Button size="sm" onClick={onSaveTemplate}>Save</Button>
      </div>
    </div>
  )
}
export default EditorHeader 
