import { useState, memo, createContext, useContext } from "react";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";

// `https://restcountries.eu/rest/v2/alpha/CA`

const ContextPais = createContext();

function PaisProvider({ children }) {
  const [pais, setPais] = useState("CA");

  return (
    <ContextPais.Provider value={{ pais, setPais }}>
      {children}
    </ContextPais.Provider>
  );
}

export default function Home() {
  return (
    <PaisProvider>
      <PaisContenido />
    </PaisProvider>
  );
}

function PaisContenido() {
  return (
    <div className={styles.container}>
      <EscogerPais />
      <MostrarPais />
    </div>
  );
}

function EscogerPais() {
  const { pais, setPais } = useContext(ContextPais);

  return (
    <div>
      <select value={pais} onChange={(event) => setPais(event.target.value)}>
        <option value="CA">Canada</option>
        <option value="CO">Colombia</option>
      </select>
    </div>
  );
}

const fetchPais = async (pais) => {
  const result = await fetch(`https://restcountries.eu/rest/v2/alpha/${pais}`);
  const data = await result.json();
  return data;
};

function MostrarPais() {
  const { pais } = useContext(ContextPais);
  const { data, isLoading, error } = useQuery([pais], fetchPais);

  if (isLoading) return <span>loading...</span>;
  if (error) return <span>oops! error</span>;

  return (
    <div>
      <h1>
        {data.name} | {data.capital}
      </h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
