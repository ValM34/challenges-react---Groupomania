import React from "react";

export default function Test() {
    
  function throwError(){
    throw new Error();
  }

  
  return (
        <h1 onClick={throwError}>TEST</h1>
  );
}
