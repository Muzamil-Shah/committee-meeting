import { jwtDecode } from "jwt-decode";
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { REFRESH_TOKEN } from "./endpoint";


export const useToken = () => {
  // const navigate = useNavigate();
  const timeCheck = 1300;

  const getToken = async () => {
    const token = localStorage.getItem('token');    
    if (!token) {
      // navigate('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    const expiryDateInSeconds = decodedToken.exp;
    if (expiryDateInSeconds === undefined) {
        // navigate('/login');
        return;
      }
    const currentDateInSeconds = Math.floor(Date.now() / 1000);
    const durationInSeconds = expiryDateInSeconds - currentDateInSeconds;

    console.log({durationInSeconds});
    
    
    if (durationInSeconds <= timeCheck) {
      try {
        const response = await axios.get(REFRESH_TOKEN, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newToken = response?.data?.token;
        localStorage.setItem('token', newToken);
        return newToken;
      } catch (error) {
        // localStorage.clear();
        // sessionStorage.clear();
        // navigate('/login');
        console.error(error);
      }
    } else {
      return token;
    }
  };

  return { getToken };
};
