import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'

export default function Navbar() {
    return (
        <nav className='p-4 fixed backdrop-blur-2xl top-0 w-full h-[80px] border-b flex items-center justify-between'>
            <div>Logo</div>

            <div className='flex items-center gap-2'>
                <ModeToggle />
                <Button>Sign up</Button>
            </div>
        </nav>
    )
}
