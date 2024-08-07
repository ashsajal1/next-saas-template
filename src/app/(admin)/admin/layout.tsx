import React from 'react'

export default function AdminLayout({ children, users }: { children: React.ReactNode, users: React.ReactNode }) {
    return (
        <div className='flex flex-col'>
            {children}
            {users}
        </div>
    )
}
