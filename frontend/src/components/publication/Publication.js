import { useState, useReducer, useEffect } from 'react';
import Comment from '../comment/Comment';
import CommentInput from '../comment/CommentInput';
import UpdatePublication from '../UpdatePublication';
import dateConverter from '../../helpers/dateConverter';
import { useSelector } from 'react-redux';
import React from 'react';
import ValidationMessage from '../ValidationMessage';
import useFetch from '../../customHooks/useFetch';

export default function Publication({ publicationData, onDelete }) {

  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(null);
  const [updating, setUpdating] = useState(false);

  const likes = publicationData.likes.length;

  const reducer = (state, action) => {
    switch(action.type){
      default:
        throw new Error('Action non supportée');
      case 'INCREMENT':
        return {count: state.count + action.payload};
      case 'DECREMENT':
        return {count: state.count - action.payload};
    }
  }
  const [likes2, dispatch] = useReducer(reducer, {count: publicationData.likes.length});
  const increment = (step = 1) => {
    dispatch({type: 'INCREMENT', payload: step});
  }
  const decrement = (step = 1) => {
    dispatch({type: 'DECREMENT', payload: step});
  }

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

  const { data, error, loading } = useFetch('http://localhost:3001/news/comments/getcomments', body);

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
          increment(1);
          setIsLiked(true)
        } else if(res.message === 'LIKE_DELETED'){
          decrement(1)
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

  const validation = {ok: false, message: 'Il y a eu une erreur pendant le chargement des publication'}

  class ErrorBoundary extends React.Component {

    constructor(props) {
      super(props);
      this.state = {error: false}
    }

    static getDerivedStateFromError(error) {
      return {error: true}
    }

    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }

    render() {
      if(this.state.error){
        return <ValidationMessage validation={validation} />
      }
      return this.props.children;
    }
  }

  if(isAdmin){
    return (
      <ErrorBoundary>
        <li className="bg-white p-4 mb-6 max-w-3xl rounded-lg shadow-md shadow-neutral-300">
          <div className="flex justify-between border-b border-neutral-200 font-bold mb-4">
            <div className="italic">{publicationData.name} {publicationData.surname} le {updatedAt}</div>
            <div>
              <button className="mr-2" onClick={updatePublication}>Modifier</button>
              <button onClick={deletePublication}>Supprimer</button>
            </div>
          </div>
          {updating ? <UpdatePublication publicationData={publicationData} /> : <div className="mb-4 break-words">{publicationData.content}</div>}
          <div className="border-y border-neutral-200 flex justify-around">
            {isLiked === true ? <button onClick={toggleLike} className="font-bold text-blue-600">J'aime : {likes2.count}</button> : <button onClick={toggleLike}>J'aime : {likes2.count}</button>}
            <button onClick={displayCommentInput}>Commenter</button>
          </div>
          {commentInput ? <CommentInput onAddComment={onAddComment} publicationData={publicationData} /> : ''}
          <ol>
            {data ? data.map((comment) => <Comment key={comment.id} commentData={comment} />) : "Il n'y a actuellement aucun commentaire"}
          </ol>
        </li>
      </ErrorBoundary>
    )
  } else {
    return(
      <li className="bg-white p-4 mb-6 max-w-3xl rounded-lg shadow-md shadow-neutral-300">
        <div className="flex justify-between border-b border-neutral-200 font-bold mb-4">
          <div className="italic">{publicationData.name} {publicationData.surname} le {updatedAt}</div>
          <div>
            {idUser === publicationData.users_idusers ? <button className="mr-2" onClick={updatePublication}>Modifier</button> : ""}
            {idUser === publicationData.users_idusers ? <button onClick={deletePublication}>Supprimer</button> : ""}
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