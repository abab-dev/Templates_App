"use client"
import React from 'react'
import Image from 'next/image'
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
    <div className='flex shadow-sm justify-between items-center'>
      <Image src="/logo.png" alt='logo' width={50} height={80}></Image>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={() => setScreenSize('desktop')} className={`${screenSize == 'desktop' && 'bg-purple-100 text-primary'}`}><Monitor />Desktop</Button>
        <Button variant="ghost" onClick={() => setScreenSize('mobile')} className={`${screenSize == 'mobile' && 'bg-purple-100 text-primary'}`}><Smartphone />Mobile</Button>

      </div >
      <div className="flex gap-3 ">

        <Button className="hover:text-primary hover:bg-purple-100" variant={'ghost'}
          onClick={() => viewHTMLCode(true)}
        ><Code /></Button>
        <Link href={'/dashboard'}>
          <Button variant={"outline"} className={"mr-2"}>Dashboard</Button>
        </Link>
        <Button className={"mr-2"}
          onClick={onSaveTemplate}>save template</Button>
      </div>
    </div>
  )
}
export default EditorHeader 
