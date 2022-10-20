import Home from './pages/Home';
import About from './pages/About';
import Feed from './pages/Feed';
import Header from './layouts/Header';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {

  const [isLogged, setIsLogged] = useState(false);
  const token = JSON.parse(localStorage.getItem('userData'))?.token ?? null;

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  }
  if (token !== null) {
    fetch('http://localhost:3001/users', options)
      .then((response) => response.json())
      .then((response) => {
        if (response.id) {
          setIsLogged(true);
        }
      })
  }


  if (isLogged === true) {
    return (
      <div className="flex flex-col items-center bg-neutral-100">
        <BrowserRouter>
          <Header />
          <div className="max-w-7xl w-full p-4 my-10 flex justify-center">
            <Routes>
              <Route path="/" element={<Feed />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center bg-neutral-100">
        <BrowserRouter>
          <Header />
          <div className="max-w-7xl w-full p-4 my-10 flex justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/a-propos" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

// Mes pages : 
// Page d'accueil (connexion, inscription)
// Fil d'actualité (postList, post, formulaire pour écrire un post, )

// <Feed>
// <PostList>
// </PostList>
// <PostForm>
// </PostForm>
// </Feed>

// Mes petits composants :
// Button, 