import { useRef } from 'react';

export default function CommentInput({publicationData}) {

  const token = JSON.parse(localStorage.getItem('userData')).token;

  const textareaRef = useRef();

  
  console.log(publicationData)

  

  const submitComment = (e) => {
    e.preventDefault();
    let body = {
      content: textareaRef.current?.value,
      publications_idpublications: publicationData.id
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': token
      },
      body: JSON.stringify(body)
    }
    console.log(body)
    fetch('http://localhost:3001/news/comments/add', options)
  }



  return (
    <form onSubmit={submitComment} className="flex flex-col">
      <textarea ref={textareaRef} className="w-full bg-neutral-200 p-2 rounded-lg mb-2" placeholder="Ecrivez votre commentaire ici..." required></textarea>
      <button className="bg-blue-600 text-white py-2 px-4 w-full rounded-lg hover:bg-blue-500 font-semibold text-lg" type="submit">Publier</button>
    </form>
  )
}