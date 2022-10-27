import { useState } from 'react';
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

  const onPublish = (newData) => setData(newData)
  const onDelete = (idPublication) => {
    // Je cherche où il est dans le tableau, je le supprime
    let filtered = data.filter((data) => data.id !== idPublication)
    setData(filtered)
  }

  return (
    <div>
      <PublicationInput onPublish={onPublish} />
      <ol>
        {data ? data.map((data) => <Publication key={data.id} publicationData={data} onDelete={onDelete} />) : "Il n'y a actuellement aucune publication"}
      </ol>
    </div>
  );
}