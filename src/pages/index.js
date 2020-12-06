import styles from '../styles/Home.module.css'
import Layout from "../components/Layout/Layout"
import SearchInput from "../components/SearchInput/SearchInput"
import CountriesTable from '../components/CountriesTable/CountriesTable';

export default function Home({ countries }) {
  console.log(countries);
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>

      <SearchInput placeholder="Fliter by Name, Region or SubRegion" />

      <CountriesTable countries={countries} />
    </Layout>
  );
}

//building  API fetch 
export const getStaticProps = async () => {
  const countries = await fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())

  return {
    props: {
      countries
    }
  }
}
