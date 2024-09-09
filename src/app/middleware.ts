import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redireccionar si no está autenticado
  },
  callbacks: {
    authorized: ({ token }) => token?.role === "admin", // Solo permitir admins
  },
});

export const config = { matcher: ["/admin/:path*"] }; // Proteger rutas de admin
