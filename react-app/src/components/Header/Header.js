import iconLeftFont from './icon-left-font-monochrome-black.svg';

function Header() {

    return (
            <header>
                <div className="imgHeader">
                <img src={iconLeftFont} alt="" className="iconLeftFont" />
                </div>
            </header>
    );
}

export default Header;