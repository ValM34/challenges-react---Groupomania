import { useState } from 'react';

export default function Rendu(){

  function useIncrement(initialValue, step = 1){
    const [count, setCount] = useState(initialValue);

    const increment = () => {
      setCount(c => c + 1);
    }

    return [count, increment];
  }

  function Compteur(){
    const [count, increment] = useIncrement(10);

    return <button onClick={increment}>Incrémenter {count}</button>
  }

  return(
    <Compteur />
  )
}