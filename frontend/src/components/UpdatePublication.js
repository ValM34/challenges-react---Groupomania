import { useRef } from 'react';

export default function UpdatePublication({ publicationData }) {

  const refUpdate = useRef();

  const token = JSON.parse(localStorage.getItem('userData')).token;

  const updatePublication = (e) => {
    e.preventDefault();
    if(refUpdate.current.value !== undefined){
      let body = {
        content: refUpdate.current.value,
        id: publicationData.id
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': token
        },
        body: JSON.stringify(body)
      }
      fetch('http://localhost:3001/news/publications/update', options)
    }
  }

  return (
    <form onSubmit={updatePublication} >
      <textarea className="w-full bg-neutral-200 p-2 rounded-lg mb-1 h-40" ref={refUpdate} required defaultValue={publicationData.content}></textarea>
      <button className="bg-blue-600 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-500 font-semibold text-lg mb-2" type="submit">Valider</button>
    </form>
  )
}