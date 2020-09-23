import { useState, memo, createContext, useContext } from "react";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <CountryProvider>
      <HomeContent />
    </CountryProvider>
  );
}

const HomeContent = memo(() => {
  return (
    <div className={styles.container}>
      <CountryPicker />
      <CountryDetails />
    </div>
  );
});

const CountryContext = createContext();

function CountryProvider({ children }) {
  const [country, setCountry] = useState("CA");

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

async function fetchCountry(country) {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${country}`
  );
  const data = await response.json();
  return data;
}

function CountryDetails() {
  const { country } = useContext(CountryContext);
  const { data, isLoading, error } = useQuery([country], fetchCountry);

  if (isLoading) return <span>loading...</span>;
  if (error) return <span>oop!! error occurred</span>;

  return (
    <div>
      <h1>{country}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function CountryPicker() {
  const { country, setCountry } = useContext(CountryContext);

  return (
    <select
      value={country}
      onChange={(event) => {
        setCountry(event.target.value);
      }}
    >
      <option value="CA">Canada</option>
      <option value="CO">Colombia</option>
    </select>
  );
}
