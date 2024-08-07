import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className='p-4 fixed backdrop-blur-2xl top-0 w-full h-[80px] border-b flex items-center justify-between'>
            <Link className='font-bold cursor-pointer' href="/">Logo</Link>

            <div className='flex items-center gap-2'>
                <ModeToggle />
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <Link href='/sign-in'>
                        <Button>Sign In</Button>
                    </Link>
                </SignedOut>
            </div>
        </nav>
    )
}
