import React, { useState } from 'react';
import styles from "./CountriesTable.module.css"
import KeyboardArrowDownRounded from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpRounded from "@material-ui/icons/KeyboardArrowUp";
import Link from 'next/link'

//population の大小で並び替え　sort 
const orderBy = (countries, value, direction) => {
   if (direction === "asc") {
      return [...countries].sort((a, b) => (a[value] > b[value]) ? 1 : -1)

   }
   if (direction === "desc") {
      return [...countries].sort((a, b) => (a[value] > b[value]) ? -1 : 1)
   }

   return countries;
}
//  component
const SortArrow = (props) => {
   if (!props.direction) {
      return <></>;
   }
   if (props.direction === "desc") {
      return (
         <div className={styles.heading_arrow}>
            <KeyboardArrowDownRounded color="inherit" />
         </div>
      )
   } else {
      return (
         <div className={styles.heading_arrow}>
            <KeyboardArrowUpRounded color="inherit" />
         </div>
      )
   }
}

//  component  main
const CountriesTable = ({ countries }) => {  //countries === 250xobjects
   const [direction, setDirection] = useState();   //  desc  arc  null
   const [value, setValue] = useState();  //  name  or  population

   const ordererCountries = orderBy(countries, value, direction)

   const switchDirection = () => {
      if (!direction) {
         setDirection("desc")
      } else if (direction === "desc") {
         setDirection("arc")
      } else {
         setDirection(null)
      }
   }

   const setValueAndDirection = (value) => {
      switchDirection();
      setValue(value)
   }

   return (
      <div>
         <div className={styles.heading}>
            <button className={styles.heading_name}
               onClick={() => setValueAndDirection("name")}>
               <div>Name</div>

               <SortArrow direction="drec" />

            </button>

            <button className={styles.heading_population}
               onClick={() => setValueAndDirection("population")}>
               <div>Population</div>

               <SortArrow direction={direction} />

            </button>
         </div>

         {ordererCountries.map(country =>
            <Link href={`/country/${country.alpha3Code}`}>
               <div className={styles.row}>
                  <div className={styles.name}>{country.name}</div>
                  <div className={styles.population}>{country.population}</div>
               </div>
            </Link>
         )
         }

      </div>
   );
}

export default CountriesTable;