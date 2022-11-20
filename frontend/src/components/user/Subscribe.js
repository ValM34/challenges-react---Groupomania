import { useRef, useState } from 'react';
import ValidationMessage from '../ValidationMessage';

export default function Subscribe({ toggle }) {

  const formRef = useRef();

  const [validation, setValidation] = useState(null);

  const callToAPI = (e) => {
    e.preventDefault(e)
    const name = formRef.current[0].value
    const surname = formRef.current[1].value
    const email = formRef.current[2].value
    const password = formRef.current[3].value

    let userInfos = {
      name: name,
      surname: surname,
      email: email,
      password: password
    }

    fetch(formRef.current.action, {
      method: formRef.current.method,
      body: JSON.stringify(userInfos),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        const succesMessage = 'Votre inscription est validée, vous pouvez maintenant vous connecter.';
        const errorMessage = 'Votre inscription a échoué.';
        setValidation({ok: response.ok, message: response.ok ? succesMessage : errorMessage});
        return;
      })
  }
  
  return (
    <section className="">
      <div className="">
        <div className="flex justify-center">
          <h1 className="w-full text-center m-2 py-2 rounded-full bg-blue-500 shadow-inner shadow-blue-700 text-white font-semibold">S'inscrire</h1>
          <h2 className="w-full text-center m-2 py-2 rounded-full bg-blue-700 shadow-md shadow-black text-white font-semibold cursor-pointer" onClick={toggle}>Se connecter</h2>
        </div>
        <form method="POST" action="http://localhost:3001/users/signup" onSubmit={callToAPI} className="flex flex-col" ref={formRef}>
          <input type="text" className="my-2 p-2 rounded-md" placeholder="nom" required />
          <input type="text" className="my-2 p-2 rounded-md" placeholder="prénom" required />
          <input type="email" className="my-2 p-2 rounded-md" placeholder="email" required />
          <input type="password" className="my-2 p-2 rounded-md" placeholder="mot de passe" required />
          <div className="flex justify-center">
            <button type="submit" className="px-10 text-white font-semibold py-2 bg-orange-400 mt-2 w-fit rounded-full shadow-md shadow-blue-700">Valider</button>
          </div>
          {validation !== null ? <ValidationMessage validation={validation} /> : ''}
        </form>
      </div>
    </section>
  );
}