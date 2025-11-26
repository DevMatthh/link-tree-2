import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import { useState, type FormEvent, useEffect } from "react";
import { db } from "../../services/firebaseConnection";

import { setDoc, doc, getDoc } from "firebase/firestore";

function Network() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    const loadLinks = () => {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      });
    };
    loadLinks();
  }, []);

  const handleSaveLinks = async (e: FormEvent) => {
    e.preventDefault();

    await setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    });
  };

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas redes sociais
      </h1>
      <form
        className="flex flex-col max-w-xl w-full "
        onSubmit={handleSaveLinks}
      >
        <label className="text-white font-medium mt-2 mb-2">
          Link do facebook
        </label>
        <Input
          placeholder="Digite a url do facebook..."
          type="url"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          placeholder="Digite a url do instagram..."
          type="url"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do Youtube
        </label>
        <Input
          placeholder="Digite a url do youtube..."
          type="url"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button
          className="text-white font-bold bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 cursor-pointer"
          type="submit"
        >
          Salvar links
        </button>
      </form>
    </div>
  );
}

export default Network;
