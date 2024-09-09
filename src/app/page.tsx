'use client'
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  console.log({ session })

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <div>
      <p>Access Denied. Please login.</p>
      <Link href="/login">
        <button>To go Login</button>
      </Link>
    </div>
  }


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            NextJS Auth
          </li>
          <p>
            La autenticación se refiere a la verificación de la identidad de un usuario. En Next.js, hay varias formas de manejar la autenticación, dependiendo de los requisitos de la aplicación.
          </p>

          <li>Github</li>


          <li>Credentials</li>
        </ol>
      </main>
    </div>
  );
}
