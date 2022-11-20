import React from "react";
import useFetch from '../customHooks/useFetch';

export default function Test2() {
    
  const { data, error, loading } = useFetch('https://v2.jokeapi.dev/joke/Any');
  
  if(loading) return <h1>LOADING...</h1>

  if(error) console.log(error);
  console.log(data)
  return (
        <h1>{data?.setup} : {data?.delivery}</h1>
  );
}
