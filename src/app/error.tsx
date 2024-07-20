"use client"
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function Error() {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>An unexpectd error occurred!</CardTitle>
            </CardHeader>
        </Card>
    </div>
  )
}
