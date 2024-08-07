"use server";

import { Roles } from "@/global";
import { checkRole } from "@/lib/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setRole(userId: string, role: Roles) {
  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const isMod = (await clerkClient.users.getUser(userId)).publicMetadata.role;
    if(role === 'moderator') {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { role: 'user' },
      });
      revalidatePath("/");
      return;
    }

    const res = await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: role },
    });
    revalidatePath("/");
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}