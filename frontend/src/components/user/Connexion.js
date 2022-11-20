import { useRef, useState } from 'react';
import ValidationMessage from '../ValidationMessage';

export default function Connexion({ toggle, onLogged }) {

  const [validation, setValidation] = useState(null);

  const formRef = useRef();

  const callToAPI = (e) => {
    e.preventDefault(e)
    const email = formRef.current[0].value
    const password = formRef.current[1].value

    let userInfos = {
      email: email,
      password: password
    }

    let test = false;
    const succesMessage = 'Connexion validée, connexion en cours...';
    const errorMessage = 'Votre inscription a échoué.';


    fetch(formRef.current.action, {
      method: formRef.current.method,
      body: JSON.stringify(userInfos),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        test = response.ok;
        return response.json();
      })
      .then((response) => {
        setValidation({ ok: test, message: test ? succesMessage : errorMessage });
        if (test === true) {
          localStorage.setItem("userData", JSON.stringify(response))
          onLogged();
        }
      })
  }



  return (
    <section className="">
      <div className="">
        <div className="flex justify-center">
          <h1 className="w-full text-center m-2 py-2 rounded-full bg-blue-700 shadow-md shadow-black text-white font-semibold cursor-pointer" onClick={toggle}>S'inscrire</h1>
          <h2 className="w-full text-center m-2 py-2 rounded-full bg-blue-500 shadow-inner shadow-blue-700 text-white font-semibold">Se connecter</h2>
        </div>
        <form method="POST" action="http://localhost:3001/users/signin" onSubmit={callToAPI} className="flex flex-col" ref={formRef}>
          <input type="email" className="my-2 p-2 rounded-md" placeholder="email" required />
          <input type="password" className="my-2 p-2 rounded-md" placeholder="mot de passe" required />
          <div className="flex justify-center">
            <button type="submit" className="px-10 text-white font-semibold py-2 bg-orange-400 mt-2 w-fit rounded-full shadow-md shadow-blue-700">Valider</button>
          </div>
        </form>
        {validation !== null ? <ValidationMessage validation={validation} /> : ''}
      </div>
    </section>
  );
}