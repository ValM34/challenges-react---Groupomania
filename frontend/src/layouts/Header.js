export default function Header({ isLogged, onLogout }) {

  const deconnexion = (e) => {
    e.preventDefault();
    localStorage.removeItem('userData');
    onLogout();
  }

  if (isLogged == true) {
    return (
      <header className="flex flex-col items-center text-white w-full">
        <div className="bg-blue-600 text-4xl font-extrabold w-full text-center p-4">Groupomania</div>
        <div className="w-full">
          <nav className="flex flex-wrap justify-center bg-blue-600">
            <a href="/" className="m-2 md:m-4 py-2 px-4 bg-blue-500 rounded-full">Actualités</a>
            <a href="/profil" className="m-2 md:m-4 py-2 px-4 bg-blue-500 rounded-full">Profil</a>
            <a href="#" className="m-2 md:m-4 py-2 px-4 bg-blue-500 rounded-full">Messagerie</a>
            <a href="#" className="m-2 md:m-4 py-2 px-4 bg-blue-500 rounded-full">Groupes</a>
            <a onClick={deconnexion} href="#" className="m-2 md:m-4 py-2 px-4 bg-blue-500 rounded-full">Déconnexion</a>
          </nav>
        </div>

      </header>
    );
  } else {
    return (
      <header className="flex flex-col items-center text-white w-full">
        <div className="bg-blue-600 text-4xl font-extrabold w-full text-center p-4">Groupomania</div>
      </header>
    )
  }

}