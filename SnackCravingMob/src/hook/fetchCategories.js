import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCategories = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get('http://192.168.1.246/Final-Project/backendMobile/fetch_categories.php');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []); 

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchCategories;