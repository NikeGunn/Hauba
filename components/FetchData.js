import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchData = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  if (loading) {
    return <p>Loading...</p>; // You can use any loading indicator here
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li> // Update with your data structure
        ))}
      </ul>
    </div>
  );
};

export default FetchData;
