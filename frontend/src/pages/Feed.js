import { useState, useEffect, Component } from 'react';
import Publication from '../components/Publication';
import PublicationInput from '../components/PublicationInput';

export default function Feed() {

  const [data, setData] = useState(null);

  const token = JSON.parse(localStorage.getItem('userData')).token;
  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  }
  if (data === null) {
    fetch('http://localhost:3001/news', options)
      .then((response) => response.json())
      .then((response) => {
        setData(response)
      })
  }

  return (
    <div>
      <PublicationInput />
      <ol>
        {data ? data.map((data) => <Publication key={data.id} publicationData={data} />) : "Il n'y a actuellement aucune publication"}
      </ol>
    </div>
  );
}