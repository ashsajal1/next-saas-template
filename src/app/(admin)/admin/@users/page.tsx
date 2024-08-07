import { clerkClient, User } from "@clerk/nextjs/server"
import { columns } from "./columns"
import { DataTable } from "./data-table"


export default async function DemoPage() {
  let users: User[] = await (await clerkClient.users.getUserList()).data;
  users = JSON.parse(JSON.stringify(users))
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={users} />
    </div>
  )
}