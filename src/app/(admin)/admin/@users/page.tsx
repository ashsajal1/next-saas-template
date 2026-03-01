import { clerkClient, User } from "@clerk/nextjs/server"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Users } from "lucide-react"
import Link from "next/link"

export default async function UsersPage() {
  let users: User[] = await (await clerkClient.users.getUserList()).data;
  users = JSON.parse(JSON.stringify(users))
  const activeUsers = users.filter((u: User) => u.lastSignInAt).length

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 mt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">Users</h1>
              <Badge variant="secondary" className="text-sm">
                {users.length} total
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Manage user accounts, roles, and permissions across your platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="p-4 rounded-lg border border-border/50 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border/50 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{activeUsers}</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border/50 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{users.length - activeUsers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/50">
          <DataTable columns={columns} data={users} />
        </div>
      </div>
    </div>
  )
}
