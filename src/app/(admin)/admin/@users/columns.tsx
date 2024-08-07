"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "@/components/table-header"
import { User } from "@clerk/nextjs/server"
import SetRole from "./set-role"
import { useState } from "react"

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: () => null,
    cell: () => null,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastName",
    header: () => null,
    cell: () => null,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: row => `${row.firstName} ${row.lastName}`,
    id: "fullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
    cell: ({ row }) => {
      const fullName: string = row.getValue("fullName");
      return <div className="text-left font-medium">{fullName}</div>;
    }
  },
  {
    accessorKey: "emailAddresses",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Email" />
      )
    },
    cell: ({ row }) => {
      const emails = row.getValue("emailAddresses") as { emailAddress: string }[];
      const primaryEmail = emails && emails.length > 0 ? emails[0].emailAddress : "N/A";

      return <div className="text-left font-medium">{primaryEmail}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const emails = row.getValue(columnId) as { emailAddress: string }[];
      const primaryEmail = emails && emails.length > 0 ? emails[0].emailAddress : "";
      return primaryEmail.toLowerCase().includes(filterValue.toLowerCase());
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toISOString().split('T')[0];

      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false);
      const isMod = user.publicMetadata?.role === 'moderator';

      let content;
      if (isMod) {
        content = <DropdownMenuItem onClick={() => setOpen(true)}>Remove moderator role</DropdownMenuItem>
      } else {
        content = <DropdownMenuItem onClick={() => setOpen(true)}>Make a moderator</DropdownMenuItem>
      }

      return (
        <>
          <SetRole userId={user.id} role={'moderator'} open={open} setOpen={setOpen} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View user details</DropdownMenuItem>
              {content}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]