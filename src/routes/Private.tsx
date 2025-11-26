import { type ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateProps {
  children: ReactNode;
}
function Private({ children }: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@reactlinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    // Toda vez que usamos um olheiro (onAuthStateChanged) é sempre bom cancelar ele depois que fizermos a verificação
    return () => {
      unsub();
    };
  }, []);
  if (loading) {
    return <div></div>;
  }
  // se o user não estiver logado e tentar acessar a pagina de admin, ele sera redirecionado a pagina de login
  if (!signed) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default Private;

// no private recebemos uma children que é a rota /admin
