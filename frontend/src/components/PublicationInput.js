import { useRef } from 'react';

export default function PublicationInput() {

  const formRef = useRef();

  let token = JSON.parse(localStorage.getItem('userData')).token;
  
  const publish = (e) => {
    e.preventDefault();
    let body = {content: formRef.current.value};
    let options = {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': token
      },
      body: JSON.stringify(body)
    }
    console.log(formRef.current.value);
    fetch('http://localhost:3001/news/publications/add', options)
  }

  

  

  return (
    <form className="bg-white p-4 mb-6 max-w-3xl rounded-lg shadow-md shadow-neutral-300" method='POST'>
      <h2 className="font-semibold text-center mb-2 text-lg">Ajouter une publication</h2>
      <textarea ref={formRef} className="w-full bg-neutral-200 p-2 rounded-lg mb-1" name="publicationInput" id="publicationInput" placeholder="Quoi de neuf, [name] ?" required></textarea>
      <button onClick={publish} className="bg-blue-600 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-500 font-semibold text-lg" type="submit">Publier</button>
    </form>
  )
}