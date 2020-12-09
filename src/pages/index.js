import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout/Layout"
import SearchInput from "../components/SearchInput/SearchInput"
import CountriesTable from '../components/CountriesTable/CountriesTable';

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("")
  // keyword が含まれる countru.name を filter
  //条件はすべて小文字であること　=== toLowerCase()
  const filterCountries = countries.filter(country =>
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase())
  }

  console.log(filterCountries);


  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>

        <div className={styles.input}>
          <SearchInput placeholder="Fliter by Name, Region or SubRegion" onChange={onInputChange} />

        </div>


      </div>

      <CountriesTable countries={filterCountries} />
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
