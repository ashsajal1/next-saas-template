import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>404 - Not Found</CardTitle>
                </CardHeader>
                <CardFooter>
                    <Link href="/">
                        <Button>
                            Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
