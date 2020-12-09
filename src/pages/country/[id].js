import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout/Layout"
import styles from "./Country.module.css";
//自国のAPI ＝＞　レンダリング　＝＞　隣国のAPI

const getCountry = async (id) => {
   const url = `https://restcountries.eu/rest/v2/alpha/${id}`
   const res = await fetch(url);

   const country = await res.json();
   return country;
}


const Country = ({ country }) => {
   const [borders, setBorders] = useState([]);
   //隣接国がある分だけ　APIに、fetch
   const getBorders = async () => {
      const borders = await Promise.all(
         country.borders.map(border => getCountry(border))
      );
      setBorders(borders)    //[{},{}]
   };

   useEffect(() => {
      getBorders()
   }, []);

   console.log(borders);
   console.log(country.borders);

   return (
      <Layout title={country.name}>
         <div className={styles.container}>
            <div className={styles.container_left}>
               <div className={styles.overview_panel}>
                  <img src={country.flag} alt={country.name} />

                  <h1 className={styles.overview_name}>{country.name}</h1>
                  <div className={styles.overview_region}>{country.region}</div>

                  <div className={styles.overview_numbers}>
                     <div className={styles.overview_population}>
                        <div className={styles.overview_value}>{country.population}</div>
                        <div className={styles.overview_label}>Population</div>
                     </div>
                     <div className={styles.overview_area}>
                        <div className={styles.overview_value}>{country.area}</div>
                        <div className={styles.overview_label}>Area</div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.container_right}>
               <div className={styles.details_panel}>
                  <h4 className={styles.details_panel_heading}>Details</h4>

                  <div className={styles.details_panel_row}>
                     <div className={styles.details_panel_label}>Captial</div>
                     <div className={styles.details_panel_value}>
                        {country.capital}
                     </div>
                  </div>

                  <div className={styles.details_panel_row}>
                     <div className={styles.details_panel_label}>Subregion</div>
                     <div className={styles.details_panel_value}>
                        {country.subregion}
                     </div>
                  </div>

                  <div className={styles.details_panel_row}>
                     <div className={styles.details_panel_label}>Languages</div>
                     <div className={styles.details_panel_value}>
                        {
                           country.languages.length > 1 ?
                              (country.languages.map(language => language.name + ",")) : (country.languages[0].name)
                        }
                     </div>
                  </div>

                  <div className={styles.details_panel_row}>
                     <div className={styles.details_panel_label}>Currencies</div>
                     <div className={styles.details_panel_value}>
                        {country.currencies.length > 1 ? (
                           country.currencies.map((currency) =>
                              currency.name + ","
                           )
                        ) : (
                              country.currencies[0].name
                           )
                        }
                     </div>
                  </div>

                  <div className={styles.details_panel_row}>
                     <div className={styles.details_panel_label}>Native name</div>
                     <div className={styles.details_panel_value}>
                        {country.nativeName}
                     </div>
                  </div>

                  <div className={styles.details_panel_row}>
                     <div className={styles.details_panel_label}>Gini</div>
                     <div className={styles.details_panel_value}>
                        {country.gini}%
                  </div>
                  </div>

                  <div className={styles.details_panel_borders}>
                     <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>

                     <div className={styles.details_panel_borders_container}>

                        {borders.map((border) =>
                           <div className={styles.details_panel_borders_country}>
                              <img src={border.flag} alt={border.name} />

                              <div className={styles.details_panel_borders_name}>{border.name}</div>
                           </div>
                        )}
                     </div>

                  </div>

               </div>
            </div>



         </div>
      </Layout >
   );
}

export default Country;

// render   server  from  fetch
// prams.id === path.id
export const getServerSideProps = async ({ params }) => {
   const country = await getCountry(params.id);
   return {
      props: {
         country
      }
   };
}