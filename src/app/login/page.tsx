"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirige a /dashboard si el usuario ya ha iniciado sesión
    }
  }, [status, router]);

  const handleSignIn = async (provider?: string) => {
    if (provider) {
      await signIn(provider); // Iniciar sesión con el proveedor (GitHub en este caso)
    } else {
      // Iniciar sesión con email y password
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "unauthenticated" && (
        <div>
          <p>Please sign in to continue</p>

          {/* Formulario para email y contraseña */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn(); // Llamar a la función de iniciar sesión con email/password
            }}
          >
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign in with Email</button>
          </form>

          {/* Mostrar error si lo hay */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <br />
          <button onClick={() => handleSignIn("github")}>Sign in with GitHub</button>
        </div>
      )}
    </div>
  );
}
