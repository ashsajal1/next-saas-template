// import { Roles } from "@/types/globals"
import { Roles } from "@/global";
import { auth } from "@clerk/nextjs/server"

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth()

  // console.log("Role : ", sessionClaims?.metadata.role)
  return sessionClaims?.metadata.role === role;
}