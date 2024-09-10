// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Definir rutas que quieres proteger
const protectedRoutes = ["/dashboard", "/admin"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});

  const { pathname } = req.nextUrl;

  // Si el usuario está intentando acceder a una ruta protegida
  if (protectedRoutes.includes(pathname)) {
    // Si no hay token, redirige al login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Permite el acceso si la ruta no está protegida o si hay un token válido
  return NextResponse.next();
}

// Definir en qué rutas aplicar el middleware
export const config = {
  matcher: ["/dashboard", "/admin"],
};