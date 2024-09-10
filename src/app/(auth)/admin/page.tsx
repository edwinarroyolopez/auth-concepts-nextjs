'use client'
import AuthGuard from "../components/AuthGuard";

export default function AdminPage() {
    return (
        <AuthGuard>
            <div>Welcome to your admin!</div>
        </AuthGuard>
    );
}