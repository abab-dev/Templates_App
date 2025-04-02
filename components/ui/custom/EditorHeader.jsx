import React from 'react'
import Image from 'next/image'
import { Button } from '../button'
import { Code, Monitor, Smartphone } from 'lucide-react'
function EditorHeader() {
  return (
    <div className='flex shadow-sm justify-between items-center'>
      <Image src="/logo.png" alt='logo' width={50} height={80}></Image>

      <div>
        <Button variant="ghost"><Monitor />Desktop</Button>
        <Button variant="ghost"><Smartphone />Mobile</Button>
      </div>
      <div className="flex gap-3 "><Button>save template</Button>
        <Button variant={'outline'}>send test email </Button>

        <Button className="hover:text-primary hover:bg-purple-100" variant={'ghost'}><Code /></Button></div>
    </div>
  )
}
export default EditorHeader 
