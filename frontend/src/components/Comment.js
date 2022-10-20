import dateConverter from '../helpers/dateConverter';

export default function Comment({ commentData }) {

  let updatedAt = dateConverter(commentData.updatedAt);

  let token = JSON.parse(localStorage.getItem('userData')).token;

  const updateComment = (e) => {
    e.preventDefault();
    // fetch('http://localhost:3001/news/comments/Update')
  }

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

  return (
    <li className="bg-neutral-200 rounded-3xl my-4 p-3 w-fit">
      <div className="flex justify-between">
        <div>{commentData.name} {commentData.surname} {updatedAt}</div>
        <div className="flex">
          <button onClick={updateComment} className="mx-2">Modifier</button>
          <button onClick={deleteComment} className="mx-2">Supprimer</button>
        </div>
      </div>
      <div className="break-words">
        {commentData.content}
      </div>
    </li>
  )
}