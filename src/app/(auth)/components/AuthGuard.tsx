'use client'
import React from "react";
import { useSession } from "next-auth/react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    console.log({ session })

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>Access Denied. Please login.</p>;
    }

    return <>{children}</>;
}
