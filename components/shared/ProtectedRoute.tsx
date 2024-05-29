// components/ProtectedRoute.tsx
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'

const ProtectedRoute = (WrappedComponent: React.FC<any>) => {
  const HocComponent: React.FC<any> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    

   useEffect(() => {
    const checkAuthentication = async () => {
      try {
       // const response = await axios.get('/api/check-auth'); // Example API endpoint to check authentication
        //if (response.data.authenticated) {
           
        const access_token = jwt.decode(Cookies.get('access_token') ?? ''); // Use nullish coalescing operator
           // console.log(jwt.decode(response.data.access_token))
          //alert(JSON.stringify(access_token))
        if(access_token){
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace('/login'); // Redirect to login page if not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        router.replace('/login'); // Redirect to login page if there's an error
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
    // Render the WrappedComponent if authenticated, else return null
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
    
  };

  return HocComponent;
};

export default ProtectedRoute;
