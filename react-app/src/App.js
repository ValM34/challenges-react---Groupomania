import './App.scss';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';

import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import News from "./pages/News/News";


import { useState } from 'react';



function App() {

  const [isNotLogged, setLoggedOrNot] = useState(true);



  let getToken = JSON.parse(localStorage.getItem('userData'));

  if (isNotLogged === true) {
    if (!getToken) {
    } else {

      fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Authorization': getToken[0].token
        },
      })
        .then(response => response.json())
        .then((response) => {
          if (response.id) {
            setLoggedOrNot(false);
          }
        });
    }

  }


  return (
    <div className="App">
      <Header isNotLogged={isNotLogged} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isNotLogged ? <Home /> : <News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;