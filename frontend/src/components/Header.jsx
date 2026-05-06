import HamMenu from "./HamMenu";
import Profile from "./Profile";
import Theme from "./Theme";

export default function Header({ theme, setTheme, isMenuOpen, setMenuOpen, isProfileOpen, setProfileOpen }) {    
    return (
        <header className="bg-header py-6 flex justify-center items-center relative transition-colors duration-200">
            <HamMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} isProfileOpen={isProfileOpen} />
            <nav aria-label="Main Navigation Menu" className="absolute hidden md:block sm:left-5 md:left-10 lg:left-12">
                <ul className="flex gap-6 lg:gap-8 xl:gap-12 text-text font-[Inter] font-medium text-lg lg:text-xl">
                    <li className="hover:-translate-y-1 transition-transform duration-200"><a className="hover:cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-200">Lições</a></li>
                    <li className="hover:-translate-y-1 transition-transform duration-200"><a className="hover:cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-200">Calendário</a></li>
                    <li className="hover:-translate-y-1 transition-transform duration-200"><a className="hover:cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-200"></a></li>
                </ul>
            </nav>
            <a id="logo" href="/" className="flex items-end">
                <img src="./Logo.svg" className="h-13 pr-1 mb-1" />
                <h1 className="hidden sm:flex items-end font-[satoshi] text-6xl text-text font-semibold">niFlow</h1>
            </a>
            <Profile isProfileOpen={isProfileOpen} setProfileOpen={setProfileOpen} isMenuOpen={isMenuOpen} />
            {
                window.innerWidth > 640 && <Theme theme={theme} setTheme={setTheme} />
            }
        </header>
    );
};