import { SignIn } from "@clerk/nextjs";

export const metadata = {
    title: "Sign in",
    description: "Sign in to your account",
};

export default function Page() {
    return <div className="grid place-items-center">
        <SignIn />
    </div>;
}