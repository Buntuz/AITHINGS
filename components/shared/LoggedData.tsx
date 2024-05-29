import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

// Define the AccessTokenMessage type
type AccessTokenMessage = [
  number, // user_id
  string, // username
  number, // person_id
  number, // school_id (assuming it's a number)
  string, // last_name
  string, // first_name
  string  // role_type
];

// Define the UserData type
type UserData = {
  userId: number;
  username: string;
  personId: number;
  schoolId: number;
  lastName: string;
  firstName: string;
  roleType: string;
};

type AccessToken = {
  fresh: boolean;
  iat: string;
  exp: string;
  message:[
    number, // user_id
    string, // username
    number, // person_id
    number, // school_id (assuming it's a number)
    string, // last_name
    string, // first_name
    string  // role_type
  ];
}
// Custom hook to handle user data and access token
const LoggedData = (): UserData | null => {
  //const [userData, setUserData] = useState<UserData | null>(null);

   //Initialize state object
   const [userData, setUserData] = useState<{
    userId: number;
    username: string;
    personId: number;
    schoolId: number;
    lastName: string;
    firstName: string;
    roleType: string;
  }>({
    userId: 0,
    username: '',
    personId: 0,
    schoolId: 0,
    lastName: '',
    firstName: '',
    roleType: '',
  });

  // Function to handle setting state from the message array
  const handleSetStateFromMessage = (message: AccessTokenMessage) => {
    
    if (message && message.length >= 0) {
    setUserData({
      userId: message[0] || 0,
      username: message[1] || '',
      personId: message[2] || 0,
      schoolId: message[3] || 0,
      lastName: message[4] || '',
      firstName: message[5] || '',
      roleType: message[6] || '',
    });
  }
  };

  useEffect(() => {
    //const access_token = jwt.decode(Cookies.get('access_token') ?? '') as AccessTokenMessage | null;
    
    const access_tokeobject = jwt.decode(Cookies.get('access_token') ?? ''); // Use nullish coalescing operator
    const access_token: AccessToken = access_tokeobject as unknown as AccessToken;
    const message: AccessTokenMessage = access_token?.message;
    handleSetStateFromMessage(message);

  }, []);

  //alert(JSON.stringify(userData.userId))
  return userData;
};

export default LoggedData;
