import { useEffect, useState } from 'react';
import Publication from '../components/publication/Publication';
import PublicationInput from '../components/publication/PublicationInput';
import useFetch from '../customHooks/useFetch';
import Spinner from '../components/spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../features/counter/publications';

export default function Feed() {

  const [dataIsProvided, setDataIsProvided] = useState(false);
  
  const { data, error, loading } = useFetch('http://localhost:3001/news');
  const dispatch = useDispatch()
  useEffect(() => {
    // Je suis obligé de faire ces vérifications pour éviter de re-dispatch l'ancien état au rechargement du composant
    if(dataIsProvided === false){
      dispatch(config(data))
      if(data !== null){
        setDataIsProvided(true)
      }
    }
    
  }, [data, dataIsProvided, dispatch])
  const globalState = useSelector((state) => (state));
  const publications = globalState.definePublications.value;
  console.log(globalState.definePublications.value)

  const onPublish = (newData) => {
    dispatch(config(newData))
  }
  const onDelete = (idPublication) => {
    // Je cherche où il est dans le tableau, je le supprime
    let filtered = publications.filter((data) => data.id !== idPublication)
    console.log(filtered)
    dispatch(config(filtered))
  }

  if(loading) return <Spinner />

  if(error) console.log(error);

  return (
    <div>
      <PublicationInput onPublish={onPublish} />
      <ol>
        {publications ? publications.map((data) => <Publication key={data.id} publicationData={data} onDelete={onDelete} />) : "Il n'y a actuellement aucune publication"}
      </ol>
    </div>
  );
}