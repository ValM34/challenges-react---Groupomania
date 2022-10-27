import { useState, useRef } from 'react';

export default function Profil() {

  const [user, setUser] = useState(null);
  const [updatingProfil, setUpdatingProfil] = useState(false);
  const formRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();

  const token = JSON.parse(localStorage.getItem('userData')).token;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': token
    }
  }

  if (user === null) {
    fetch('http://localhost:3001/users/current', options)
      .then((res) => res.json())
      .then((user) => { setUser(user) })
  }

  function displayUpdateProfil(e) {
    e.preventDefault();
    setUpdatingProfil(true);
  }
  function updateProfil(e) {
    e.preventDefault();

    const body = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value
    }

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': token
      },
      body: JSON.stringify(body)
    }

    fetch('http://localhost:3001/users/update', params)
  }


  if (updatingProfil === true) {
    return (
      <form onSubmit={updateProfil} ref={formRef}>
        <div className="my-2"><label>nom : </label><input ref={nameRef} /></div>
        <div className="my-2"><label>prénom : </label><input ref={surnameRef} /></div>
        <div className="my-2"><label>email : </label><input ref={emailRef} /></div>
        <button className="bg-blue-600 text-white py-0 px-2 w-fit rounded-md hover:bg-blue-500 font-semibold text-lg mt-2">Valider</button>
      </form>
    )
  } else {
    return (
      <div>
        <h1 className="text-4xl font-bold">Votre profil</h1>
        <div>
          <div>nom : {user?.name}</div>
          <div>prénom : {user?.surname}</div>
          <div>email : {user?.email}</div>
          <div>role : {user?.isAdmin ? 'admin' : 'utilisateur'}</div>
          <a onClick={displayUpdateProfil} className="text-blue-600 underline cursor-pointer">Modifier</a>
        </div>
      </div>
    )
  }




}