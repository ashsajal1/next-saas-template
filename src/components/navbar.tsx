import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'

export default async function Navbar() {
    const user = await currentUser();
    return (
        <nav className='p-4 z-10 fixed backdrop-blur-2xl top-0 w-full h-[80px] border-b flex items-center justify-between'>
            <Link className='font-bold cursor-pointer' href="/">Logo</Link>

            <div className='flex items-center gap-2'>
                <ModeToggle />
                <SignedIn>
                    <Link href='/profile'>
                        <Image width={35} height={35} src={user?.imageUrl!} alt={user?.fullName!} className='rounded-full' />
                    </Link>
                </SignedIn>
                <SignedOut>
                    <Link href='/sign-in'>
                        <Button>Sign In</Button>
                    </Link>
                </SignedOut>
                <Link href='/about'>
                    <Button>About</Button>
                </Link>
            </div>
        </nav>
    )
}
