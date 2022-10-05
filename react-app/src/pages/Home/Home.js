import Inscription from '../../components/Inscription/Inscription';
import Connexion from '../../components/Connexion/Connexion';

import {useState} from 'react';

function Home() {

  
    const [monState, setMonState] = useState(true)
  
    const modifyState = (data) => {
      if(monState === true){
        setMonState(false);
      } else {
        setMonState(true);
      }
    }
    return (
      <div>
        <h1>Réseau social de Groupomania</h1>
        <section>
         {monState ? <Inscription func={modifyState} /> : <Connexion func={modifyState} />}
        </section>
      </div>
    );
  }
  
  export default Home;