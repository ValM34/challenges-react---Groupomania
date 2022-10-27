import Subscribe from '../components/Subscribe';
import Connexion from '../components/Connexion';
import { useState } from 'react';

export default function Home({onLogged}) {

  const [switchPage, setSwitchPage] = useState(false);

  function toggle () {
    if(switchPage === true) {
      setSwitchPage(false);
    } else {
      setSwitchPage(true);
    }
  }

  return (
    <div className="bg-blue-600 p-2 rounded-md w-full max-w-[650px]">
      {switchPage ? <Connexion onLogged={onLogged} toggle={toggle} /> : <Subscribe toggle={toggle} />}
    </div>
  );
}