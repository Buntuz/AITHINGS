import { useEffect, useState } from 'react';

const useApiFetch = () => {
    const [dataFetched, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async (url,additionalParams) => {
              try {
                    const response = await fetch(url, additionalParams);
                    // Create a clone of the response
                    const clonedResponse = response.clone(); 
                    const jsonData = await response.json();
                    setData(jsonData);
                    // You can access the response body again from the cloned response
                    const responseData = await clonedResponse.json();

              } catch (error) {
                  setError(error);
              } finally {
                  setIsLoading(false);
              }      
        }
    return { dataFetched, isLoading, error, fetchData};
  };

  export default useApiFetch;
  