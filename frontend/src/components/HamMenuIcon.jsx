export default function HamMenuIcon({ isMenuOpen, setMenuOpen }) {

    return (
        <nav inert={window.innerWidth > 640} aria-hidden={window.innerWidth > 640} id="ham-menu-icon" aria-label="Mobile Navigation Menu" className="h-5.5 w-7 sm:hidden absolute left-5">
            <button onClick={() => setMenuOpen(!isMenuOpen)} className={`${isMenuOpen ? "rotate-180" : "rotate-0"} size-full flex flex-col justify-between transition-[rotate] duration-500`}>
                <span className={`${isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0 rotate-0"} relative h-0.5 w-full bg-text rounded-full transition-all duration-300`}></span>
                <span className={`${isMenuOpen ? "opacity-0" : "opacity-100"} h-0.5 relative w-full bg-text rounded-full transition-all duration-300`}></span>
                <span className={`${isMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 translate-y-0 rotate-0"} h-0.5 relative w-full bg-text rounded-full transition-all duration-300`}></span>
            </button>
            <ul hidden>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
            </ul>
        </nav>
    );
};