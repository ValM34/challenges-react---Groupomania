import { useEffect, useState } from "react";

export default function useFetch(url, body = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("userData")).token;
  
    let options = {};
    if(body === null){
      options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
    } else {
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      };
    }
    fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          setData(response);
          console.log(response);
        })
        .then(() => setLoading(false))
        .catch((err) => {
          setError(err);
        });
  }, [url]);

  return { data, loading, error };
}