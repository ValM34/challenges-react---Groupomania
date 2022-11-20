import dateConverter from '../../helpers/dateConverter';
import UpdateComment from '../UpdateComment';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Comment({ commentData }) {

  const [updating, setUpdating] = useState(false);
  const isAdmin = useSelector((state) => state.defineIsAdmin.value);

  // throw new Error();
  const updateComment = (e) => {
    e.preventDefault();
    if (updating === false) {
      setUpdating(true);
    }
  }

  let createdAt = dateConverter(commentData.createdAt);

  let token = JSON.parse(localStorage.getItem('userData')).token;

  const deleteComment = (e) => {
    e.preventDefault();

    let body = { id: commentData.id };

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': token
      },
      body: JSON.stringify(body)
    }

    fetch('http://localhost:3001/news/comments/delete', options)
  }

  const idUser = JSON.parse(localStorage.getItem('userData')).userId;

  

  if (isAdmin) {
    return (
      <li className="bg-neutral-200 rounded-3xl my-4 p-3 w-fit">
        <div className="flex justify-between">
          <div>{commentData.name} {commentData.surname}</div>
          <div className="flex">
            <button onClick={updateComment} className="mx-2">Modifier</button>
            <button onClick={deleteComment} className="mx-2">Supprimer</button>
          </div>
        </div>
        {updating ? <UpdateComment commentData={commentData} /> : <div className="break-words">{commentData.content}</div>}
        {createdAt}
      </li>
    )
  } else {
    return (
      <li className="bg-neutral-200 rounded-3xl my-4 p-3 w-fit">
        <div className="flex justify-between">
          <div>{commentData.name} {commentData.surname}</div>
          <div className="flex">
            {idUser === commentData.idUser ? <button onClick={updateComment} className="mx-2">Modifier</button> : ""}
            {idUser === commentData.idUser ? <button onClick={deleteComment} className="mx-2">Supprimer</button> : ""}
          </div>
        </div>
        {updating ? <UpdateComment commentData={commentData} /> : <div className="break-words">{commentData.content}</div>}
        {createdAt}
      </li>
    )
  }
}