import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function Team() {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Team</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Ashfiquzzaman Sajal</CardTitle>
                        <CardDescription>Lead Developer</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Link href="https://github.com/ashsajal1">
                            <Button variant="ghost" className="rounded-full">
                                <GitHubLogoIcon />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>John Doe</CardTitle>
                        <CardDescription>Lead Designer</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Link href="https://github.com/ashsajal1">
                            <Button variant="ghost" className="rounded-full">
                                <GitHubLogoIcon />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
