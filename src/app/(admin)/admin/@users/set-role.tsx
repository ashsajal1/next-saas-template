"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useTransition } from 'react'
import { setRole } from './actions';
import { Roles } from '@/global';

export default function SetRole({ userId, role, open, setOpen }: { userId: string, role: Roles, open: boolean, setOpen: (value: boolean) => void }) {
    const [isPending, startTransition] = useTransition();

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure to make him moderator?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button disabled={isPending} variant={'ghost'} onClick={() => setOpen(false)}>No</Button>
                        <Button disabled={isPending} onClick={
                            async () => {
                                startTransition(async () => {
                                    await setRole(userId, role)
                                })
                            }
                        } variant={'destructive'}>
                            {isPending ? 'Making moderator...' : 'Yes, confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}