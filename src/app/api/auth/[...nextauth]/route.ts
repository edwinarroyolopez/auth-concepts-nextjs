// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line
      async authorize(credentials: Record<"email" | "password", string> | any) {
        // Aquí implementas la lógica para autenticar al usuario con email y password
        const user = await authenticateUser(credentials?.email, credentials?.password);

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Agrega datos personalizados al token JWT
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log({ session, token })
      // Agrega datos personalizados al objeto de sesión
      if (token) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Usar JWT en lugar de sesiones por cookies
  },
});

export { handler as GET, handler as POST };


// Función para autenticar al usuario con email y password
async function authenticateUser(email: string, password: string) {
  // Aquí es donde implementas la lógica de autenticación contra tu base de datos
  // o cualquier otro servicio de autenticación que utilices.
  // Devuelve un objeto de usuario si la autenticación es exitosa.
  if (email === "test@example.com" && password === "password123") {
    return { id: "1", name: "John Doe", email: "test@example.com" }; // Ejemplo de usuario válido
  }
  return null; // Si las credenciales son incorrectas
}