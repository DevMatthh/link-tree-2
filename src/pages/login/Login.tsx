import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (email === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/admin", { replace: true });
      setEmail("");
      setSenha("");
    } catch (e) {
      console.log("Erro ao logar usuário");
    }
  };
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl ">
          Dev
          <span className="bg-linear-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>
      <form
        className="w-full max-w-xl flex flex-col px-2"
        onSubmit={handleLogin}
      >
        <Input
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua senha..."
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}

export default Login;
