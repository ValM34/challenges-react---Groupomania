import { useState } from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput';
import UpdatePublication from './UpdatePublication';
import dateConverter from '../helpers/dateConverter';
import { useSelector } from 'react-redux';

export default function Publication({ publicationData, onDelete }) {

  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [likes, setLikes] = useState(publicationData.likes.length);

  const isAdmin = useSelector((state) => state.defineIsAdmin.value);

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
  const idUser = JSON.parse(localStorage.getItem('userData')).userId
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
      .then(res => res.json())
      .then(res => {
        if(res.message === 'LIKE_ADDED') {
          setLikes(likes + 1)
          setIsLiked(true)
        } else if(res.message === 'LIKE_DELETED'){
          setLikes(likes - 1)
          setIsLiked(false)
        }
      })
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
    fetch('http://localhost:3001/news/publications/delete', options)
      .then(() => {
        onDelete(publicationData.id)
      })
  }

  const onAddComment = (newComment) => {
    setIsCommented(newComment)
  }

  if(isAdmin){
    return (
      <li className="bg-white p-4 mb-6 max-w-3xl rounded-lg shadow-md shadow-neutral-300">
        <div className="flex justify-between border-b border-neutral-200 font-bold mb-4">
          <div className="italic">{publicationData.name} {publicationData.surname} le {updatedAt}</div>
          <div>
            <a className="mr-2" href="" onClick={updatePublication}>Modifier</a>
            <a href="" onClick={deletePublication}>Supprimer</a>
          </div>
        </div>
        {updating ? <UpdatePublication publicationData={publicationData} /> : <div className="mb-4 break-words">{publicationData.content}</div>}
        <div className="border-y border-neutral-200 flex justify-around">
          {isLiked === true ? <button onClick={toggleLike} className="font-bold text-blue-600">J'aime : {likes}</button> : <button onClick={toggleLike}>J'aime : {likes}</button>}
          <button onClick={displayCommentInput}>Commenter</button>
        </div>
        {commentInput ? <CommentInput onAddComment={onAddComment} publicationData={publicationData} /> : ''}
        <ol>
          {isCommented ? isCommented.map((comment) => <Comment key={comment.id} commentData={comment} />) : "Il n'y a actuellement aucun commentaire"}
        </ol>
      </li>
    )
  } else {
    return(
      <li className="bg-white p-4 mb-6 max-w-3xl rounded-lg shadow-md shadow-neutral-300">
        <div className="flex justify-between border-b border-neutral-200 font-bold mb-4">
          <div className="italic">{publicationData.name} {publicationData.surname} le {updatedAt}</div>
          <div>
            {idUser === publicationData.users_idusers ? <a className="mr-2" href="" onClick={updatePublication}>Modifier</a> : ""}
            {idUser === publicationData.users_idusers ? <a href="" onClick={deletePublication}>Supprimer</a> : ""}
          </div>
        </div>
        {updating ? <UpdatePublication publicationData={publicationData} /> : <div className="mb-4 break-words">{publicationData.content}</div>}
        <div className="border-y border-neutral-200 flex justify-around">
          {isLiked === true ? <button onClick={toggleLike} className="font-bold text-blue-600">J'aime : {likes}</button> : <button onClick={toggleLike}>J'aime : {likes}</button>}
          <button onClick={displayCommentInput}>Commenter</button>
        </div>
        {commentInput ? <CommentInput onAddComment={onAddComment} publicationData={publicationData} /> : ''}
        <ol>
          {isCommented ? isCommented.map((comment) => <Comment key={comment.id} commentData={comment} />) : "Il n'y a actuellement aucun commentaire"}
        </ol>
      </li>
    )
  }
  
}