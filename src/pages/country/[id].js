import Layout from "../../components/Layout/Layout"
import styles from "./country.module.css";

const Country = ({ country }) => {
   console.log(country);
   return (
      <Layout title={country.name}>
         <div>
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
                     {country.languages > 1 ? (
                        country.languages.map((language) => {
                           const data = [];
                           data.push(language.name)
                           data.join(",")
                        })
                     ) : (
                           country.languages[0].name
                        )
                     }
                  </div>
               </div>

               <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Currencies</div>
                  <div className={styles.details_panel_value}>
                     {country.currencies > 1 ? (
                        country.languages.map((language) => {
                           const data = [];
                           data.push(language.name)
                           data.join(",")
                           return data;
                        })
                     ) : (
                           country.languages[0].name
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

            </div>

         </div>
      </Layout >
   );
}

export default Country;

// render   server  from  fetch
// id === country.alpha3Code
export const getServerSideProps = async ({ params }) => {
   const url = `https://restcountries.eu/rest/v2/alpha/${params.id}`
   const res = await fetch(url);

   const country = await res.json();
   return {
      props: {
         country
      }
   };
}