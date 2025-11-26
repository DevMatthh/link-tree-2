import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import { useState, type FormEvent, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface ListaProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}
function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [link, setLink] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [listaLinks, setListaLinks] = useState<ListaProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links"); // pegando a referencia do item no banco de dados e jogando em uma variável
    const queryRef = query(linksRef, orderBy("created", "asc")); // pegando os itens do banco de dados através da variavel e ordenando os itens de forma crescente

    // o onSnapshot recebe o item vindo do banco de dados e via snapshot fica observando para ver se sofre alguma alteração em tempo real
    // adicionando os itens em um array vazio
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as ListaProps[];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      setListaLinks(lista);
    });
    return () => {
      unsub();
    };
  }, []);

  // quando clicar em registrar vamos adicionar um item no banco de dados na coleção "links"
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (nameInput === "" || link === "") {
      alert("Preencha todos os campos!");
      return;
    }

    await addDoc(collection(db, "links"), {
      name: nameInput,
      url: link,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    });
    setNameInput("");
    setLink("");
  };
  // pegando o id do item especifico clicado no icone excluir e deletando ele do banco de dados
  const handleDelete = async (id: string) => {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  };

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2 ">
          Nome do Link
        </label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2 ">URL do Link</label>
        <Input
          placeholder="Digite a url..."
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2 ">
              Cor do Link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2 ">
              Fundo do Link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {/* montando o preview */}
        {nameInput != "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3 ">
              Veja com está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center cursor-pointer"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

      {listaLinks.map((item) => (
        <article
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p className="font-bold">{item.name}</p>
          <div>
            <button
              className="border border-dashed p-1 rounded cursor-pointer"
              onClick={() => handleDelete(item.id)}
            >
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Admin;
