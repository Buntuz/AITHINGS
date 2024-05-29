import { useEffect, useState } from 'react';

const useApiPost = () => {
  const [datapost, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const postData = async (url, bodydata) => {
    //url = "jkkdsjdksj"
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        config: { 
          headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer `+ localStorage.getItem('accessToken')
          }
          },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+ localStorage.getItem('accessToken')
        },
        body: JSON.stringify(bodydata),
      });

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
  };

  return { datapost, isLoading, error, postData };
};

export default useApiPost;
