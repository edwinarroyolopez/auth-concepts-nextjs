'use client'
import AuthGuard from "../components/AuthGuard";

export default function DashboardPage() {
    return (
        <AuthGuard>
            <div>Welcome to your dashboard!</div>
        </AuthGuard>
    );
}
