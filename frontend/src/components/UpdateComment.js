import { useRef } from 'react';

export default function UpdateComment({ commentData }) {

  let token = JSON.parse(localStorage.getItem('userData')).token;

  const refUpdate = useRef();

  const updateComment = (e) => {
    e.preventDefault();

    let body = {
      id: commentData.id,
      content: refUpdate.current.value
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': token
      },
      body: JSON.stringify(body)
    }
    fetch('http://localhost:3001/news/comments/Update', options)
  }

  return (
    <form className="flex flex-col" onSubmit={updateComment}>
      <textarea className="w-full bg-white p-2 rounded-lg mb-1 h-20" ref={refUpdate} required defaultValue={commentData.content}></textarea>
      <button className="bg-blue-600 text-white py-2 px-4 w-fit rounded-lg hover:bg-blue-500 font-semibold text-lg mt-2" type="submit">Modifier</button>
    </form>
  )
}