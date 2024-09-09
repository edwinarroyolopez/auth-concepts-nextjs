'use client'
import { useSession } from "next-auth/react";

export default function AdminPage() {
    const { data: session, status } = useSession();

    console.log({ session })

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>Access Denied. Please login.</p>;
    }

    return <div>Welcome to your admin, {session.user?.name}!</div>;
}
