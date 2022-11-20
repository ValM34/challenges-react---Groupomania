import Home from './pages/Home';
import About from './pages/About';
import Feed from './pages/Feed';
import Header from './layouts/Header';
import Profil from './pages/Profil';
import Rendu from './components/Rendu';
import Test2 from './pages/Test2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { config } from './features/counter/isAdminSlice';
import useFetch from './customHooks/useFetch';

function App() {
  const dispatch = useDispatch()

  const [isLogged, setIsLogged] = useState(false);
  // const token = JSON.parse(localStorage.getItem('userData'))?.token ?? null;

  /*useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
    if (token !== null && isLogged === false) {
      fetch('http://localhost:3001/users', options)
        .then((response) => response.json())
        .then((response) => {
          if (response.id) {
            setIsLogged(true);
          }
          if (response.isAdmin) {
            dispatch(config(response.isAdmin))
          }
        })
    }
  }, [dispatch, isLogged, token])*/

  const { data, loading, error } = useFetch('http://localhost:3001/users');
  useEffect(() => {
    dispatch(config(data?.isAdmin))
  })
  
  const onLogged = () => setIsLogged(true);
  const onLogout = () => setIsLogged(false);

  if (data?.isAdmin === true) {
    return (
      <div className="flex flex-col items-center bg-neutral-100">
        <BrowserRouter>
          <Header isLogged={isLogged} onLogout={onLogout} />
          <div className="max-w-7xl w-full p-4 my-10 flex justify-center">
            <Routes>
              <Route path="/profil" element={<Profil />} />
              <Route path="/" element={<Feed />} />
              <Route path="/rendu" element={<Rendu />} />
              <Route path="/about" element={<About />} />
              <Route path="/test2" element={<Test2 />} />
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
              <Route path="/a-propos" element={<About />} />
              <Route path="/" element={<Home onLogged={onLogged} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;