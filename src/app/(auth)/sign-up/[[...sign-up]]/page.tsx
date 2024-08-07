import { SignUp } from "@clerk/nextjs";

export const metadata = {
    title: "Sign up",
    description: "Sign up to your account",
};

export default function Page() {
    return <div className="grid place-items-center">
        <SignUp />
    </div>;;
}