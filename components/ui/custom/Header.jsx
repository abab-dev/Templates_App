import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Button } from '../button'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
function Header() {
  return (
    <div className='flex justify-between items-center shadow-sm'>
      <Image src="/logo.png" alt='logo' width={50} height={80}></Image>

      <div className='flex gap-3 items-center'>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Get Started</Button></SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href={'/dashboard'}>
            < Button > Dashboard</Button>
          </Link>
          < UserButton />
        </SignedIn>
      </div >
    </div >
  )
}
export default Header

