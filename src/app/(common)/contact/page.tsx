import { Badge } from '@/components/ui/badge'
import React from 'react'

export default function Contact() {
  return (
    <div>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <div className="mb-4">
          If you have any questions or feedback, please feel free to reach out. Here is the email address: <Badge><a href="mailto:ashsajal@yahoo.com">ashsajal@yahoo.com</a></Badge>
        </div>

        <p className="mb-4">
          I hope you find something useful here. If you have any questions or
          feedback, please feel free to reach out.
        </p>
        <p className="mb-4">
          <span className="font-semibold">Note:</span> This site is in the
          early stages of development. Over time, I will be adding more tools and
          improving the overall experience.
        </p>
    </div>
  )
}
