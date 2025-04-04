import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../button'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
function Header({isDashboard = true}) {
  return (
    // Minimalist header: Clean padding, no explicit background/border unless needed for contrast later
    <div className='flex justify-between items-center p-4 md:p-6'>
      {/* Consider slightly smaller logo for minimalism if appropriate */}
      <Image src="/logo.png" alt='logo' width={40} height={64}></Image>

      <div className='flex gap-3 items-center'>
        <SignedOut>
          <SignInButton mode="modal">
             {/* Subtle button hint - final style depends on button.jsx */}
            <Button variant="ghost">Get Started</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          { isDashboard &&
          <Link href={'/dashboard'}>
             {/* Subtle button hint - final style depends on button.jsx */}
            < Button variant="ghost"> Dashboard</Button>
          </Link>
}
          < UserButton />
        </SignedIn>
      </div >
    </div >
  )
}
export default Header

