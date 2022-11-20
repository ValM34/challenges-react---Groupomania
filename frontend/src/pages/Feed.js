import { useEffect, useState } from 'react';
import Publication from '../components/publication/Publication';
import PublicationInput from '../components/publication/PublicationInput';
import useFetch from '../customHooks/useFetch';

export default function Feed() {

  console.log('étape 1')

  // const [data, setData] = useState(null);

  const token = JSON.parse(localStorage.getItem('userData')).token;
  
  /*useEffect(() => {
    console.log('useEffect')
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
  }, [data])*/

  const { data, error, loading } = useFetch('http://localhost:3001/news');
  
  console.log('étape 2')
  /*const onPublish = (newData) => setData(newData)
  const onDelete = (idPublication) => {
    // Je cherche où il est dans le tableau, je le supprime
    let filtered = data.filter((data) => data.id !== idPublication)
    setData(filtered)
  }*/
  console.log('étape 3')

  if(loading) return <h1>LOADING...</h1>

  if(error) console.log(error);

  console.log(data)
  return (
    <div>
      <PublicationInput /*onPublish={onPublish}*/ />
      <ol>
        {data ? data.map((data) => <Publication key={data.id} publicationData={data} /*onDelete={onDelete}*/ />) : "Il n'y a actuellement aucune publication"}
      </ol>
    </div>
  );
}