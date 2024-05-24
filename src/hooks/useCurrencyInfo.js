import { useEffect, useState } from "react";

function useCurrencyInfo (currency) {
    const [data, setData] = useState({})
    useEffect( () => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res) => res.json())
        .then((res) => {
            const currencyData = res[currency]; // Get the object for the specified currency
            const keysWithThreeDigitValues = Object.keys(currencyData).filter(key => {
              return key.toString().length === 3; // Check if the value's length is 3
            });
            
            // Create an object with filtered keys
            const filteredData = keysWithThreeDigitValues.reduce((acc, key) => {
              acc[key] = currencyData[key];
              return acc;
            }, {});
    
            setData(filteredData); // Update the state with the filtered data
          })
          .catch((error) => {
            console.error('Error:', error); // Handle any errors
          });
      }, [currency]);
    
      return data;
    }

    export default useCurrencyInfo