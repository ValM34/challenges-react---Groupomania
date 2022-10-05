
function Footer ({ isNotLogged }) {

    let getToken = JSON.parse(localStorage.getItem('userData'));

    const deleteUser = () => {
        fetch("http://localhost:3001/users/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken[0].token
            }
        });
        window.location.reload(false);
    }

    const logout = (evt) => {
        evt.preventDefault();
        localStorage.clear();
        window.location.reload(false);
    }

    return (
            <footer>
                {isNotLogged ? "" : <button className="buttonDeleteAccount" onClick={deleteUser}>Supprimer mon compte</button>}
                {isNotLogged ? "" : <button className="buttonLogout" onClick={logout}>Deconnexion</button>}
            </footer>
    );
}

export default Footer;