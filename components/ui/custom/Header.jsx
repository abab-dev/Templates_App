import Image from 'next/image'
import React from 'react'
import { Button } from '../button'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
function Header() {
  return (
    <div className='flex justify-between items-center shadow-sm'>
      <Image src="/logo.png" alt='logo' width={50} height={80}></Image>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Get Started</Button></SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
export default Header

