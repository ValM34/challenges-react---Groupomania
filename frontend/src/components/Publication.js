import { useState, useRef } from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput';
import UpdatePublication from './UpdatePublication';
import dateConverter from '../helpers/dateConverter';

export default function Publication({ publicationData }) {

  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(null);
  const [updating, setUpdating] = useState(false);


  const updatePublication = (e) => {
    e.preventDefault();
    if (updating === false) {
      setUpdating(true);
    }
  }

  let updatedAt = dateConverter(publicationData.updatedAt);

  if (isLiked === false) {
    const idUser = JSON.parse(localStorage.getItem('userData')).userId
    publicationData.likes.forEach(like => {
      if (like.userId === idUser) {
        setIsLiked(true);
      }
    })
  }
  const body = {
    publications_idpublications: JSON.stringify(publicationData.id)
  }
  const token = JSON.parse(localStorage.getItem('userData')).token
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  }
  if (isCommented === null) {
    fetch('http://localhost:3001/news/comments/getcomments', options)
      .then(response => response.json())
      .then(response => setIsCommented(response))
  }

  const toggleLike = () => {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': token
      },
      body: JSON.stringify(body)
    }
    fetch('http://localhost:3001/news/likes/add', params)
  }

  const [commentInput, setCommentInput] = useState(false);

  function displayCommentInput() {
    setCommentInput(true);
    console.log(commentInput)
  }

  const deletePublication = (e) => {
    e.preventDefault();
    const idPublication = {
      id: JSON.stringify(publicationData.id)
    }
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': token
      },
      body: JSON.stringify(idPublication)
    };
    fetch('http://localhost:3001/news/publications/delete', options);

  }

  return (
    <li className="bg-white p-4 mb-6 max-w-3xl rounded-lg shadow-md shadow-neutral-300">
      <div className="flex justify-between border-b border-neutral-200 font-bold mb-4">
        <div className="italic">{publicationData.name} {publicationData.surname} le {updatedAt}</div>
        <div>
          <a href="" onClick={updatePublication}>Modifier</a>
          <a href="" onClick={deletePublication}>Supprimer</a>
        </div>
      </div>
      {updating ? <UpdatePublication publicationData={publicationData} /> : <div className="mb-4 break-words">{publicationData.content}</div>}
      <div className="border-y border-neutral-200 flex justify-around">
        {isLiked === true ? <button onClick={toggleLike} className="font-bold text-blue-600">J'aime : {publicationData.likes.length}</button> : <button onClick={toggleLike}>J'aime : {publicationData.likes.length}</button>}
        <button onClick={displayCommentInput}>Commenter</button>
      </div>
      {commentInput ? <CommentInput publicationData={publicationData} /> : ''}
      <ol>
        {isCommented ? isCommented.map((comment) => <Comment key={comment.id} commentData={comment} />) : "Il n'y a actuellement aucun commentaire"}
      </ol>
    </li>
  )
}